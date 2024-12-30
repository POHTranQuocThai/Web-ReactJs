
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/ManagePatient.scss'
import DatePicker from 'react-flatpickr';
import { userService } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils/constant';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            datePatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        const { user } = this.props
        const { currentDate } = this.state
        const formatedDate = new Date(currentDate).getTime()
        const res = await userService.getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.status === 'OK') {
            this.setState({
                datePatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {

    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleConfirm = (item) => {
        const data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (data) => {
        const { dataModal } = this.state
        console.log('🚀 ~ ManagePatient ~ sendRemedy= ~ dataModal:', dataModal)
        this.setState({
            isShowLoading: true
        })
        const res = await userService.postSendRemedy({
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            email: dataModal.email,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            imgBase64: data.imgBase64
        })
        if (res && res.status === 'OK') {
            this.setState({
                isShowLoading: false
            })
            this.closeRemedyModal()
            toast.success(res.message)
            await this.getDataPatient()
        } else {
            toast.error(res.message)
        }
    }
    render() {
        const { language } = this.props
        const { datePatient, isOpenRemedyModal, dataModal, isShowLoading, currentDate } = this.state
        return (
            <>
                <LoadingOverlay active={isShowLoading} spinner  >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    value={currentDate}
                                    minDate={currentDate} // Convert currentDate to Date object
                                    className='form-control'
                                />
                            </div>
                            <div className="col-12">
                                <table style={{ width: '100%' }} className='table-manange-patient'>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {datePatient && datePatient.length > 0 ?
                                            datePatient.map((item, i) => {
                                                const time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                                const gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button onClick={() => this.handleConfirm(item)} className='btn btn-success mr-3'>Xác nhận</button>
                                                            {/* <button onClick={() => this.handleSendForm()} className='btn btn-info'>Gửi hóa đơn</button> */}
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr><td colSpan={6}>No data</td></tr>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div >
                    <RemedyModal isOpenModal={isOpenRemedyModal} dataModal={dataModal} sendRemedy={this.sendRemedy} closeRemedy={this.closeRemedyModal} />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

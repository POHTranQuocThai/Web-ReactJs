
import '../Modal/BookingModal.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from 'react-flatpickr';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import { userService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            phoneNumber: '',
            email: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            address: '',
            selectedGender: '',
            timeType: '',
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.props.fetchGender()
    }
    buildDataGender = (data) => {
        let result = []
        const language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {}
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap
                result.push(obj)
            })

        }
        return result
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            const docId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : ''
            this.setState({
                doctorId: docId,
                timeType: this.props.dataTime.timeType
            })
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleClickScheduleTime = (time) => {

    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }
    handleOnChangeInput = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };
    handleConfirmBooking = async () => {
        const timeString = this.buildTimeBooking(this.props.dataTime)
        const doctorName = this.buildDoctorName(this.props.dataTime)
        this.setState({
            isShowLoading: true
        })
        const res = await userService.postPatientBookAppointment({
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: new Date(this.state.birthday).getTime(),
            doctorId: this.state.doctorId,
            address: this.state.address,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.status === 'OK') {
            this.setState({ isShowLoading: false })
            this.props.closeBooking()
            toast.success('Booking a new appointment succeed!')
        } else {
            toast.error('Err!')
        }
    }
    buildTimeBooking = (dataTime) => {
        const { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = language === LANGUAGES.EN ?
                dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            const date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

            return `${time} - ${date}`

        }
        return ''
    }
    buildDoctorName = (dataTime) => {
        const { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            const name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }
    render() {
        const { isOpenModal, closeBooking, dataTime } = this.props
        const { fullname, email, birthday, doctorId, phoneNumber, isShowLoading, address, reason, genders, selectedGender } = this.state

        return (
            <LoadingOverlay active={isShowLoading} spinner  >
                <Modal isOpen={isOpenModal} centered size='lg' className='booking-modal-container'>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                            <span className='right' onClick={closeBooking}><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor isShowLinkDetail={false} isShowPrice={true}
                                    dataTime={dataTime} doctorId={doctorId} isShowDescriptionDoctor={false} />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.fullname' /></label>
                                    <input type="text" value={fullname} onChange={(e) => this.handleOnChangeInput(e, 'fullname')} className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                    <input type="text" value={phoneNumber} onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')} className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input type="text" value={email} onChange={(e) => this.handleOnChangeInput(e, 'email')} className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input type="text" value={address} onChange={(e) => this.handleOnChangeInput(e, 'address')} className='form-control' />
                                </div>
                                <div className="col-12 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <input type="text" value={reason} onChange={(e) => this.handleOnChangeInput(e, 'reason')} className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                    <DatePicker value={birthday} onChange={(date) => this.handleOnChangeDatePicker(date)} className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select options={genders} onChange={this.handleChangeSelect} value={selectedGender} />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button onClick={this.handleConfirmBooking} className='btn-booking-confirm'><FormattedMessage id='patient.booking-modal.btnConfirm' /></button>
                            <button onClick={closeBooking} className='btn-booking-cancel'><FormattedMessage id='patient.booking-modal.btnCancel' /></button>
                        </div>
                    </div>
                </Modal >
            </LoadingOverlay>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

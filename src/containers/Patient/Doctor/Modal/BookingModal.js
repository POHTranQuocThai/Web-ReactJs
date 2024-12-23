
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
            timeType: ''
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
        const res = await userService.postPatientBookAppointment({
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            reason: this.state.reason,
            date: new Date(this.state.birthday).getTime(),
            doctorId: this.state.doctorId,
            address: this.state.address,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType
        })
        console.log('🚀 ~ BookingModal ~ handleConfirmBooking= ~ email:', this.state)
        if (res && res.status === 'OK') {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBooking()
        } else {
            toast.error('Err!')
        }
    }
    render() {
        const { isOpenModal, closeBooking, dataTime } = this.props
        const { fullname, email, birthday, doctorId, phoneNumber, address, reason, genders, selectedGender } = this.state

        return (
            <Modal isOpen={isOpenModal} centered size='lg' className='booking-modal-container'>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right' onClick={closeBooking}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor dataTime={dataTime} doctorId={doctorId} isShowDescriptionDoctor={false} />
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

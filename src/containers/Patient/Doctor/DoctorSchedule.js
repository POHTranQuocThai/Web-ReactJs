import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/DoctorSchedule.scss'
import { userService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import 'moment/locale/vi'; // Import tiếng Việt

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        const { language } = this.props
        const allDays = this.getArrDays(language)
        if (this.props.doctorIdFromParent) {
            const res = await userService.getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data
            })
        }
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays
            })
        }

    }
    getArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    const ddMM = moment(new Date()).format('DD/MM')
                    const today = `Hôm nay - ${ddMM}`
                    obj.label = today
                } else {
                    const labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = labelVi
                }
            } else {
                if (i === 0) {
                    const ddMM = moment(new Date()).format('DD/MM')
                    const today = `Today - ${ddMM}`
                    obj.label = today
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(obj)
        }
        return arrDate
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            const allDays = this.getArrDays(this.props.language)
            console.log('🚀 ~ DoctorSchedule ~ componentDidUpdate ~ allDays:', allDays)
            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            const allDays = this.getArrDays(this.props.language)
            const res = await userService.getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent !== -1) {
            const doctorId = this.props.doctorIdFromParent
            const date = e.target.value
            const res = await userService.getScheduleByDate(doctorId, date)
            if (res && res.status === 'OK') {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        const { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state
        console.log('🚀 ~ DoctorSchedule ~ render ~ allDays:', allDays)
        const { language } = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className="all-schedule">
                        <select name="" id="" onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays?.map((date, i) => (
                                <option key={i} value={date.value}>
                                    {date.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className='fas fa-calendar-alt'></i>
                            <span><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                        </div>
                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvalableTime?.map((item, i) => {
                                            const timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button onClick={() => this.handleClickScheduleTime(item)} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'} key={i}>{timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    <div className='book-free'>
                                        <span><FormattedMessage id='patient.detail-doctor.choose' /> <i className="fa-solid fa-hand-point-up"></i>
                                            <FormattedMessage id='patient.detail-doctor.book-free' />
                                        </span>
                                    </div>
                                </>
                                : <div className='time-content__notification'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>}
                        </div>
                    </div>
                </div >
                <BookingModal dataTime={dataScheduleTimeModal}
                    isOpenModal={isOpenModalBooking} closeBooking={this.closeBooking} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

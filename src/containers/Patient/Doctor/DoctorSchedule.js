import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import '../Doctor/DoctorSchedule.scss'
import { userService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import locallization from 'moment/locale/vi'
import moment from 'moment';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDay: [],
            allAvalableTime: []
        }
    }
    async componentDidMount() {
        const { language } = this.props
        this.setArrDays(language)
    }
    setArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDate.push(obj)
        }
        this.setState({
            allDay: arrDate
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language)
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
    render() {
        const { allDay, allAvalableTime } = this.state
        const { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className="all-schedule">
                    <select name="" id="" onChange={(e) => this.handleOnChangeSelect(e)}>
                        {allDay?.map((date, i) => (
                            <option key={i} value={date.value}>
                                {date.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <span><i className='fas fa-calendar-alt'></i>Lịch khám</span>
                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ? allAvalableTime?.map((item, i) => {
                                const timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={i}>{timeDisplay}</button>
                                )
                            }) : <div className='time-content__notification'>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>}
                        </div>
                    </div>
                </div>
            </div >
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

import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { DATE_FORMAT, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import { userService } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorArr: [],
            selectedOption: null,
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors)
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     this.setState({
        //         doctorArr: this.buildDataInputSelect(this.props.allDoctors)
        //     })
        // }
    }
    buildDataInputSelect = (input) => {
        const { language } = this.props;
        return input?.length > 0
            ? input.map(data => ({
                label: language === LANGUAGES.VI
                    ? `${data.lastName} ${data.firstName}`
                    : `${data.firstName} ${data.lastName}`,
                value: data.id,
            }))
            : [];
    }
    handleChange = async selectedOption => {
        this.setState({ selectedOption })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] })
    }
    handleClickBtnTime = (index) => {
        // Tạo một bản sao của mảng rangeTime
        const updatedRangeTime = this.state.rangeTime.map((item, i) => {
            // Chỉ cập nhật isSelected của phần tử tại index
            if (i === index) {
                return {
                    ...item,
                    isSelected: !item.isSelected
                };
            }
            return item; // Giữ nguyên các phần tử khác
        });
        // Cập nhật state với mảng mới
        this.setState({
            rangeTime: updatedRangeTime
        });
    };
    handleSaveSchedule = async () => {
        const { rangeTime, selectedOption, currentDate } = this.state
        const result = []
        if (!currentDate || !selectedOption) {
            toast.error('Please choose date & doctor name!')
            return
        }
        const formatedDate = new Date(currentDate).getTime()
        console.log('🚀 ~ ManageSchedule ~ handleSaveSchedule= ~ formatedDate:', formatedDate)
        const selectedTime = rangeTime?.filter(time => {
            return time.isSelected && time
        })
        if (!_.isEmpty(selectedTime)) {
            selectedTime?.map(time => {
                let obj = {}
                obj.doctorId = selectedOption.value
                obj.date = formatedDate
                obj.timeType = time.keyMap
                result.push(obj)
            })
        } else {
            toast.error('Please choose time work')
            return
        }
        const res = await userService.bulkCreateSchedule({ schedule: result, doctorId: selectedOption.value, date: formatedDate })
        if (res && res.status === 'OK') {
            toast.success('Save info succeed!')
        } else {
            toast.error('Error')

        }
    }
    render() {
        const { rangeTime } = this.state
        const { language } = this.props
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));


        return (
            <div className="manage-schedule-container">
                <div className="m-s-title"><FormattedMessage id='manage-schedule.title' /></div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.doctorArr}
                            />                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor=""><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                                className='form-control' />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.map((time, i) => {
                                return (
                                    <button className={time?.isSelected ? 'btn btn-warning' : 'btn'} onClick={() => this.handleClickBtnTime(i)} key={i}>
                                        {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="col-12">
                            <button onClick={() => this.handleSaveSchedule()} className="btn btn-primary btn-save-schedule"><FormattedMessage id='manage-schedule.save' /></button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleHours())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import { userService } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';





class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorArr: [],
            selectedOption: null,
            currentDate: '',
            rangeTime: []
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
            this.setState({
                rangeTime: this.props.allScheduleTime
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
        const res = await userService.getDetailInforDoctor(selectedOption.value)
        if (res && res.status === 'OK' && res.data && res.data.Markdown) {
            const markdown = res.data.Markdown
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
    }
    handleOnChangeDatePicker = (date) => {
        console.log('🚀 ~ ManageSchedule ~ date:', date)
        this.setState({ currentDate: date[0] })
    }
    render() {
        const { rangeTime } = this.state
        const { language } = this.props
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
                                minDate={new Date()}
                                className='form-control' />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.map((time, i) => {
                                return (
                                    <button className='btn ' key={i}>
                                        {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"><FormattedMessage id='manage-schedule.save' /></button>
                        </div>

                    </div>
                </div>
            </div>
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

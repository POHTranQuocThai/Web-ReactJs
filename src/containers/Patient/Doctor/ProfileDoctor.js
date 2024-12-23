
import '../Doctor/ProfileDoctor.scss'

import React, { Component } from 'react';
import { connect } from "react-redux";
import { userService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        const id = this.props.doctorId
        const data = await this.getInforDoctor(id)
        this.setState({
            dataProfile: data
        })

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorId !== this.props.doctorId) {
            this.getInforDoctor(this.props.doctorId)
        }
        if (prevProps.language !== this.props.language) {

        }
    }
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            const res = await userService.getProfileDoctorById(id)
            if (res && res.status === 'OK') {
                result = res.data
            }
        }
        return result
    }
    renderTimeBooking = (dataTime) => {
        const { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            const time = language === LANGUAGES.EN ?
                dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            const date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time} {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }
    }
    render() {
        const { dataProfile } = this.state
        const { language, isShowDescriptionDoctor, dataTime } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile?.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className="intro-doctor">
                    <div className="content-left">
                        <div className='content-left__avatar'><img src={dataProfile?.image} alt="" /></div>
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor ?
                                <>
                                    {dataProfile?.Markdown?.description &&
                                        <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id='patient.booking-modal.price' />
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                        <NumericFormat
                            className="currency"
                            value={parseFloat(dataProfile.Doctor_Infor.priceTypeData.valueVi)}
                            displayType="text"
                            thousandSeparator
                            suffix="VND"
                        /> : ''}
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?
                        <NumericFormat
                            className="currency"
                            value={parseFloat(dataProfile.Doctor_Infor.priceTypeData.valueEn)}
                            displayType="text"
                            thousandSeparator
                            suffix="$"
                        /> : ''}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

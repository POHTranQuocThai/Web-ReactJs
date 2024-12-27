
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/DoctorExtrainfor.scss'
import { userService } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';


class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extrainInfor: {}
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            const res = await userService.getExtrainForDoctorById(this.props.doctorIdFromParent)
            console.log('🚀 ~ DoctorExtrainfor ~ componentDidUpdate ~ res.data:', res.data)
            if (res && res.status === 'OK') {
                this.setState({
                    extrainInfor: res.data
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            const res = await userService.getExtrainForDoctorById(this.props.doctorIdFromParent)
            console.log('🚀 ~ DoctorExtrainfor ~ componentDidUpdate ~ res.data:', res.data)
            if (res && res.status === 'OK') {
                this.setState({
                    extrainInfor: res.data
                })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        const { isShowDetailInfor, extrainInfor } = this.state
        const { language } = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className="content-up">
                    <div className='text-address'><FormattedMessage id='patient.extra-infor-doctor.text-address' /></div>
                    <div className='name-clinic'>{extrainInfor && extrainInfor.nameClinic ? extrainInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extrainInfor && extrainInfor.addressClinic ? extrainInfor.addressClinic : ''}</div>
                </div>
                <div className="content-down">
                    {!isShowDetailInfor ? (
                        <div className="short-infor">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {extrainInfor?.priceTypeData && (
                                <>
                                    {language === LANGUAGES.VI && (
                                        <span>
                                            <NumericFormat
                                                className="currency"
                                                value={parseFloat(extrainInfor.priceTypeData.valueVi)}
                                                displayType="text"
                                                thousandSeparator
                                                suffix=" VND"
                                            />
                                        </span>
                                    )}
                                    {language === LANGUAGES.EN && (
                                        <span>
                                            <NumericFormat
                                                className="currency"
                                                value={parseFloat(extrainInfor.priceTypeData.valueEn)}
                                                displayType="text"
                                                thousandSeparator
                                                suffix=" $"
                                            />
                                        </span>
                                    )}
                                </>
                            )}
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    ) :

                        <>
                            <div className='title-price'>
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                            </div>
                            <div className='detail-infor'>
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {extrainInfor?.priceTypeData && (
                                            <>
                                                {language === LANGUAGES.VI && (
                                                    <span>
                                                        <NumericFormat
                                                            className="currency"
                                                            value={parseFloat(extrainInfor.priceTypeData.valueVi)}
                                                            displayType="text"
                                                            thousandSeparator
                                                            suffix=" VND"
                                                        />
                                                    </span>
                                                )}
                                                {language === LANGUAGES.EN && (
                                                    <span>
                                                        <NumericFormat
                                                            className="currency"
                                                            value={parseFloat(extrainInfor.priceTypeData.valueEn)}
                                                            displayType="text"
                                                            thousandSeparator
                                                            suffix=" $"
                                                        />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className='note'>
                                    {extrainInfor && extrainInfor.note ? extrainInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id='patient.extra-infor-doctor.payment' /> :
                                {extrainInfor && extrainInfor.paymentTypeData && language === LANGUAGES.VI ?
                                    extrainInfor.paymentTypeData.valueVi : extrainInfor.paymentTypeData.valueEn}
                            </div>
                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor(false)}>
                                <FormattedMessage id='patient.extra-infor-doctor.hide-price' /></span>
                            </div>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);

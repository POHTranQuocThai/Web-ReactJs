
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions';


class HomeHeader extends Component {
    changeLanguage = (language) => {
        console.log('🚀 ~ HomeHeader ~ language:', language)
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        const { language } = this.props

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa-solid fa-bars"></i>
                            <div className="header-logo"><img src="../../assets/images/bookingcare.png" alt="" /></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id='homeheader.speciality' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-room' /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id='homeheader.fee' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.check-health' /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fa-solid fa-circle-question"></i> <FormattedMessage id='homeheader.support' /></div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className="title1"><FormattedMessage id='banner.title1' /></div>
                        <div className="title2"><FormattedMessage id='banner.title2' /></div>
                        <div className="search"><i className="fa-brands fa-searchengin"></i>
                            <input type="text" placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-hospital"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child1' /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-headset"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child2' /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-hospital-user"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child3' /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-vials"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child4' /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-head-side-virus"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child5' /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-tooth"></i></div>
                                <div className="text-child"><FormattedMessage id='banner.child6' /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,  //cấu hình chuyển đổi ngôn ngữ
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);


import Slider from 'react-slick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrTopDoctors: this.props.topDoctors
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {

        let arrTopDoctors = this.state.arrTopDoctors
        arrTopDoctors = arrTopDoctors.concat(arrTopDoctors).concat(arrTopDoctors).concat(arrTopDoctors).concat(arrTopDoctors)
        const language = this.props.language
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.out-standing-doctor' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrTopDoctors && arrTopDoctors?.map((data, i) => {
                                let imageBase64 = '';
                                // Chuyển đổi ảnh từ Base64 nếu tồn tại
                                if (data.image) {
                                    imageBase64 = new Buffer.from(data.image, 'base64').toString('binary');
                                }
                                let nameVi = `${data.positionData.valueVi}, ${data.lastName} ${data.firstName}`
                                let nameEn = `${data.positionData.valueEn}, ${data.firstName} ${data.lastName}`

                                return <div className='section-customize' key={i} onClick={() => this.handleViewDetailDoctor(data)}>
                                    <div className='customize-border'>
                                        <div className='outer-bg'><div className='bg-image section-outstanding-doctor'>
                                            <img src={imageBase64} alt="" /></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </Slider>
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../../services/userService';
import '../Section/Specialty.scss'
import { withRouter } from 'react-router'


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        const res = await userService.getAllSpecialty()
        if (res && res.status === 'OK') {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        const { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.specialty' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty?.map((item, i) => (
                                <div className='section-customize' key={i} onClick={() => this.handleViewDetailSpecialty(item)}>
                                    <div className='bg-image section-specialty' style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='section-customize__desc'>{item.name}</div>
                                </div>
                            ))}

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
        language: state.app.language  //cấu hình chuyển đổi ngôn ngữ
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

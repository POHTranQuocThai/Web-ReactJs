
import Slider from 'react-slick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../../services/userService';
import '../Section/MedicalFacility.scss'
import { withRouter } from 'react-router'


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        const res = await userService.getAllClinic()
        if (res && res.status === 'OK') {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        const { dataClinics } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, i) => {
                                    return (
                                        <div className='section-customize' key={i} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className='bg-image section-medical-facility' style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className='section-customize__desc'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));


import React, { Component } from 'react';
import { connect } from "react-redux";
import { userService } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import '../Patient/VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            status: ''
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search)
            const token = urlParams.get('token')
            const doctorId = urlParams.get('doctorId')
            const res = await userService.postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            console.log('🚀 ~ VerifyEmail ~ componentDidMount ~ res.status:', res.status)
            if (res && res.status === 'OK') {
                this.setState({
                    statusVerify: true,
                    status: res.status
                })

            } else {
                this.setState({
                    statusVerify: true,
                    status: res.status ? res.status : 'ERR'
                })
            }
        }

    }
    async componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { statusVerify, status } = this.state
        console.log('🚀 ~ VerifyEmail ~ render ~ status:', status)
        console.log('🚀 ~ VerifyEmail ~ render ~ statusVerify:', statusVerify)

        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {!statusVerify ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {status === 'OK' ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công</div> :
                                <div className='infor-booking'>Lịch hẹn không còn tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
                    }
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

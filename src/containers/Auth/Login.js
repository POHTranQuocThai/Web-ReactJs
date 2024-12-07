import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl'
import { userService } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    hanldeOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    hanldeOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({ errMessage: '' });

        try {
            const data = await userService.handleLogin(this.state.username, this.state.password);
            if (data && data.status === 'ERR') {
                this.setState({ errMessage: data.message });
            } else if (data && data.status === 'OK') {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({ errMessage: error.response.data.message });
            } else {
                this.setState({ errMessage: 'An unexpected error occurred!' });
            }
        }
    };

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type="text" className='form-control' placeholder='Enter your username'
                                onChange={event => this.hanldeOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    onChange={event => this.hanldeOnChangePassword(event)} />
                                <span onClick={() => this.handleShowPassword()}>
                                    {this.state.isShowPassword ? <i className="fa-solid fa-eye"></i> :
                                        <i className="fa-solid fa-eye-slash"></i>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>{this.state.errMessage}</div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className="text-other-login">Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fa-brands fa-google-plus google"></i>
                            <i className="fa-brands fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
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
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

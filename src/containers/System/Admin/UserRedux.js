import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant'
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            const response = await userService.getAllCodeService('gender')
            if (response && response.status === 'OK') {
                this.setState({
                    genderArr: response.data
                })
            }
        } catch (error) {
            console.log('🚀 ~ UserRedux ~ componentDidMount ~ error:', error)
        }
    }


    render() {
        const gender = this.state.genderArr
        const language = this.props.language
        return (
            <div className="user-redux-container">
                <div className="title">DEv</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="row">
                                    <div className="col-12 mt-3"><FormattedMessage id='manage-user.add' /></div>
                                    <div className="col-md-3">
                                        <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                    </div>
                                    <div className="col-md-3">
                                        <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                                    </div>
                                    <div className="col-md-3">
                                        <label for="inputEmail4"><FormattedMessage id='manage-user.first-name' /></label>
                                        <input type="text" className="form-control" id="inputEmail4" placeholder="Email" />
                                    </div>
                                    <div className="col-md-3">
                                        <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Password" />
                                    </div>
                                    <div className="col-md-3" >
                                        <label for="inputPassword4"><FormattedMessage id='manage-user.phone' /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Password" />
                                    </div >
                                    <div className="col-md-9" >
                                        <label for="inputPassword4"><FormattedMessage id='manage-user.address' /></label>
                                        <input type="text" className="form-control" id="inputPassword4" placeholder="Password" />
                                    </div >
                                    <div className="col-md-3" >
                                        <label><FormattedMessage id='manage-user.gender' /></label>
                                        <select className="form-control" >
                                            <option selected><FormattedMessage id='manage-user.choose' /></option>
                                            {gender && gender.map((data, i) => { //use map phải có return trả về data
                                                return <option option key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                            })}
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                                        <select id="inputState" className="form-control" >
                                            <option selected><FormattedMessage id='manage-user.choose' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                                        <select id="inputState" className="form-control" >
                                            <option selected><FormattedMessage id='manage-user.choose' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                            <option><FormattedMessage id='manage-user.position' /></option>
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label ><FormattedMessage id='manage-user.image' /></label>
                                        <input type="text" className="form-control" />
                                    </div >
                                    <div className='col-12 mt-3'><button type="submit" className="btn btn-primary" ><FormattedMessage id='manage-user.save' /></button ></div>
                                </div >
                            </form >
                        </div >
                    </div >
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

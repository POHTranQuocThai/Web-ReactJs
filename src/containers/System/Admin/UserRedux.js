import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: null,
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositonStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
    }
    handleOnChangeImage = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên
        console.log('🚀 ~ UserRedux ~ file:', file)
        if (file) {
            this.setState({
                previewImage: URL.createObjectURL(file)
            })
        }

    }
    render() {
        const gender = this.state.genderArr
        const position = this.state.positionArr
        const role = this.state.roleArr
        const language = this.props.language
        const isLoadingGender = this.props.isLoadingGender
        return (
            <div className="user-redux-container">
                <div className="title">DEv</div>
                <div>{isLoadingGender ? 'Loading genders' : ''}</div>
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
                                            {gender && gender?.map((data, i) => { //use map phải có return trả về data
                                                return <option option key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                            })}
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                                        <select id="inputState" className="form-control" >
                                            {position && position?.map((data, i) => { //use map phải có return trả về data
                                                return <option option key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                            })}
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                                        <select id="inputState" className="form-control" >
                                            {role && role?.map((data, i) => { //use map phải có return trả về data
                                                return <option option key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                            })}
                                        </select >
                                    </div >
                                    <div className="col-md-3" >
                                        <label ><FormattedMessage id='manage-user.image' /></label>
                                        <div className='preview-img-container'>
                                            <input onChange={(event) => this.handleOnChangeImage(event)} id='previewImg' hidden type="file" className="form-control" />
                                            <label className='label-upload' htmlFor="previewImg"><FormattedMessage id='manage-user.upload' /><i className="fa-solid fa-upload"></i></label>
                                            <div onClick={() => this.setState({ isOpen: true })} className="preview-img" style={{ background: `url(${this.state.previewImage})` }}></div>
                                        </div>
                                    </div >
                                    <div className='col-12 mt-3'><button type="submit" className="btn btn-primary" ><FormattedMessage id='manage-user.save' /></button ></div>
                                </div >
                            </form >
                        </div >
                    </div >
                </div >
                {this.state.previewImage && this.state.isOpen && <Lightbox
                    mainSrc={this.state.previewImage}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    reactModalStyle={{
                        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }, // Làm nền đậm hơn
                    }}
                    imageTitle="Preview Image" // Thêm tiêu đề
                />}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

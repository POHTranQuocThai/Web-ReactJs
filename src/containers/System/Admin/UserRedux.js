import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant'
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: null,
            isOpen: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            image: '',
            roleId: '',
            positionId: '',

            action: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositonStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            const arrGenders = this.props.genders
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            const arrPositions = this.props.positions
            this.setState({
                positionArr: arrPositions,
                positionId: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            const arrRoles = this.props.roles
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            const arrRoles = this.props.roles
            console.log('🚀 ~ UserRedux ~ componentDidUpdate ~ arrRoles:', arrRoles)
            const arrPositions = this.props.positions
            console.log('🚀 ~ UserRedux ~ componentDidUpdate ~ arrPositions:', arrPositions)
            const arrGenders = this.props.genders
            console.log('🚀 ~ UserRedux ~ componentDidUpdate ~ arrGenders:', arrGenders)
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                image: '',
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                positionId: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleOnChangeImage = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên
        if (file) {
            this.setState({
                previewImage: URL.createObjectURL(file),
                image: URL.createObjectURL(file)
            })
        }

    }
    handleSaveUser = (event) => {
        event.preventDefault();
        const isValid = this.checkValidateInput()
        if (!isValid) return
        const { email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            image,
            roleId,
            positionId, action, id } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUserRedux({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                image: image,
                roleId: roleId,
                positionId: positionId

            })
        } else if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: id,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
                gender: gender,
                image: image,
                roleId: roleId,
                positionId: positionId,
            })

        }
    }
    checkValidateInput = () => {
        const arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let item of arrCheck) {
            if (!this.state[item]) {
                console.log(`Missing value for ${item}`);
                return false; // Trả về false nếu thiếu
            }
        }
        return true; // Trả về true nếu tất cả trường hợp đều hợp lệ
    }

    onChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value // cập nhật giá trị theo key

        }));
    }
    handleEditUserFromParent = (userEdit) => {
        console.log('🚀 ~ UserRedux ~ userEdit:', userEdit)
        this.setState({
            id: userEdit.id,
            email: userEdit.email,
            password: 'HARDCODE',
            firstName: userEdit.firstName,
            lastName: userEdit.lastName,
            address: userEdit.address,
            phoneNumber: userEdit.phoneNumber,
            gender: userEdit.gender,
            image: userEdit.image,
            roleId: userEdit.roleId,
            positionId: userEdit.positionId,
            action: CRUD_ACTIONS.EDIT
        })
    }
    render() {
        const genders = this.state.genderArr
        const positions = this.state.positionArr
        const roles = this.state.roleArr
        const language = this.props.language
        const isLoadingGender = this.props.isLoadingGender

        const { email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber, roleId, positionId, gender } = this.state
        console.log('🚀 ~ UserRedux ~ render ~ gender:', gender)
        console.log('🚀 ~ UserRedux ~ render ~ position:', positionId)
        return (
            <div className="user-redux-container">
                <div className="title">DEv</div>
                <div>{isLoadingGender ? 'Loading genders' : ''}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="row">
                                <div className="col-12 mt-3"><FormattedMessage id='manage-user.add' /></div>
                                <div className="col-md-3">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                    <input name='email' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} value={email} onChange={(event) => this.onChangeInput(event)} type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="col-md-3">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                    <input name='password' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} value={password} onChange={(event) => this.onChangeInput(event)} type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="col-md-3">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.first-name' /></label>
                                    <input name='firstName' value={firstName} onChange={(event) => this.onChangeInput(event)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-md-3">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                                    <input name='lastName' value={lastName} onChange={(event) => this.onChangeInput(event)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-md-3" >
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.phone' /></label>
                                    <input name='phoneNumber' value={phoneNumber} onChange={(event) => this.onChangeInput(event)} type="text" className="form-control" placeholder="" />
                                </div >
                                <div className="col-md-9" >
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.address' /></label>
                                    <input name='address' value={address} onChange={(event) => this.onChangeInput(event)} type="text" className="form-control" placeholder="" />
                                </div >
                                <div className="col-md-3" >
                                    <label for="inputState"><FormattedMessage id='manage-user.gender' /></label>
                                    <select value={gender} name='gender' className="form-control" onChange={(event) => this.onChangeInput(event)}>
                                        {genders && genders?.map((data, i) => { //use map phải có return trả về data
                                            return <option value={data.key} key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                        })}
                                    </select >
                                </div >
                                <div className="col-md-3" >
                                    <label ><FormattedMessage id='manage-user.position' /></label>
                                    <select value={positionId} name='positionId' className="form-control" onChange={(event) => this.onChangeInput(event)}>
                                        {positions && positions?.map((data, i) => { //use map phải có return trả về data
                                            return <option value={data.key} key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
                                        })}
                                    </select >
                                </div >
                                <div className="col-md-3" >
                                    <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                                    <select value={roleId} name='roleId' className="form-control" onChange={(event) => this.onChangeInput(event)}>
                                        {roles && roles?.map((data, i) => { //use map phải có return trả về data
                                            return <option value={data.key} key={i} > {language === LANGUAGES.VI ? data.valueVi : data.valueEn}</option>
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
                                <div className='col-12 my-3'><button onClick={(event) => this.handleSaveUser(event)} className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit' /> : <FormattedMessage id='manage-user.create' />}</button ></div>
                                <div className='col-12'><TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action} /></div>
                            </div >
                        </div >
                    </div >
                </div >
                {
                    this.state.previewImage && this.state.isOpen && <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
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
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { userService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }
    getAllUsersFromReact = async () => {
        const response = await userService.getAllUser('All')
        if (response && response.status === 'OK') {
            this.setState({
                arrUser: response.users
            })
        }
    }
    handleAddUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    createNewUser = async (data) => {
        try {
            const response = await userService.createNewUserService(data)
            if (response && response.status === 'OK') {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            throw error
        }
    }
    handleDeleteUser = async (user) => {
        console.log('🚀 ~ UserManage ~ handleDeleteUser ~ user:', user)
        try {
            const response = await userService.deleteUserService(user?.id)
            if (response && response.status === 'OK') {
                await this.getAllUsersFromReact()
            }
        } catch (error) {
            throw error
        }
    }
    /** Life cycle
     * Run component:
     * 1.Run Constructer => init state
     * 2.Did mount (set state)
     * 3.Render
     *  
     */

    render() {
        return (
            <div className="users-container">
                <ModalUser createNewUser={this.createNewUser} isOpen={this.state.isOpenModalUser} toggleFormParent={this.toggleUserModal} />
                <div className='title'>Manage users with Eric</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddUser()}><i className="fa-solid fa-user-plus"></i> Add new users</button>
                </div>
                <div className="users-table">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Họ</th>
                                <th>Tên</th>
                                <th>Địa chỉ</th>
                                <th>Hành động</th>
                            </tr>
                            {this.state.arrUser?.map(user => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => this.handleDeleteUser(user)} className='btn-delete'><i className="fa-solid fa-eraser"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

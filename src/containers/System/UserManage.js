import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { userService } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUser: []
        }
    }

    async componentDidMount() {
        const response = await userService.getAllUser('All')
        console.log('🚀 ~ UserManage ~ componentDidMount ~ response:', response)
        if (response && response.status === 'OK') {
            this.setState({
                arrUser: response.users
            })
        }
        console.log(this.state.arrUser);

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
            <div className="user-container">
                <div className='title'>Manage users with Eric</div>
                <div className="users-table">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Hành động</th>
                        </tr>
                        {this.state.arrUser?.map(user => (
                            <tr key={user.id}> {/* key cần có giá trị duy nhất */}
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn-edit'><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className='btn-delete'><i className="fa-solid fa-eraser"></i></button>
                                </td>
                            </tr>
                        ))}
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

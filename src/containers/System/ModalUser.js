import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFormParent()
    }

    handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value // cập nhật giá trị theo key

        }));
    };
    checkValideInput = (state) => {
        return Object.values(state).every(value => !!value);
    };
    handleAddNew = () => {
        const isValid = this.checkValideInput(this.state);
        if (isValid) {
            this.props.createNewUser(this.state)
        }
    };
    render() {
        return (
            <Modal className='modal-user-container' isOpen={this.props.isOpen} toggle={() => this.toggle()} size='lg'>
                <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input value={this.state.email} type="text" name='email' onChange={event => this.handleOnChangeInput(event)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input value={this.state.password} type="password" name='password' onChange={event => this.handleOnChangeInput(event)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First Name</label>
                            <input value={this.state.firstName} type="text" name='firstName' onChange={event => this.handleOnChangeInput(event)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last Name</label>
                            <input value={this.state.lastName} type="text" name='lastName' onChange={event => this.handleOnChangeInput(event)} />
                        </div>
                        <div className="input-container max-width-input">
                            <label htmlFor="">Address</label>
                            <input value={this.state.address} type="text" name='address' onChange={event => this.handleOnChangeInput(event)} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleAddNew()}>
                        Add New
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
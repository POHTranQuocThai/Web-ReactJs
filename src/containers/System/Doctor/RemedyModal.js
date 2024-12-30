
import '../Doctor/RemedyModal.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../store/actions'
import { CommonUtils, LANGUAGES } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgBase64: '',
            email: '',

        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleOnChangeFile = async (e) => {
        const data = e.target.files
        const file = data[0]
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64,
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        const { isOpenModal, closeRemedy } = this.props
        const { email } = this.state
        return (
            <Modal isOpen={isOpenModal} centered size='lg' className='booking-modal-container'>
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedy}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input className="form-control" type="email" value={email} onChange={(e) => this.handleOnChangeEmail(e)} />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input onChange={(e) => this.handleOnChangeFile(e)} className="form-control-file" type="file" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>
                    <Button color='secondary' onClick={closeRemedy}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

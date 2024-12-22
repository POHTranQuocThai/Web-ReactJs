
import '../Modal/BookingModal.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {

    }
    handleClickScheduleTime = (time) => {

    }
    render() {
        const { isOpenModal, closeBooking, dataTime } = this.props
        return (
            <Modal isOpen={isOpenModal} centered size='lg' className='booking-modal-container'>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right' onClick={closeBooking}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor"></div>
                        <div className="price">
                            Giá khám 500.000VND
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="">Họ Tên</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Số điện thoại</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Địa chỉ Email</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Địa chỉ liên hệ</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="">Lý do khám bệnh</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Đặt cho ai</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Giới tính</label>
                                <input type="text" className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                        <button onClick={closeBooking} className='btn-booking-cancel'>Hủy</button>
                    </div>
                </div>
            </Modal >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

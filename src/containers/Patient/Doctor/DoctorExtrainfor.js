
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/DoctorExtrainfor.scss'


class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false
        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        const { isShowDetailInfor } = this.state
        return (
            <div className='doctor-extra-infor-container'>
                <div className="content-up">
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám đa khoa</div>
                    <div className='detail-address'>Quận Bình Thủy</div>
                </div>
                <div className="content-down">
                    {!isShowDetailInfor ? <div className='short-infor'>GIÁ KHÁM: 200.000đ. <span onClick={() => this.showHideDetailInfor(true)}>Xem chi tiết</span></div> :
                        <>
                            <div className='title-price'>
                                GIÁ KHÁM .
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'> Giá khám</span>
                                    <span className='right'> 250.000đ</span>
                                </div>
                                <div className='note'>Được</div>
                            </div>
                            <div className='payment'>
                                tttt
                            </div>
                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span></div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);

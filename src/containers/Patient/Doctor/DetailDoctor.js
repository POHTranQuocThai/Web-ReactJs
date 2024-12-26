import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import '../Doctor/DetailDoctor.scss'
import { userService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtrainfor from './DoctorExtrainfor';


class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: '',
            currentDoctorId: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            const res = await userService.getDetailInforDoctor(id)
            if (res && res.status === 'OK') {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
    }
    render() {
        const { detailDoctor } = this.state
        const { language } = this.props
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor?.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <div className='content-left__avatar'><img src={detailDoctor.image} alt="" /></div>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                {detailDoctor?.Markdown?.description &&
                                    <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />

                        </div>
                        <div className="content-right">
                            <DoctorExtrainfor doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor?.Markdown?.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className="comment-doctor">

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

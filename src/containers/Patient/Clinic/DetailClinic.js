
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Clinic/DetailClinic.scss'
import { withRouter } from 'react-router';
import { userService } from '../../../services/userService';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeHeader from '../../HomePage/HomeHeader';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';




class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            const res = await userService.getDetialClinicById(id)
            if (res && res.status === 'OK'
            ) {
                const data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    const arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {

    }
    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            const res = await userService.getDetialClinicById(id)
            if (res && res.status === 'OK') {
                const data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    const arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }
    }
    render() {
        const { arrDoctorId, dataDetailClinic, listProvince } = this.state
        console.log('🚀 ~ DetailClinic ~ render ~ listProvince:', listProvince)
        const { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                </div>
                            </>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, i) => {
                                    return (
                                        <option key={i} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, i) => {
                            return (
                                <div className="each-doctor" key={i}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtrainfor doctorIdFromParent={item} />

                                        </div>
                                    </div>
                                </div>
                            )
                        })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));

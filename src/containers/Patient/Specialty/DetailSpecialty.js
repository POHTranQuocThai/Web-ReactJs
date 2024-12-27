
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Specialty/DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { userService } from '../../../services/userService';
import _, { valuesIn } from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            const res = await userService.getDetialSpecialtyById(id, 'ALL')
            const resProvince = await userService.getAllCodeService('PROVINCE')
            if (res && res.status === 'OK' &&
                resProvince && resProvince.status === 'OK'
            ) {
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
                const dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {

    }
    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id
            const location = e.target.value
            const res = await userService.getDetialSpecialtyById(id, location)
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
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }
    }
    render() {
        const { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        const { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));

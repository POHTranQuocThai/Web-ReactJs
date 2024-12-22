import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// // import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { userService } from '../../../services/userService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            doctorArr: [],
            hasOldData: false,
            action: '',

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            note: '',
            addressClinic: ''

        }
    }

    componentDidMount() {
        this.props.fetchAllDocotorsRedux()
        this.props.getRequiredDoctorInforRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            const { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            const dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            const dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            const dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.language !== this.props.language) {
            const { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            const dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            const dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            const dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors, 'USERS'),
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });

    };

    handleSaveContentMarkdown = () => {
        const { contentMarkdown, contentHTML, selectedDoctor, description, hasOldData, selectedPrice, selectedProvince, selectedPayment } = this.state

        this.props.saveDetailsDoctorRedux({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedDoctor.value,
            description: description,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            priceId: selectedPrice.value,
            provinceId: selectedProvince.value,
            paymentId: selectedPayment.value,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
            addressClinic: this.state.addressClinic
        })

    }
    handleChange = async selectedDoctor => {
        this.setState({ selectedDoctor })
        const res = await userService.getDetailInforDoctor(selectedDoctor.value)
        const { listPayment, listProvince, listPrice } = this.state
        console.log('🚀 ~ ManageDoctor ~ listPayment, listProvince, listPrice :', listPayment, listProvince, listPrice)
        if (res && res.status === 'OK' && res.data && res.data.Markdown) {
            console.log('🚀 ~ ManageDoctor ~ res.data:', res.data)
            const markdown = res.data.Markdown
            let addressClinic = '', nameClinic = '', note = '', priceId = '', paymentId = '', provinceId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = ''
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.addressClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                console.log('🚀 ~ ManageDoctor ~ selectedPayment:', selectedPayment.label)
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,

                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
    }
    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        const stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedDoctor
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (e, id) => {
        const stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }
    buildDataInputSelect = (input, type) => {
        const { language } = this.props;

        // Kiểm tra đầu vào
        if (!Array.isArray(input) || input.length === 0) {
            return [];
        }

        // Xử lý từng loại type
        switch (type) {
            case 'USERS':
                return input.map(data => ({
                    label: language === LANGUAGES.VI
                        ? `${data.lastName} ${data.firstName}`
                        : `${data.firstName} ${data.lastName}`,
                    value: data.id,
                }));

            case 'PRICE':
                return input.map(data => ({
                    label: language === LANGUAGES.VI
                        ? data.valueVi
                        : `${data.valueEn} USD`,
                    value: data.keyMap,
                }));

            case 'PAYMENT':
            case 'PROVINCE':
                return input.map(data => ({
                    label: language === LANGUAGES.VI
                        ? data.valueVi
                        : data.valueEn,
                    value: data.keyMap,
                }));

            default:
                return [];
        }
    };

    render() {
        const { doctorArr, hasOldData, listPrice, listProvince, listPayment } = this.state

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea onChange={(e) => this.handleOnChangeText(e, 'description')}
                            value={this.state.description} rows={4} className='form-control'></textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select placeholder={'Chọn giá'}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPrice}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                        <Select placeholder={'Chọn phương thức thanh toán'}
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPayment}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select placeholder={'Chọn tỉnh thành'}
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listProvince}
                            name={'selectedProvince'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.nameClinic' /></label>
                        <input className='form-control' placeholder={'Tên phòng khám'}
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.addressClinic' /></label>
                        <input className='form-control' placeholder={'Địa chỉ phòng khám'}
                            value={this.state.addressClinic}
                            onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control' placeholder={'Ghi chú'}
                            value={this.state.note}
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} value={this.state.contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => this.handleSaveContentMarkdown()} className={hasOldData ? 'btn btn-info edit-content-doctor' : 'save-content-doctor'}>
                    {hasOldData ? <FormattedMessage id='admin.manage-doctor.save' /> : <FormattedMessage id='admin.manage-doctor.create' />}
                </button>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDocotorsRedux: () => dispatch(actions.fetchAllDoctors()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
        getRequiredDoctorInforRedux: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailsDoctorRedux: (data) => dispatch(actions.saveDetailsDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

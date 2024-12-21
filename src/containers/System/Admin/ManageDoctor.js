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
            selectedOption: null,
            description: '',
            doctorArr: [],
            hasOldData: false,
            action: '',

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedProvince: '',
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
        if (prevProps.language !== this.props.language) {
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors)
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            const { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            const dataSelectPrice = this.buildDataInputSelect(resPrice)
            const dataSelectPayment = this.buildDataInputSelect(resPayment)
            const dataSelectProvince = this.buildDataInputSelect(resProvince)
            this.setState({
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
        const { contentMarkdown, contentHTML, selectedOption, description, hasOldData } = this.state
        this.props.saveDetailsDoctorRedux({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedOption.value,
            description: description,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })

    }
    handleChange = async selectedOption => {
        this.setState({ selectedOption })
        const res = await userService.getDetailInforDoctor(selectedOption.value)
        if (res && res.status === 'OK' && res.data && res.data.Markdown) {
            const markdown = res.data.Markdown
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true
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
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    buildDataInputSelect = (input, type) => {
        const { language } = this.props;
        return input?.length > 0
            ? input.map(data => {
                const labelVi = type === 'USERS' ? `${data.lastName} ${data.firstName}` : data.valueVi
                const labelEn = type === 'USERS' ? `${data.firstName} ${data.lastName}` : data.valueEn
                return {
                    label: language === LANGUAGES.VI
                        ? labelVi
                        : labelEn,
                    value: data.id,
                }
            })
            : [];
    }

    render() {
        const { doctorArr, hasOldData, listPrice, listProvince, listPayment } = this.state
        console.log('🚀 ~ ManageDoctor ~ render ~ listProvince:', listProvince)
        console.log('🚀 ~ ManageDoctor ~ render ~ listPrice:', listPrice)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description} rows={4} className='form-control'></textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn giá</label>
                        <Select placeholder={'Chọn giá'}
                            value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={listPrice}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn phương thức thanh toán</label>
                        <Select placeholder={'Chọn phương thức thanh toán'}
                            value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={listPayment}
                        />                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn phương thức thanh toán</label>
                        <Select placeholder={'Chọn phương thức thanh toán'}
                            value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={listProvince}
                        />                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Tên phòng khám</label>
                        <Select placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <Select placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Note</label>
                        <Select placeholder={'Chọn bác sĩ'}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />                    </div>
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

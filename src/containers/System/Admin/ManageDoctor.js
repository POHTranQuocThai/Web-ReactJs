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
            action: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDocotorsRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors)
            })
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                doctorArr: this.buildDataInputSelect(this.props.allDoctors)
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
        console.log('🚀 ~ ManageDoctor ~ res:', res)
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
    buildDataInputSelect = (input) => {
        const { language } = this.props;
        return input?.length > 0
            ? input.map(data => ({
                label: language === LANGUAGES.VI
                    ? `${data.lastName} ${data.firstName}`
                    : `${data.firstName} ${data.lastName}`,
                value: data.id,
            }))
            : [];
    }

    render() {
        const { doctorArr, hasOldData } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin doctors</div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctorArr}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description} rows={4} className='form-control'></textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} value={this.state.contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => this.handleSaveContentMarkdown()} className={hasOldData ? 'btn btn-info edit-content-doctor' : 'save-content-doctor'}>
                    {hasOldData ? 'Sửa thông tin' : 'Lưu thông tin'}
                </button>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllDocotorsRedux: () => dispatch(actions.fetchAllDoctors()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
        saveDetailsDoctorRedux: (data) => dispatch(actions.saveDetailsDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

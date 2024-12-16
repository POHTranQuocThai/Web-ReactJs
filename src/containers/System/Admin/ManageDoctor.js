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
import { LANGUAGES } from '../../../utils';

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
            doctorArr: []
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
        const { contentMarkdown, contentHTML, selectedOption, description } = this.state
        this.props.saveDetailsDoctorRedux({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedOption.value,
            description: description,
        })

    }
    handleChange = selectedOption => {
        this.setState({ selectedOption })
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
        const { doctorArr } = this.state
        console.log('🚀 ~ ManageDoctor ~ render ~ doctorArr:', doctorArr)
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
                            value={this.state.description} rows={4} className='form-control'>ththth</textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => this.handleSaveContentMarkdown()} className='save-content-doctor'>Lưu thông tin</button>
            </div>
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

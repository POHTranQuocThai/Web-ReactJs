import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../Specialty/ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { userService } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        }
    }

    componentDidMount() {
    }

    handleOnChangeInput = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (e) => {
        const data = e.target.files
        const file = data[0]
        if (file) {
            const base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }
    handleSaveNewSpecialty = async () => {
        const res = await userService.createNewSpecialty(this.state)
        if (res && res.status === 'OK') {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Something wrongs...')
        }
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lí chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input type="text" className='form-group' value={this.state.name} onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input type="file" className='form-group-file' onChange={(e) => this.handleOnChangeImage(e)} />
                    </div>
                    <div className="col-12">
                        <MdEditor style={{ height: '500px' }} onChange={this.handleEditorChange} value={this.state.descriptionMarkdown} renderHTML={text => mdParser.render(text)} />
                    </div>
                </div>
                <div className="col-12">
                    <button className='btn-save-specialty' onClick={() => this.handleSaveNewSpecialty()}>Save</button>

                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

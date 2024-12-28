
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Clinic/ManageClinic.scss'
import { withRouter } from 'react-router';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { userService } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {

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
    handleSaveNewClinic = async () => {
        const res = await userService.createNewClinic(this.state)
        if (res && res.status === 'OK') {
            toast.success('Add new clinic succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
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
                <div className='ms-title'>Quản lí phòng khám</div>
                <div className="add-new-specialty row">
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input type="text" className='form-control' value={this.state.name} onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input type="file" className='form-control-file' onChange={(e) => this.handleOnChangeImage(e)} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input type="text" className='form-control' value={this.state.address} onChange={(e) => this.handleOnChangeInput(e, 'address')} />
                    </div>
                    <div className="col-12">
                        <MdEditor style={{ height: '500px' }} onChange={this.handleEditorChange} value={this.state.descriptionMarkdown} renderHTML={text => mdParser.render(text)} />
                    </div>
                </div>
                <div className="col-12">
                    <button className='btn-save-specialty' onClick={() => this.handleSaveNewClinic()}>Save</button>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageClinic));

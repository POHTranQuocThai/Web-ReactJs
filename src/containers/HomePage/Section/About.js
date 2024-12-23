
import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {
    render() {

        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Thái Dev
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/HSOtku1j600" title="2 Hour Beautiful Piano Music for Studying and Sleeping 【BGM】" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>                    </div>
                    <div className="content-right">
                        <p>Heloo</p>
                    </div>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language  //cấu hình chuyển đổi ngôn ngữ
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

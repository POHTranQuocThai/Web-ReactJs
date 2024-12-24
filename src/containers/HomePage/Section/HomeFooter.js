
import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {
    render() {

        return (
            <div className="homefooter">
                <p>&copy; 2024 Thaidev.com: More information &#187;<a target='_blank' href="https://www.facebook.com/?locale=vi_VN"> Click here </a>&laquo;</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';

class HomePage extends Component {

    render() {
        const settings = {
            dots: false, // Tắt dấu chấm bên dưới slider
            infinite: true, // Cho phép trượt vòng lặp
            speed: 500, // Tốc độ chuyển đổi giữa các slide (ms)
            slidesToShow: 4, // Số lượng slide hiển thị cùng lúc
            slidesToScroll: 2, // Số lượng slide trượt mỗi lần
        };
        return (
            <div>
                <HomeHeader settings={settings} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
                <div style={{ height: '300px' }}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

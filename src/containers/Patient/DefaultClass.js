
import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Doctor/DefaultClass.scss'



class DefaultClass extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {

    }

    render() {

        return (
            <div className='doctor-extra-infor-container'>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserDistricts } from "../actions";

class UserDistrictsLoader extends Component {
    componentDidMount() {
        this.props.fetchUserDistricts();
    }
    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchUserDistricts }, dispatch);
};


export default connect(null, mapDispatchToProps)(UserDistrictsLoader);
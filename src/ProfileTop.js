import React, { Component } from "react";

class ProfileTop extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { firstName, lastName } = this.props;
        return (
            <div className="wrapper-seta">
                <p className="name-user">{`${firstName} ${lastName}`}</p>
                <i className="fas fa-angle-down arrow-down" />
            </div>
        );
    }
}

export default ProfileTop;

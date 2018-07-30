import React, { Component } from "react";

class ProfileWhite extends Component {
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
            <div>
                <p className="name-user-white">{`${firstName} ${lastName}`}</p>
            </div>
        );
    }
}

export default ProfileWhite;

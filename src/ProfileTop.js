import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                <div className="wrapper-arrow">
                    <i className="fas fa-angle-down arrow-down" />
                    <div className="big-wrapper-menu">
                        <div className="wrapper-menu-arrow">
                            <Link
                                className="menu-arrow a-name"
                                to={`/editprofile`}
                            >
                                Edit Profile
                            </Link>
                            <a className="menu-arrow" href="/logout">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTop;

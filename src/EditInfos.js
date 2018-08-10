import React, { Component } from "react";
import axios from "./axios";
import { editProfile } from "./actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        firstName: state.me.firstName,
        lastName: state.me.lastName,
        bio: state.me.bio,
        city: state.me.city,
        food: state.me.food,
        chef: state.me.chef,
        email: state.me.email,
        id: state.me.id,
        profilePic: state.me.profilePic,
        coverPic: state.me.coverPic
    };
};

class EditInfos extends Component {
    constructor(props) {
        super();

        this.state = {
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            firstName: props.firstName || "",
            lastName: props.lastName || "",
            bio: props.bio || "",
            city: props.city || "",
            food: props.food || "",
            chef: props.chef || "",
            email: props.email || "",
            password: ""
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/profile/edit", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                this.props.dispatch(
                    editProfile(
                        this.props.id,
                        this.props.profilePic,
                        this.props.coverPic,
                        this.state
                    )
                );
                this.props.history.push("/");
            }
        });
    }

    render() {
        return (
            <div className="registration">
                <div className="form-wrapper2">
                    <div className="form-wrapper">
                        {this.state.error ? (
                            <div>{this.state.error}</div>
                        ) : null}
                        <div className="edit-profile">Edit Profile</div>
                        <form className="form-edit">
                            <div className="wrapper-email">
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="firstName"
                                    value={this.state.firstName}
                                    type="text"
                                />
                                <div className="down-input">First Name</div>
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="lastName"
                                    value={this.state.lastName}
                                    type="text"
                                />
                                <div className="down-input">Last Name</div>
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={this.state.email}
                                    type="text"
                                />
                                <div className="down-input">Email</div>

                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="password"
                                    placeholder="Type a new password"
                                    value={this.state.password}
                                    type="password"
                                />
                                <div className="down-input">Password</div>
                            </div>
                            <div className="wrapper-editprof">
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="bio"
                                    value={this.state.bio}
                                    type="text"
                                />
                                <div className="down-input">Bio</div>
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="city"
                                    value={this.state.city}
                                    type="text"
                                />
                                <div className="down-input">
                                    City and Country
                                </div>
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="food"
                                    value={this.state.food}
                                    type="text"
                                />
                                <div className="down-input">Favorite Foods</div>
                                <input
                                    className="inputs-edit"
                                    onChange={this.handleChange}
                                    name="chef"
                                    value={this.state.chef}
                                    type="text"
                                />
                                <div className="down-input">Favorite Chefs</div>
                            </div>
                        </form>
                        <button
                            className="editbutton"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(EditInfos));

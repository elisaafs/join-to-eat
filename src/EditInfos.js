import React, { Component } from "react";
import axios from "./axios";

class EditInfos extends Component {
    constructor() {
        super();

        this.state = {
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post("/editprofile", this.state).then(resp => {
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                location.replace("/");
            }
        });
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            chef,
            food,
            bio,
            city
        } = this.props;
        return (
            <div className="registration">
                <div className="form-wrapper">
                    {this.state.error ? <div>{this.state.error}</div> : null}
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            placeholder={firstName}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            placeholder={lastName}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder={email}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder="Type a new password"
                            type="password"
                        />
                        <input
                            onChange={this.handleChange}
                            name="bio"
                            placeholder={bio}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="city"
                            placeholder={city}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="food"
                            placeholder={food}
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="chef"
                            placeholder={chef}
                            type="text"
                        />

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditInfos;

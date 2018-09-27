import React, { Component } from "react";
import axios from "./axios";

class Registration extends Component {
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

        axios.post("/registration", this.state).then(resp => {
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
        return (
            <div className="registration">
                <div className="form-wrapper">
                    {this.state.error ? (
                        <div className="error">{this.state.error}</div>
                    ) : null}
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Email"
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;

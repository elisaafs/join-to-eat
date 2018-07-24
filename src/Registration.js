import React, { Component } from "react";
import axios from "axios";

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
            console.log(this.state);
            console.log(resp.data.user);
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
                <h1>Registration</h1>
                {this.state.error ? <div>ERROR: {this.state.error}</div> : null}
                <div className="form-wrapper">
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
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;

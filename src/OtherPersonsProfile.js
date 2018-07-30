import React, { Component } from "react";
import axios from "./axios";

class OtherPersonsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + ".json")
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
            });
    }
    render() {
        return <div />;
    }
}

export default OtherPersonsProfile;

import React from "react";
import axios from "./axios";

export default class Button extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.getButtonText = this.getButtonText.bind(this);
        this.updateFriendship = this.updateFriendship.bind(this);
    }

    componentDidMount() {
        axios.get("/friendships/" + this.props.otherUserId).then(results => {
            if (Object.keys(results.data).length == 0) {
                this.setState({
                    status: "no friendship"
                });
            } else if (results.data.status == "pending") {
                this.setState(
                    {
                        status: "pending",
                        receiverId: results.data.receiver_id
                    },
                    () => console.log("state after update: ", this.state)
                );
            } else if (results.data.status == "friends") {
                this.setState({ status: "friends" });
            }
        });
    }

    updateFriendship() {
        if (this.getButtonText() == "Add Friend") {
            axios
                .post("/friendships/pending/" + this.props.otherUserId)
                .then(results => {
                    if (results.data.success) {
                        this.setState({
                            status: "pending",
                            receiverId: this.props.otherUserId
                        });
                    }
                });
        } else if (this.getButtonText() == "Cancel Friend Request") {
            axios
                .post("/friendships/cancel/" + this.props.otherUserId)
                .then(results => {
                    if (results.data.success) {
                        this.setState({ status: "no friendship" });
                    }
                });
        } else if (this.getButtonText() == "Accept Friend Request") {
            axios
                .post("/friendships/accept/" + this.props.otherUserId)
                .then(results => {
                    if (results.data.success) {
                        this.setState({ status: "friends" });
                    }
                });
        } else if (this.getButtonText() == "Unfriend") {
            axios
                .post("/friendships/cancel/" + this.props.otherUserId)
                .then(results => {
                    if (results.data.success) {
                        this.setState({ status: "no friendship" });
                    }
                });
        }
    }

    getButtonText() {
        if (this.state.status == "no friendship") {
            return "Add Friend";
        } else if (this.state.status == "pending") {
            if (this.state.receiverId == this.props.otherUserId) {
                return "Cancel Friend Request";
            } else {
                return "Accept Friend Request";
            }
        } else if (this.state.status == "friends") {
            return "Unfriend";
        }
    }

    render() {
        return (
            <button className="friend-button" onClick={this.updateFriendship}>
                {this.getButtonText()}
            </button>
        );
    }
}

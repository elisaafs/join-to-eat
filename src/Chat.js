import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { emitChatMessage } from "./socket";

const mapStateToProps = state => {
    // console.log("state", state);
    return {
        newChatMsg: state.chat
    };
};

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        emitChatMessage(this.state.chatMessage);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        // if (!this.props.messages) {
        //     return null;
        // }
        return (
            <div className="wrapper-online">
                <div id="friends-page">
                    <div className="big-wrapper-friends">
                        <div className="extra-extra-wrapper">
                            <h1 className="friends-title">Chat</h1>
                            <form
                                onClick={e => this.handleClick(e)}
                                className=""
                            >
                                <textarea
                                    className="textArea"
                                    name="chatMessage"
                                    onChange={e => this.handleChange(e)}
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);

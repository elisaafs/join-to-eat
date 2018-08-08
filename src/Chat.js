import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { emitChatMessage } from "./socket";
import ChatMessage from "./ChatMessage";

const mapStateToProps = state => {
    // console.log("state", state);
    return {
        chatMessages: state.chat,
        myId: state.me.id
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
        this.setState({ chatMessage: "" });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            chatMessage: e.target.value
        });
    }

    componentDidUpdate() {
        console.log(
            "test",
            this.elem.scrollTop,
            this.elem.scrollHeight,
            this.elem.clientHeight
        );
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }

    render() {
        // if (!this.props.messages) {
        //     return null;
        // }
        const chatMessagesComponents = this.props.chatMessages.map(
            (message, index) => (
                <ChatMessage key={index} {...message} myId={this.props.myId} />
            )
        );

        return (
            <div className="big-wrapper-chat">
                <h1 className="friends-title">Chat</h1>
                <div className="chat-messages" ref={elem => (this.elem = elem)}>
                    {chatMessagesComponents}
                </div>
                <form onSubmit={e => this.handleClick(e)} className="chat-form">
                    <textarea
                        className="textArea"
                        name="chatMessage"
                        onChange={e => this.handleChange(e)}
                        value={this.state.chatMessage}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);

import React from "react";
import { connect } from "react-redux";
import { emitChatMessage } from "./socket";
import ChatMessage from "./ChatMessage";
import OnlineUsers from "./OnlineUsers";

const mapStateToProps = state => {
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
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }

    render() {
        const chatMessagesComponents = this.props.chatMessages.map(
            (message, index) => (
                <ChatMessage key={index} {...message} myId={this.props.myId} />
            )
        );

        return (
            <div className="chat-page">
                <OnlineUsers />
                <div className="big-wrapper-chat">
                    <h1 className="friends-title">Chat</h1>
                    <div
                        className="chat-messages"
                        ref={elem => (this.elem = elem)}
                    >
                        {chatMessagesComponents}
                    </div>
                    <form
                        onSubmit={e => this.handleClick(e)}
                        className="chat-form"
                    >
                        <textarea
                            className="textarea"
                            name="chatMessage"
                            onChange={e => this.handleChange(e)}
                            value={this.state.chatMessage}
                        />
                        <button className="chat-button" type="submit">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chat);

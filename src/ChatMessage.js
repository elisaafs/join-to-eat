import React from "react";
import { Link } from "react-router-dom";

function ChatMessage({ user, content, date, myId }) {
    const userBasedClass =
        myId === user.id ? "chat-message-me" : "chat-message-other";
    return (
        <div className={`chat-message ${userBasedClass}`}>
            <div className="wrapper-image-name">
                <Link className="a-name" to={`/user/${user.id}`}>
                    <div className="wrapper-chat-image">
                        <img
                            id="chat-message-image"
                            src={user.profile_pic || "/default.png"}
                        />
                    </div>
                    <div id="chat-message-username">{`${user.first_name} ${
                        user.last_name
                    }`}</div>
                </Link>
            </div>
            <div className="wrapper-message-date">
                <div id="chat-message-content">{content}</div>
                <div id="chat-message-date">
                    {new Date(date).toLocaleString("en-GB")}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;

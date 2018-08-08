import React from "react";

function ChatMessage({ user, content, date, myId }) {
    const userBasedClass =
        myId === user.id ? "chat-message-me" : "chat-message-other";
    return (
        <div className={`chat-message ${userBasedClass}`}>
            <img
                id="chat-message-image"
                src={user.profile_pic || "/default.png"}
            />
            <div id="chat-message-username">{`${user.first_name} ${
                user.last_name
            }`}</div>
            <div id="chat-message-content">{content}</div>
            <div id="chat-message-date">
                {new Date(date).toLocaleString("en-GB")}
            </div>
        </div>
    );
}

export default ChatMessage;

import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    newMessage,
    recentMessages
} from "./actions";

let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", user => {
            store.dispatch(userLeft(user));
        });

        socket.on("newMessage", message => {
            store.dispatch(newMessage(message));
        });

        socket.on("recentMessages", messages => {
            store.dispatch(recentMessages(messages));
        });
    }
}

export function emitChatMessage(newChatMsg) {
    console.log("are we here?");
    socket.emit("chatMessage", newChatMsg);
}

import axios from "./axios";

export async function receiveFriendsWannabe() {
    const { data } = await axios.get("/wannabe-friends");
    console.log("data", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABE",
        users: data.results
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/friendships/accept/${id}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id
    };
}

export async function endFriendship(id) {
    await axios.post(`/friendships/cancel/${id}`);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export async function loadMyProfile() {
    const { data } = await axios.get("/user");
    return {
        type: "LOAD_MY_PROFILE",
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePic: data.profile_pic || "/default.png",
        coverPic: data.cover_pic || "/defaultcover.png"
    };
}

export function setMyCoverPic(coverPic) {
    return {
        type: "SET_MY_COVER_PIC",
        coverPic
    };
}

export function setMyProfilePic(profilePic) {
    return {
        type: "SET_MY_PROFILE_PIC",
        profilePic
    };
}

export function userJoined(user) {
    return {
        type: "USER_JOINED",
        user
    };
}

export function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        users
    };
}

export function userLeft(user) {
    return {
        type: "USER_LEFT",
        user
    };
}

export function newMessage(message) {
    return {
        type: "NEW_MESSAGE",
        message
    };
}

export function recentMessages(messages) {
    return {
        type: "RECENT_MESSAGES",
        messages
    };
}

export async function friendsOfFriends(id) {
    const { data } = await axios.get(`/friends/${id}`);
    return {
        type: "FRIENDS_OF_FRIENDS",
        friends: data.results
    };
}

export async function getComments(dispatch, userId) {
    const { data } = await axios.get(`/comments/${userId}`);
    data.forEach(comment => {
        dispatch(loadUser(comment.author_id));
    });
    return {
        type: "GET_COMMENTS",
        userId,
        comments: data
    };
}

export async function postComment(comment, userId) {
    const { data } = await axios.post("/comment", {
        userId,
        comment
    });
    return {
        type: "POST_COMMENT",
        userId,
        comment: data.comment
    };
}

export async function loadUser(userId) {
    console.log("load user", userId);
    const { data } = await axios.get(`/otheruser/${userId}`);
    console.log("load user got data", userId, data);
    return {
        type: "USER_LOADED",
        userId,
        userInformation: data
    };
}

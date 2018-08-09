import { combineReducers } from "redux";
import { online } from "./online";
import { chat } from "./chat";
import { friendsOfFriends } from "./friendsoffriends";
import { otherUsers } from "./otherUsers";
import { me } from "./me";
import { wallpost } from "./wallpost";
import { users } from "./users";

const mainReducer = combineReducers({
    me,
    otherUsers,
    online,
    chat,
    friendsOfFriends,
    wallpost,
    users
});

export default mainReducer;

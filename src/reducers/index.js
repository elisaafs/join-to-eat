import { combineReducers } from "redux";
import { online } from "./online";
import { chat } from "./chat";

import { otherUsers } from "./otherUsers";
import { me } from "./me";

const mainReducer = combineReducers({
    me,
    otherUsers,
    online,
    chat
});

export default mainReducer;

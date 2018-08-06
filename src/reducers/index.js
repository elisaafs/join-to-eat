import { combineReducers } from "redux";
import { online } from "./online";

import { otherUsers } from "./otherUsers";
import { me } from "./me";

const mainReducer = combineReducers({
    me,
    otherUsers,
    online
});

export default mainReducer;

import { combineReducers } from "redux";

import { otherUsers } from "./otherUsers";
import { me } from "./me";

const mainReducer = combineReducers({
    me,
    otherUsers
});

export default mainReducer;

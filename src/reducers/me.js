export function me(state = {}, action) {
    switch (action.type) {
        case "LOAD_MY_PROFILE":
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                profilePic: action.profilePic,
                coverPic: action.coverPic
            };

        case "SET_MY_COVER_PIC":
            return {
                ...state,
                coverPic: action.coverPic
            };

        case "SET_MY_PROFILE_PIC":
            return {
                ...state,
                profilePic: action.profilePic
            };
    }
    return state;
}

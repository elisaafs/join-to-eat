export function wallpost(state = {}, action) {
    switch (action.type) {
        case "GET_COMMENTS":
            return {
                ...state,
                [action.userId]: action.comments
            };

        case "POST_COMMENT":
            return {
                ...state,
                [action.userId]: [action.comment, ...state[action.userId]]
            };
    }

    return state;
}

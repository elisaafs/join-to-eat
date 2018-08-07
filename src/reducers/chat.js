export function chat(state = [], action) {
    switch (action.type) {
        case "NEW_MESSAGE":
            return [...state, action.message];

        case "RECENT_MESSAGES":
            return action.messages;
    }

    return state;
}

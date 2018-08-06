export function online(state = [], action) {
    switch (action.type) {
        case "ONLINE_USERS":
            return action.users;

        case "USER_JOINED":
            return [...state, action.user];

        case "USER_LEFT":
            return state.filter(user => user.id != action.user.id);
    }

    return state;
}

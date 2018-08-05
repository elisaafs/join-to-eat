export function otherUsers(state = [], action) {
    switch (action.type) {
        case "RECEIVE_FRIENDS_WANNABE":
            return action.users;

        case "ACCEPT_FRIEND_REQUEST":
            return state.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        status: "friends"
                    };
                }
                return user;
            });

        case "END_FRIENDSHIP":
            return state.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        status: "no friendship"
                    };
                }
                return user;
            });
    }
    return state;
}

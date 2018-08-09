export function friendsOfFriends(state = [], action) {
    switch (action.type) {
        case "FRIENDS_OF_FRIENDS":
            return action.friends;
    }

    return state;
}

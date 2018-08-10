import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { friendsOfFriends } from "./actions";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        friendsOfFriends: state.friendsOfFriends
    };
};

class FriendsOfFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(friendsOfFriends(this.props.id));
    }

    createFriendsOfFriendsListView(friends, emptyMessage) {
        if (friends.length > 0) {
            return friends.map(friend => (
                <div key={friend.id} className="single-friend">
                    <div className="friendsof-wrapper2">
                        <div className="img-name-friends">
                            <div className="wrapper-friendsof-img">
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="friendsof-img"
                                        src={
                                            friend.profile_pic || "/default.png"
                                        }
                                    />
                                </Link>
                            </div>
                            <Link className="a-name" to={`/user/${friend.id}`}>
                                <div className="friendof-name">
                                    {friend.first_name} {friend.last_name}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ));
        }
        return <div className="no-friendof-requests">{emptyMessage}</div>;
    }

    createFriendsOfFriendsView() {
        return this.createFriendsOfFriendsListView(
            this.props.friendsOfFriends,
            "This person doesn't have friends."
        );
    }

    render() {
        const { friendsOfFriends } = this.props;
        if (!friendsOfFriends) {
            return null;
        }

        return (
            <div id="friendsof-page">
                <div className="big-wrapper-friendsof">
                    <div className="extra-extra-wrapper">
                        <h1 className="friendsof-title">
                            <i className="fas fa-utensil-spoon friendsof" />Friends
                        </h1>
                        <div className="extra-wrapper-friendsof">
                            {this.createFriendsOfFriendsView()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(FriendsOfFriends);

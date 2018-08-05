import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    receiveFriendsWannabe,
    acceptFriendRequest,
    endFriendship
} from "./actions";

const mapStateToProps = state => {
    return {
        friends:
            state.otherUsers &&
            state.otherUsers.filter(f => f.status == "friends"),
        pending:
            state.otherUsers &&
            state.otherUsers.filter(f => f.status == "pending")
    };
};

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeUploader = this.closeUploader.bind(this);
        this.showUploader = this.showUploader.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabe());
    }

    handleFriendClick(wannabe) {
        this.props.dispatch(acceptFriendRequest(wannabe.id));
    }

    handleUnfriendClick(friend) {
        this.props.dispatch(endFriendship(friend.id));
    }

    createFriendsListView(
        friends,
        buttonCaption,
        buttonClickHandler,
        emptyMessage
    ) {
        if (friends.length > 0) {
            return friends.map(friend => (
                <div key={friend.id} className="single-friend">
                    <div className="friends-wrapper">
                        <div className="img-name">
                            <div className="wrapper-friends-img">
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="friends-img"
                                        src={
                                            friend.profile_pic || "/default.png"
                                        }
                                    />
                                </Link>
                            </div>
                            <Link className="a-name" to={`/user/${friend.id}`}>
                                <div className="friend-name">
                                    {friend.first_name} {friend.last_name}
                                </div>
                            </Link>
                        </div>
                        <div className="button">
                            <button
                                className="button-friend"
                                onClick={buttonClickHandler.bind(this, friend)}
                            >
                                <i className="fas fa-user-plus icon-friend" />
                                {buttonCaption}
                            </button>
                        </div>
                    </div>
                </div>
            ));
        }
        return <div className="no-friend-requests">{emptyMessage}</div>;
    }

    createFriendRequestView() {
        return this.createFriendsListView(
            this.props.pending,
            "Accept",
            this.handleFriendClick,
            "No new requests"
        );
    }

    createDeleteFriendView() {
        return this.createFriendsListView(
            this.props.friends,
            "Unfriend",
            this.handleUnfriendClick,
            "No friends"
        );
    }
    render() {
        const { friends, pending } = this.props;
        if (!friends && !pending) {
            return null;
        }

        return (
            <div id="friends-page">
                <div className="big-wrapper-friends">
                    <div className="extra-extra-wrapper">
                        <h1 className="friends-title">Friends Requests</h1>
                        <div className="extra-wrapper">
                            {this.createFriendRequestView()}
                        </div>
                    </div>

                    <div className="extra-extra-wrapper">
                        <h1 className="friends-title">Your Friends</h1>
                        <div className="extra-wrapper">
                            {this.createDeleteFriendView()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Friends);

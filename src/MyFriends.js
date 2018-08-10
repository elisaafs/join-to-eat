import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { receiveFriendsWannabe } from "./actions";

const mapStateToProps = state => {
    return {
        friends:
            state.otherUsers &&
            state.otherUsers.filter(f => f.status == "friends")
    };
};

class MyFriends extends React.Component {
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

    createFriendsListView(friends, emptyMessage) {
        if (friends.length > 0) {
            return friends.map(friend => (
                <div key={friend.id} className="single-friend">
                    <div className="myfriends-wrapper">
                        <div className="img-name-online">
                            <div className="wrapper-myfriends-img">
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="myfriends-img"
                                        src={
                                            friend.profile_pic || "/default.png"
                                        }
                                    />
                                </Link>
                            </div>
                            <Link className="a-name" to={`/user/${friend.id}`}>
                                <div className="myfriend-name">
                                    {friend.first_name} {friend.last_name}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ));
        }
        return <div className="no-myfriend-requests">{emptyMessage}</div>;
    }

    createDeleteFriendView() {
        return this.createFriendsListView(this.props.friends, "No friends");
    }
    render() {
        const { friends, pending } = this.props;
        if (!friends && !pending) {
            return null;
        }

        return (
            <div className="big-wrapper-myfriends">
                <div className="extra-extra-wrapper">
                    <h1 className="myfriends-title">
                        <i className="fas fa-utensil-spoon friendsof" />Your
                        Friends
                    </h1>
                    <div className="extra-wrapper-myfriends">
                        {this.createDeleteFriendView()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MyFriends);

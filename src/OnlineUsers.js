import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
    return {
        onlineUsers: state.online
    };
};

class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createUsersOnlineView(onlineFriends) {
        if (onlineFriends.length > 0) {
            return onlineFriends.map(onlineFriends => (
                <div key={onlineFriends.id} className="single-friend">
                    <div className="friends-wrapper-online">
                        <div className="img-name">
                            <div className="wrapper-friends-online-img">
                                <Link to={`/user/${onlineFriends.id}`}>
                                    <img
                                        className="friends-online-img"
                                        src={
                                            onlineFriends.profile_pic ||
                                            "/default.png"
                                        }
                                    />
                                </Link>
                            </div>
                            <div className="green-online" />
                            <Link
                                className="a-name"
                                to={`/user/${onlineFriends.id}`}
                            >
                                <div className="online-friend-name">
                                    {onlineFriends.first_name}{" "}
                                    {onlineFriends.last_name}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ));
        }
        return <div className="no-friend-online">No friends online</div>;
    }

    render() {
        return (
            <div className="wrapper-online">
                <div id="friends-page">
                    <div className="big-wrapper-online">
                        <div className="extra-extra-wrapper-online">
                            <h1 className="friends-online">Online Users</h1>
                            <div className="extra-wrapper-online">
                                {this.createUsersOnlineView(
                                    this.props.onlineUsers
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(OnlineUsers);

import React from "react";
import axios from "./axios";
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
                            <div className="wrapper-friends-img">
                                <Link to={`/user/${onlineFriends.id}`}>
                                    <img
                                        className="friends-img"
                                        src={
                                            onlineFriends.profile_pic ||
                                            "/default.png"
                                        }
                                    />
                                </Link>
                            </div>
                            <Link
                                className="a-name"
                                to={`/user/${onlineFriends.id}`}
                            >
                                <div className="friend-name">
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
                    <div className="big-wrapper-friends">
                        <div className="extra-extra-wrapper">
                            <h1 className="friends-title">Online Users</h1>
                            <div className="extra-wrapper">
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

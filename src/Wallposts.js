import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getComments, postComment } from "./actions";

const mapStateToProps = (state, props) => {
    return {
        ...props,
        comments: state.wallpost[props.id],
        users: state.users
    };
};

class Wallpost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addNewWallPost = this.addNewWallPost.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getComments(this.props.dispatch, this.props.id));
    }

    addNewWallPost() {
        this.props.dispatch(postComment(this.state.newPost, this.props.id));
        this.setState({ newPost: "" });
    }

    handleChange(e) {
        this.setState({ newPost: e.target.value });
    }

    createWallpost(comments, emptyMessage) {
        if (comments && comments.length > 0) {
            return comments.map(comment => {
                const author = this.props.users[comment.author_id];
                const firstName = author ? author.first_name : "";
                const lastName = author ? author.last_name : "";
                const profilePic = author ? (
                    <img
                        className="friendsonline-img"
                        src={author.profile_pic || "/default.png"}
                    />
                ) : null;

                return (
                    <div key={comment.id} className="single-friend">
                        <div className="friendsof-wrapper">
                            <div className="img-comment">
                                <div className="img-name-wallpost">
                                    <div className="wrapper-online-img">
                                        <Link to={`/user/${comment.author_id}`}>
                                            {profilePic}
                                        </Link>
                                    </div>
                                    <Link
                                        className="a-name"
                                        to={`/user/${comment.author_id}`}
                                    >
                                        <div className="friendof-name">
                                            {firstName} {lastName}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="comment">{comment.comment}</div>
                        </div>
                    </div>
                );
            });
        }

        if (!comments) {
            return null;
        }

        return <div className="no-wallpost-requests">{emptyMessage}</div>;
    }

    createWallpostView() {
        return this.createWallpost(this.props.comments, "No posts");
    }

    render() {
        return (
            <div id="friendsof-page">
                <div className="big-wrapper-friendsof">
                    <div className="extra-extra-wrapper">
                        <h1 className="online-title">
                            <i className="fas fa-utensils friendsof" />Share
                            Your Hungry
                        </h1>
                        <div className="extra-wrapper-friendsof">
                            {this.createWallpostView()}
                        </div>
                        <div className="wrapper-inlet-online">
                            <textarea
                                onChange={this.handleChange}
                                name="comment"
                                className="textarea-comment"
                                value={this.state.newPost}
                            />
                            <button
                                className="button-comment"
                                onClick={this.addNewWallPost}
                                type="submit"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Wallpost);

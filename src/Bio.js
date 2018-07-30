import React, { Component } from "react";

class Bio extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { bio, showBio, toggleShowBio, setBio } = this.props;
        return (
            <div>
                {bio ? (
                    <p>
                        {bio} <span onClick={toggleShowBio}>Edit</span>{" "}
                    </p>
                ) : (
                    <p className="text-bio" onClick={toggleShowBio}>
                        Click here to write a bio
                    </p>
                )}

                {showBio && (
                    <textarea
                        onChange={this.handleChange}
                        name="bio"
                        id=""
                        cols="30"
                        rows="10"
                    />
                )}

                {showBio && (
                    <button
                        onClick={() => {
                            setBio(this.state.bio);
                            toggleShowBio();
                        }}
                    >
                        SAVE
                    </button>
                )}
            </div>
        );
    }
}

export default Bio;

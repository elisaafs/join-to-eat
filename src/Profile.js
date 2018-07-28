import React, { Component } from "react";

class Profile extends Component {
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
        const {
            firstName,
            lastName,
            id,
            profilePic,
            bio,
            showBio,
            toggleShowBio,
            setBio
        } = this.props;
        return (
            <div>
                <h1>PROFILE</h1>
                <h3>{`${firstName} ${lastName}`}</h3>

                {bio ? (
                    <p>
                        {bio} <span onClick={toggleShowBio}>Edit</span>{" "}
                    </p>
                ) : (
                    <p onClick={toggleShowBio}>Click here to write a bio</p>
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

export default Profile;

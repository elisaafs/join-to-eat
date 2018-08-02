import React from "react";
import OtherPersonsProfile from "./OtherPersonsProfile";
import axios from "./axios";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setProfilePic = this.setProfilePic.bind(this);
        this.setCoverPic = this.setCoverPic.bind(this);
    }

    setProfilePic(url) {
        this.setState({
            profilePic: url
        });
    }

    setCoverPic(coverUrl) {
        this.setState({
            coverPic: coverUrl
        });
    }

    componentDidMount() {
        //function that reacts calls for you wheneaver the component comes to life.
        axios.get("/user").then(({ data }) => {
            this.setState({
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                profilePic: data.profile_pic || "/default.png",
                coverPic: data.cover_pic || "/defaultcover.png"
            });
        });
    }

    render() {
        const { firstName, lastName, id, profilePic, coverPic } = this.state;
        if (!this.state.id) {
            return null;
        }

        return (
            <BrowserRouter>
                <div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                profilePic={profilePic}
                                firstName={firstName}
                                lastName={lastName}
                                id={id}
                                coverPic={coverPic}
                                setProfilePic={this.setProfilePic}
                                setCoverPic={this.setCoverPic}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherPersonsProfile
                                profilePic={profilePic}
                                firstName={firstName}
                                lastName={lastName}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

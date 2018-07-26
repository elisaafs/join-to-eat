import React from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import axios from "./axios";
import Uploader from "./Uploader";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(url) {
        this.setState({
            image: url,
            uploaderIsVisible: false
        });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("are you working?");
            this.setState({
                id: data.id,
                first: data.first_name,
                last: data.last_name,
                image: data.profile_pic || "/default.jpg"
            });
        });
    }

    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <div id="app">
                <Logo />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={this.showUploader}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}

export default App;

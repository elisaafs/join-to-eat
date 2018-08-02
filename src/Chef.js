import React, { Component } from "react";

class Chef extends Component {
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
        const { chef, showChef, toggleShowChef, setChef } = this.props;
        return (
            <div className="wrapper-chef">
                {chef && this.handleChange ? (
                    <div className="chef">
                        {chef} <span onClick={toggleShowchef}>Edit</span>{" "}
                    </div>
                ) : (
                    <p className="text-chef" onClick={toggleShowchef}>
                        You still do not defined your chef.
                    </p>
                )}

                {showchef && (
                    <textarea
                        onChange={this.handleChange}
                        name="chef"
                        id=""
                        cols="3"
                        rows="1"
                    />
                )}

                {showchef && (
                    <button
                        onClick={() => {
                            setchef(this.state.chef);
                            toggleShowchef();
                        }}
                    >
                        SAVE
                    </button>
                )}
            </div>
        );
    }
}

export default Chef;

import React, { Component } from "react";

class Age extends Component {
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
        const { age, showAge, toggleShowAge, setAge } = this.props;
        return (
            <div className="wrapper-age">
                {age && this.handleChange ? (
                    <div className="age">
                        {age} <span onClick={toggleShowAge}>Edit</span>{" "}
                    </div>
                ) : (
                    <p className="text-age" onClick={toggleShowAge}>
                        You still do not defined your age.
                    </p>
                )}

                {showAge && (
                    <textarea
                        onChange={this.handleChange}
                        name="age"
                        id=""
                        cols="3"
                        rows="1"
                    />
                )}

                {showAge && (
                    <button
                        onClick={() => {
                            setAge(this.state.age);
                            toggleShowAge();
                        }}
                    >
                        SAVE
                    </button>
                )}
            </div>
        );
    }
}

export default Age;

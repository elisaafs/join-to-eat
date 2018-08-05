import React from "react";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //function that reacts calls for you wheneaver the component comes to life.
    }

    render() {
        return [
            <Header key="header" />,
            <Main key="main" />,
            <Footer key="footer" />
        ];
    }
}

export default App;

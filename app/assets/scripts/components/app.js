import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import Sidebar from "./sidebar";
import Workspace from "./workspace";
import Footer from "./footer";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }
    render() {

        return (
            <div className="component-app">
                <Sidebar />
                <Workspace />
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(App);

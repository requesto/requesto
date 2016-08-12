import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {foldersFetch} from "../actions/index";
import File from "../libs/file";
import $ from "jquery";
import jQuery from "jquery";
window.$ = $;
window.jQuery = jQuery;


class App extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.file = new File();
        this.file.loadSetupFile(function (data){
            props.foldersFetch(data.folders);
        });
    }

    render() {
        return (
            <div className="component-app">
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({foldersFetch},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(App);

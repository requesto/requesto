import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {foldersFetch,folderAdd,modal} from "../actions/index";
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

        document.addEventListener('keyup', (e) => {
            if (e.shiftKey && e.keyCode == 65) {
                props.modal("newFolder");
            }
        }, false);
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
    return bindActionCreators({foldersFetch,folderAdd,modal},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(App);

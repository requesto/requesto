import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {viewerAdd} from "./../actions/index";

import Axios from 'axios';
import $ from "jquery";
import jQuery from "jquery";
window.$ = $;
window.jQuery = jQuery;

import Tabs from "./tabs";
import Viewer from "./viewer";

class Workspace extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickSend = this.onClickSend.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("Workspace: ",nextProps );
    }

    onClickSend(){

        const action = $(".bar .input-action").val();
        const url = $(".bar .input-url").val();

        $('#json-renderer').html("Carregando....");

        Axios({
            method: action,
            url: url
        }).then(function(response) {
            $('#json-renderer').jsonViewer(response);
        })
        .catch(function(error) {
            $('#json-renderer').jsonViewer(error);
        });
    }

    render() {
        return (
            <div className="component-workspace">
                <div className="top">
                    <Tabs />
                    <div className="bar">
                        <div className="columm action">
                            <input className="input-action" type="text" name="action" placeholder="GET" defaultValue="get" />
                        </div>
                        <div className="columm url">
                            <input className="input-url" name="url" placeholder="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" defaultValue="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" />
                        </div>
                        <div className="columm button">
                            <input className="input-button" onClick={this.onClickSend} type="button" name="send" defaultValue="Send" />
                        </div>
                    </div>
                </div>
                <Viewer />
            </div>
        );
    }
}

function mapStateToProps({viewers}){
    return {viewers};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({viewerAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Workspace);

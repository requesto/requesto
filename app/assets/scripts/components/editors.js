import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd} from "./../actions/index";

import Axios from 'axios';
import $ from "jquery";
import jQuery from "jquery";
window.$ = $;
window.jQuery = jQuery;

import Viewer from "./viewer";

class Editors extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickSend = this.onClickSend.bind(this);
        this.renderEditors = this.renderEditors.bind(this);
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

    renderEditors(data,index){
        return (
            <li className="editor" key={"editor-" + data.name}>
                <div className="top">
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
                <h1>{data.name}</h1>
                <Viewer />
            </li>
        )
    }

    render() {
        return (
            <div className="component-editors">
                <ul className="list">
                    {this.props.tabs.map(this.renderEditors)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({tabs}){
    return {tabs};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({tabAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Editors);

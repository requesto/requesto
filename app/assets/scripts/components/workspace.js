import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Axios from 'axios';
import $ from 'jquery';
//import "jquery.json-viewer/json-viewer/jquery.json-viewer";


class Workspace extends Component {

    constructor(props){
        super(props);
        this.state = {};

        this.onClickSend = this.onClickSend.bind(this);
    }

    onClickSend(){

        const action = $(".bar .input-action").val();
        const url = $(".bar .input-url").val();

        $('#json-renderer').html("Carregando....");

        Axios({
            method: action,
            url: url
        }).then(function(response) {
            $(".result").html(JSON.stringify(response));
            //$('#json-renderer').jsonViewer(response);
        })
        .catch(function(error) {
            $(".result").html(JSON.stringify(error));
            //$('#json-renderer').jsonViewer(error);
        });
    }

    render() {
        return (
            <div className="component-workspace">
                <div className="component-tabs">
                    <ul className="tabs">
                        <li className="tab active">user/token</li>
                        <li className="tab">Aba 4</li>
                        <li className="tab">Aba 3</li>
                    </ul>
                </div>
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
                <div className="result">
                    <pre id="json-renderer"></pre>
                </div>
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

export default connect (mapStateToProps,mapDispatchToProps)(Workspace);

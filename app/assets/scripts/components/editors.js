import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd} from "./../actions/index";

import Axios from 'axios';
import Viewer from "./viewer";

class Editors extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickSend = this.onClickSend.bind(this);
        this.renderEditors = this.renderEditors.bind(this);
    }

    onClickSend(e){
        const editor = $(e.currentTarget).closest(".editor");
        const action =  editor.find(".bar .select .action").val();
        const url =  editor.find(".bar .input-url").val();
        const viewer = editor.find(".component-viewer");
        const jsonViewer = editor.find(".json-renderer");
        const headersLabel = editor.find(".field.headers .value");
        const statusLabel = editor.find(".field.status .value");
        const timeLabel = editor.find(".field.time .value");
        const startTime = new Date().getTime();
        // jsonViewer.html("");
        viewer.addClass("-loading");

        Axios({
            method: action,
            url: url
        }).then(function(response) {
            const duration = new Date().getTime() - startTime;
            jsonViewer.jsonViewer(response);
            headersLabel.html(Object.keys(response.headers).length);
            statusLabel.html(response.status).removeClass("-error");
            timeLabel.html(duration + "ms");
            viewer.removeClass("-loading");
        })
        .catch(function(error) {
            const duration = new Date().getTime() - startTime;
            jsonViewer.jsonViewer(error);
            headersLabel.html(Object.keys(error.headers).length);
            statusLabel.html(error.status).addClass("-error");
            timeLabel.html(duration + "ms");
            viewer.removeClass("-loading");
        });
    }

    renderEditors(data,index){
        return (
            <li className="editor" key={"editor-" + data.name + "-" + index}>
                <div className="top">
                    <div className="bar">
                        <div className="columm action">
                            <div className="select">
                                <select className="action">
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="PATCH">PATCH</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>
                        </div>
                        <div className="columm url">
                            <input className="input-url" name="url" placeholder="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" defaultValue="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" />
                        </div>
                        <div className="columm button">
                            <input className="input-button" onClick={this.onClickSend} type="button" name="send" defaultValue="Send" />
                        </div>
                    </div>
                    <div className="viewer-tabs">
                        <ul className="list">
                            <li className="item -active">Pretty</li>
                            <li className="item">Raw</li>
                            <li className="item">Preview</li>
                        </ul>
                    </div>

                </div>
                <Viewer />
                <div className="bottom">
                    <div className="metadata">
                        <div className="field headers">
                            <span className="label">headers:</span>
                            <span className="value">-</span>
                        </div>
                        <div className="field status">
                            <span className="label">status:</span>
                            <span className="value">-</span>
                        </div>
                        <div className="field time">
                            <span className="label">Time:</span>
                            <span className="value">-</span>
                        </div>
                    </div>
                </div>
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

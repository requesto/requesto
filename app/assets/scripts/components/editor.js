import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd,modal,folderItemEdit} from "./../actions/index";

import Axios from 'axios';
import Viewer from "./viewer";
import Properties from "./properties";

class Editor extends Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.data.id,
            name: props.data.name,
            type: (props.data.type  == "")? "GET" : props.data.type,
            url: props.data.url,
            descriptions: props.data.description,
            headers: props.data.headers,
            params: props.data.params,
            body: props.data.body,
            response: {
                headers: "-",
                time: "-",
                status: "-"
            },
            selectedProperty: null
        };

        this.onClickSend = this.onClickSend.bind(this);
        this.onClickViewerTab = this.onClickViewerTab.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickHeaders = this.onClickHeaders.bind(this);
        this.onClickParams = this.onClickParams.bind(this);
        this.onClickBody = this.onClickBody.bind(this);
        this.isSaved = this.isSaved.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: this.props.data.id,
            name: this.props.data.name,
            type: (this.props.data.type  == "")? "GET" : this.props.data.type,
            url: this.props.data.url,
            descriptions: this.props.data.description,
            headers: this.props.data.headers,
            params: this.props.data.params,
            body: this.props.data.body,
        })
    }

    onClickSend(e){

        (this.state.url == "")? alert("Enter a request URL!") : e.preventDefault();

        const editor = $(e.currentTarget).closest(".editor");
        const viewer = editor.find(".component-viewer");
        const prettyViewer = viewer.find(".viewer.pretty");
        const rawViewer = viewer.find(".viewer.raw");
        const previewViewer = viewer.find(".viewer.preview");
        const headersViewer = viewer.find(".viewer.headers");
        const startTime = new Date().getTime();

        viewer.addClass("-loading");
        editor.find("requesto-editor-tabs").show();

        Axios({
            method: this.state.type,
            url: this.state.url,
            headers: this.state.headers,
            params: this.state.params,
            data: this.state.body

        }).then(response => {
            const duration = new Date().getTime() - startTime;
            prettyViewer.jsonViewer(response.data);
            headersViewer.jsonViewer(response.headers);
            rawViewer.text(JSON.stringify(response.data));
            viewer.removeClass("-loading");
            previewViewer.find(".iframe").attr("src",this.state.url);

            this.setState({
                response: {
                    headers: Object.keys(response.headers).length,
                    status: response.status,
                    time: duration + "ms"
                }
            })

        }).catch(error => {
            const duration = new Date().getTime() - startTime;
            prettyViewer.jsonViewer(error.data);
            headersViewer.jsonViewer(error.headers);
            rawViewer.text(JSON.stringify(error.data));
            viewer.removeClass("-loading");
            previewViewer.find(".iframe").attr("src",this.state.url);

            this.setState({
                response: {
                    headers: "-",
                    status: error.status,
                    time: duration + "ms"
                }
            })
        });
    }

    onClickViewerTab(e){
        const currentTarget = $(e.currentTarget);
        const viewer = $(".component-viewer");

        currentTarget.addClass("-active").siblings().removeClass("-active");

        if (currentTarget.hasClass("-pretty")){
            viewer.find(".pretty").addClass("-active").siblings().removeClass("-active");
        } else if (currentTarget.hasClass("-raw")){
            viewer.find(".raw").addClass("-active").siblings().removeClass("-active");
        } else if (currentTarget.hasClass("-preview")){
            viewer.find(".preview").addClass("-active").siblings().removeClass("-active");
        } else if (currentTarget.hasClass("-headers")){
            viewer.find(".headers").addClass("-active").siblings().removeClass("-active");
        }
    }

    onClickHeaders(e){
        var value = (this.state.selectedProperty == "headers")? null: "headers";
        this.setState({
            selectedProperty: value
        })
    }

    onClickParams(e){
        var value = (this.state.selectedProperty == "params")? null: "params";
        this.setState({
            selectedProperty: value
        })
    }

    onClickBody(e){
        var value = (this.state.selectedProperty == "body")? null: "body";
        this.setState({
            selectedProperty: value
        })
    }

    onClickSave(e){

        const data = {
            id: this.state.id,
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
            descriptions: this.state.description,
            headers: this.state.headers,
            params: this.state.params,
            body: this.state.body,
        }

        if (this.isSaved()){
            console.log("Saved, doing update...");
            this.props.folderItemEdit(data)
            alert("Request successfully updated!");
        }else{
            this.props.modal({
                type: "newFolderItem",
                data: data
            });
        }
    }

    formSubmit(index,e){
        const editor = $(".component-editors .editor").eq(index);
        editor.find(".input-button.send" ).trigger("click");
        e.preventDefault();
    }

    isSaved(){
        return this.props.folders.some(folder => {
            return folder.items.some(request => {
                return request.id === this.state.id;
            })
        })
    }

    render(){
        const paramsCount = (Object.keys(this.props.data.params).length > 0)? ` [${Object.keys(this.props.data.params).length}]` : "";
        const headersCount = (Object.keys(this.props.data.headers).length > 0)? ` [${Object.keys(this.props.data.headers).length}]` : "";
        const bodyCount = (Object.keys(this.props.data.body).length > 0)? ` [${Object.keys(this.props.data.body).length}]` : "";

        return (
            <li className="editor">
                <div className="top">
                    <div className="bar">
                        <form className="form" onSubmit={this.formSubmit.bind(this,this.props.index)}>
                            <div className="columm action">
                                <div className="select">
                                    <select className="action" onChange={e => this.setState({type: e.target.value})} value={this.state.type}>
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="PATCH">PATCH</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                            </div>

                            <div className="columm url">
                                <input className="input-url" name="url" placeholder={"Enter request URL"} onChange={e => this.setState({url: e.target.value})} value={this.state.url}/>
                            </div>
                            <div className="columm button">
                                <input className="input-button send" onClick={this.onClickSend} type="button" name="send" defaultValue="Send" />
                            </div>
                            <div className="columm button">
                                <input className="input-button save" onClick={this.onClickSave} type="button" name="save" defaultValue={(this.isSaved())? "Save" : "Save As" } />
                            </div>
                        </form>
                    </div>
                    <div className="editor-tabs">
                        <ul className="list">
                            <li className={"item -headers" + ((this.state.selectedProperty == "headers") ? " -active" : "") } onClick={this.onClickHeaders}>
                                <span className="text">Headers</span>
                                <span className="count">{headersCount}</span>
                            </li>
                            <li className={"item -params" + ((this.state.selectedProperty == "params") ? " -active" : "") } onClick={this.onClickParams}>
                                <span className="text">Params</span>
                                <span className="count">{paramsCount}</span>
                            </li>
                            <li className={"item -body" + ((this.state.selectedProperty == "body") ? " -active" : "") } onClick={this.onClickBody}>
                                <span className="text">Body</span>
                                <span className="count">{bodyCount}</span>
                            </li>
                        </ul>
                    </div>
                    <Properties hidden={(this.state.selectedProperty == null)? true : false} title="lalla" data={{
                        request: this.state,
                        child: (this.state.selectedProperty == null)? "headers" : this.state.selectedProperty
                    }}/>
                </div>
                <Viewer />
                <div className="bottom">
                    <div className="metadata">
                        <div className="field headers">
                            <span className="label">headers:</span>
                            <span className="value">{this.state.response.headers}</span>
                        </div>
                        <div className="field status">
                            <span className="label">status:</span>
                            <span className="value">{this.state.response.status}</span>
                        </div>
                        <div className="field time">
                            <span className="label">Time:</span>
                            <span className="value">{this.state.response.time}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

function mapStateToProps({tabs,folders}){
    return {tabs,folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({tabAdd,modal,folderItemEdit},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Editor);

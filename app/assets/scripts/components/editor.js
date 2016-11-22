import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd,modal,folderItemEdit} from './../actions/index';

import Axios from 'axios';
import RequestViewer from './request-viewer';
import RequestBar from "./request-bar";
import RequestProperties from "./request-properties";
import RequestMetadata from "./request-metadata";

class Editor extends Component {

    constructor(props){
        super(props);

        this.checkURL = this.checkURL.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onSave = this.onSave.bind(this);
        this.isSaved = this.isSaved.bind(this);
        this.state = {
            id: props.data.id,
            name: props.data.name,
            type: (props.data.type  == "")? "GET" : props.data.type,
            url: props.data.url,
            descriptions: props.data.description,
            headers: props.data.headers,
            params: props.data.params,
            body: props.data.body,
            data:{},
            responseHeaders: {},
            responseHeadersCount: "-",
            responseTime: "-",
            responseStatus: "-",
            loading: false,
            showViewer: false,
            showProperties: false

        };
    }

    checkURL(e){
        (this.state.url == "")? alert("Enter a request URL!") : e.preventDefault();
    }

    onSend(){
        const startTime = new Date().getTime();
        this.checkURL(event);
        this.setState({
            showViewer: true,
            showProperties: true,
            loading: true
        })

        Axios({
            method: this.state.type,
            url: this.state.url,
            headers: this.state.headers,
            params: this.state.params,
            data: this.state.body

        }).then(response => {

            this.setState({
                data: response.data.result,
                responseHeaders: response.headers,
                responseHeadersCount: Object.keys(response.headers).length,
                responseTime: (new Date().getTime() - startTime) + "ms",
                responseStatus: response.status,
                loading: false
            })

        }).catch(error => {

            this.setState({
                data: error.data,
                responseHeaders: response.headers,
                responseHeadersCount: "-",
                responseTime: (new Date().getTime() - startTime) + "ms",
                responseStatus: error.status,
                loading: false
            })

        });

    }

    onSave(){

        const data = {
            id: this.state.id,
            name: this.state.name,
            type: this.state.type,
            url: this.state.url,
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

    isSaved(){
        return this.props.folders.some(folder => {
            return folder.items.some(request => {
                return request.id === this.state.id;
            })
        })
    }

    render(){
        return (
            <li className="editor">
                <RequestBar
                    url={this.state.url}
                    type={this.state.type}
                    onSend={this.onSend}
                    onSave={this.onSave}
                    isSaved={this.isSaved()}
                />
                <RequestProperties
                    headers={this.state.headers}
                    params={this.state.params}
                    body={this.state.body}
                    show={this.state.showProperties}
                />
                <RequestViewer
                    url={this.state.url}
                    data={this.state.data}
                    headers={this.state.responseHeaders}
                    loading={this.state.loading}
                    show={this.state.showViewer}
                />
                <RequestMetadata
                    headers={this.state.responseHeadersCount}
                    status={this.state.responseStatus}
                    time={this.state.responseTime}
                />
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

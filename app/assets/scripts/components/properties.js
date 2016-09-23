import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderItemEdit} from "./../actions/index";
import File from "../libs/file";


//TODO: change to
class Properties extends Component {

    constructor(props){
        super(props);

        //TODO: change child name to properties
        this.state = {
            request: ("request" in props.data)? props.data.request : {},
            child: ("child" in props.data)? props.data.child : ""
        };

        this.file = new File();
        this.renderFields = this.renderFields.bind(this);
        this.onClickAddField = this.onClickAddField.bind(this);
        this.onChangeKey = this.onChangeKey.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            request: ("request" in nextProps.data)? nextProps.data.request : {},
            child: ("child" in nextProps.data)? nextProps.data.child : ""
        })
    }

    onClickAddField(e){
        var request = this.state.request;
        var child = this.state.child;
        request[child]["untitled"] = ""
        this.setState({
            request: request
        });
    }

    onChangeKey(key,e){
        var request = this.state.request;
        var child = this.state.child;
        request[child][e.target.value] = request[child][key]
        delete request[child][key]
        this.setState({
            request: request
        });
    }

    onChangeKeyValue(key,e){
        var request = this.state.request;
        var child = this.state.child;
        request[child][key] = e.target.value
        this.setState({
            request: request
        });
    }

    onClickRemoveField(key,e){
        var request = this.state.request;
        var child = this.state.child;
        delete request[child][key]
        this.setState({
            request: request
        });
        this.props.folderItemEdit(this.state.request);
    }

    onBlurInput(e){
        this.props.folderItemEdit(this.state.request);
    }

    onFormSubmit(e){
        //TODO: onFormSubmit
        console.log("FORM SUBMIT","FormNewFolder");
    }

    renderFields(key,index){
        return (
            <fieldset className="two-columns" key={index}>
                <input className="key" type="text" value={key} onChange={this.onChangeKey.bind(this,key)} onBlur={this.onBlurInput}/>
                <input className="value" type="text" value={this.state.request[this.state.child][key]} onChange={this.onChangeKeyValue.bind(this,key)} onBlur={this.onBlurInput}/>
                <div className="ion-close-circled icon-remove" style={{float:"left"}} onClick={this.onClickRemoveField.bind(this,key)}></div>
            </fieldset>
        )
    }

    render(){
        var child = this.state.child;
        var data = this.state.request[child];

        return (
            <requesto-properties>
                <form name="formRequestEditor" onSubmit={this.onFormSubmit}>
                    {Object.keys(data).map(this.renderFields)}
                    <div onClick={this.onClickAddField}>Add field</div>
                </form>
            </requesto-properties>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderItemEdit},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Properties);

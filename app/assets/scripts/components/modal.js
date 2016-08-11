import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

import FormNewFolder from "./form-new-folder";
import FormNewFolderItem from "./form-new-folder-item";

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.addKeyboardEvents = this.addKeyboardEvents.bind(this);
        this.addKeyboardEvents();
    }

    componentWillReceiveProps(nextProps) {
        var modal = document.querySelector(".component-modal");
        modal.classList.add("-open");
        // modal.querySelector("input").focus();
    }

    addKeyboardEvents(){
        document.addEventListener("keyup",function(e){
            if (e.keyCode == 27) {
                var modal = document.querySelector(".component-modal");
                modal.classList.remove("-open");
            }
        })
    }

    formSubmit(e){
        var modal = document.querySelector(".component-modal");
        var form = document.forms["newFolderForm"];
        var name = form["name"].value;
        this.props.folderAdd(name);
        modal.classList.remove("-open");
        e.preventDefault();
    }

    render() {
        var type = ("type" in this.props.modal) ? this.props.modal.type : "";

        return (
            <div className="component-modal">
                <div className="panel">
                    {(type == "newFolder") ? <FormNewFolder /> : null}
                    {(type == "newFolderItem") ? <FormNewFolderItem /> : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps({modal}){
    return {modal};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Modal);

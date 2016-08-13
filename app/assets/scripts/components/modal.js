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
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.addKeyboardEvents = this.addKeyboardEvents.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.addKeyboardEvents();
    }

    componentWillReceiveProps(nextProps) {
        const modal = document.querySelector(".component-modal");
        modal.classList.add("-open");
        // modal.querySelector("input").focus();
    }

    addKeyboardEvents(){
        const _this = this;
        document.addEventListener("keyup",function(e){
            if (e.keyCode == 27) {
                _this.onComplete();
            }
        })
    }

    onComplete(){
        const modal = document.querySelector(".component-modal");
        const form = modal.querySelector("form");
        modal.classList.remove("-open");
        form.reset();
    }

    render() {
        var type = ("type" in this.props.modal) ? this.props.modal.type : "";

        return (
            <div className="component-modal">
                <div className="panel">
                    {(type == "newFolder") ? <FormNewFolder onComplete={this.onComplete} /> : null}
                    {(type == "newFolderItem") ? <FormNewFolderItem onComplete={this.onComplete} /> : null}
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

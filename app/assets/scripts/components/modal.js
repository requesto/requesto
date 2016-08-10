import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

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
        console.log(nextProps);
        var modal = document.querySelector(".component-modal");
        modal.classList.add("-open");
        modal.querySelector("input").focus();
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
        return (
            <div className="component-modal">
                <div className="panel">
                    <form name="newFolderForm" onSubmit={this.formSubmit}>
                        <label>Enter the folder name</label>
                        <input type="text" name="name"/>
                    </form>
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

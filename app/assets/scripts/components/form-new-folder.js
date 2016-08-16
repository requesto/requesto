import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

class FormNewFolder extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e){
        console.log("FORM SUBMIT","FormNewFolder");
        const modal = document.querySelector(".component-modal");
        const form = modal.querySelector("form");
        const name = form["name"].value;
        this.props.folderAdd(name);
        this.props.onComplete();
        e.preventDefault();
    }

    render() {
        return (
            <form name="newFolderForm" onSubmit={this.formSubmit}>
                <fieldset>
                    <label>Enter the folder name</label>
                    <input type="text" name="name" autoFocus={true} />
                </fieldset>
            </form>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(FormNewFolder);

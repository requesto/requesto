import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderItemAdd} from "../actions/index";

class FormNewFolderItem extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e){
        const editor = $(".component-editors .editor:visible");
        const modal = document.querySelector(".component-modal");
        const form = modal.querySelector("form");
        const folder = form["folder"].value;
        const name = form["name"].value;
        const description = form["description"].value;
        const type = editor.find("select.action").val();
        const url = editor.find(".input-url").val();
        this.props.folderItemAdd(folder,{
            name:name,
            description: description,
            type:type,
            url:url
        });
        this.props.onComplete();
        e.preventDefault();
    }

    renderFolderOption(data,index){
        return (
            <option value={data.id} key={data.name + "-" + data.id}>{data.name}</option>
        );
    }

    render() {
        return (
            <form name="newFolderItemForm" onSubmit={this.formSubmit}>
                <fieldset>
                    <label>Select folder</label>
                    <div className="select">
                        <select name="folder" className="action">
                            {this.props.folders.map(this.renderFolderOption)}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Enter the item name</label>
                    <input type="text" name="name"/>
                </fieldset>
                <fieldset>
                    <label>Enter the item description</label>
                    <input type="text" name="description" />
                </fieldset>
                <button hidden type="submit">SALVAR</button>
            </form>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderItemAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(FormNewFolderItem);

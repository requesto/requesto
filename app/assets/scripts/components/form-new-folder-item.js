import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAddItem} from "../actions/index";

class FormNewFolderItem extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e){
        const modal = document.querySelector(".component-modal");
        const form = modal.querySelector("form");
        const folder = form["folder"].value;
        const name = form["name"].value;
        const description = form["description"].value;
        this.props.folderAddItem(folder,{
            name:name,
            description: description,
            type:"GET"
        });
        this.props.onComplete();
        e.preventDefault();
    }

    renderFolderOption(data,index){
        console.log(data.name,data.id);
        console.log(index == 0);
        return (
            <option value={data.id} key={data.name}>{data.name}</option>
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
                    <input type="text" name="name" />
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
    return bindActionCreators({folderAddItem},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(FormNewFolderItem);

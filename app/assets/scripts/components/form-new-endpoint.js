import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAddEndpoint} from "../actions/index";

class FormNewEndpoint extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e){
        console.log("FORM SUBMIT","FormNewEndpoint");
        const modal = document.querySelector(".component-modal");
        const form = document.forms["newEndpointForm"];
        const name = form["name"].value;
        const folder = form["folder"].value;
        this.props.folderAddEndpoint(folder,name);
        modal.classList.remove("-open");
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
            <form name="newEndpointForm" onSubmit={this.formSubmit}>
                <fieldset>
                    <label>Select folder</label>
                    <div className="select">
                        <select name="folder" className="action">
                            {this.props.folders.map(this.renderFolderOption)}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Enter the endpoint name</label>
                    <input type="text" name="name" />
                </fieldset>
                <fieldset>
                    <label>Enter the endpoint description</label>
                    <input type="text" name="description" />
                </fieldset>
                <button hidden>Salvar</button>
            </form>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAddEndpoint},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(FormNewEndpoint);

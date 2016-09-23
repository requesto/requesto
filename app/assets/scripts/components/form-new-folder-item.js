import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderItemAdd} from "../actions/index";


//TODO: Change name to FormNewRequest
class FormNewFolderItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            request: props.data,
            folder: ""
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFolder = this.onChangeFolder.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillMount(){
        var request = this.state.request;
        request.name = "";
        this.setState({
            request: request,
            folder: this.props.folders[0].id
        })
    }

    componentDidMount(){
        this.refs.nameInput.focus();
    }

    onChangeName(e){
        var request = this.state.request;
        request.name = e.target.value;
        this.setState({
            request:request
        })
    }

    onChangeDescription(e){
        var request = this.state.request;
        request.description = e.target.value;
        this.setState({
            request:request
        })
    }

    onChangeFolder(e){
        this.setState({
            folder:e.target.value
        })
    }

    formSubmit(e){
        console.log("folder",this.state.folder);
        console.log("state",this.state.request);
        this.props.folderItemAdd(this.state.folder,this.state.request);
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
                        <select className="action" onChange={this.onChangeFolder} value={this.state.request.type}>
                            {this.props.folders.map(this.renderFolderOption)}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Enter the item name</label>
                    <input type="text" name="name" onChange={this.onChangeName} value={this.state.request.name} ref="nameInput"/>
                </fieldset>
                <fieldset>
                    <label>Enter the item description</label>
                    <input type="text" name="description" onChange={this.onChangeDescription} value={this.state.request.description}/>
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

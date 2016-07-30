import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.folderClickHandler = this.folderClickHandler.bind(this);
        this.renderFolders = this.renderFolders.bind(this);
    }

    folderClickHandler(e){
        const folder = $(e.currentTarget);
        const folderList = folder.next(".folder-itens");
        folder.toggleClass("-active");
        if (folderList.is("ul")){
            folderList.toggleClass("-open");
        }

        this.props.folderAdd("Folder" + Math.floor((Math.random() * 100) + 1));
    }

    renderFolders(data,index){
        return(
            <li className="folder" onClick={this.folderClickHandler.bind(this,index)} key={"tab-" + data.name + "-" + index }>
                <div className="icon type"></div>
                <div className="name">{data.name}</div>
                <div className="description">0 endpoints</div>
            </li>
        );
    }

    render() {
        return (
            <div className="component-sidebar">
                <div className="brand">
                    Requesto
                    <div className="name"></div>
                    <div className="icon"></div>
                </div>
                <ul className="folder-list">
                    {this.props.folders.map(this.renderFolders)}
                </ul>
            </div>
        );
    }
}


/*

<ul className="folder-itens">
    <li className="item">
        <div className="icon type"></div>
        <div className="name">User/token</div>
        <div className="description">2 endpoints</div>
    </li>
</ul>

*/

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Sidebar);

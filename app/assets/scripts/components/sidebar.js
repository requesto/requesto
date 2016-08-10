import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd,tabAdd,modal} from "../actions/index";

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.folderAddClickHandler = this.folderAddClickHandler.bind(this);
        this.folderClickHandler = this.folderClickHandler.bind(this);
        this.renderFolders = this.renderFolders.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.itemClickHandler = this.itemClickHandler.bind(this);
    }

    folderAddClickHandler(e){
        this.props.modal("newFolder");
        //this.props.folderAdd("Folder " + Math.floor((Math.random() * 100) + 1));
    }

    folderClickHandler(e){
        const folder = $(e.currentTarget);
        const folderList = folder.next(".items");
        folder.toggleClass("-active");
        if (folderList.is("ul")){
            folderList.toggleClass("-open");
        }
    }

    itemClickHandler(e){
        const item = $(e.currentTarget);
        const name = item.find(".name").text();
        console.log(name);
        this.props.tabAdd(name);
    }

    renderItems(data,index){
        return(
            <li className="item" key={"item-" + data.name + "-" + index } onClick={this.itemClickHandler}>
                <div className="icon type"></div>
                <div className="name">{data.name}</div>
                <div className="description">{data.description}</div>
                <div className={"type " + " -" + data.type.toLowerCase() }>{data.type}</div>
            </li>
        )
    }

    renderFolders(data,index){

        var items = ('items' in data)? data.items : [];

        return(
            <li className="folder" key={"folder-" + data.name + "-" + index }>
                <div className="cover" onClick={this.folderClickHandler}>
                    <div className="icon type"></div>
                    <div className="name">{data.name}</div>
                    <div className="description">{items.length + " Itens"}</div>
                </div>
                <ul className="items">
                    {items.map(this.renderItems)}
                </ul>
            </li>
        );
    }

    render() {
        return (
            <div className="component-sidebar">
                <div className="top">
                    <div className="brand">
                        Requesto
                        <div className="name"></div>
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="main">
                    <ul className="folder-list">
                        {this.props.folders.map(this.renderFolders)}
                    </ul>
                </div>
                <div className="bottom">
                    <a className="folder-add" onClick={this.folderAddClickHandler} data-title="New folder">
                        <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20">
                            <path d="M19,20H1c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1v11C20,19.6,19.6,20,19,20z M2,18h16V9H2V18z"/>
                            <path d="M19,2h-8.1l-1-1.6C9.6,0.2,9.3,0,9,0H1C0.4,0,0,0.4,0,1v3c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V3C20,2.4,19.6,2,19,2z"/>
                        </svg>
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd,tabAdd,modal},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Sidebar);

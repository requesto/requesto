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
                        <svg className="icon  icon--plus" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
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

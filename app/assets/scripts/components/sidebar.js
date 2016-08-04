import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd,tabAdd} from "../actions/index";

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
        this.props.folderAdd("Folder " + Math.floor((Math.random() * 100) + 1));
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
                    <div className="description">{items.length + "itens"}</div>
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
                    <div className="folder-add ion-plus-round" onClick={this.folderAddClickHandler}>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd,tabAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Sidebar);

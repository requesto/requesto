import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd} from "../actions/index";

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.folderAddClickHandler = this.folderAddClickHandler.bind(this);
        this.folderClickHandler = this.folderClickHandler.bind(this);
        this.renderFolders = this.renderFolders.bind(this);
        this.renderItems = this.renderItems.bind(this);
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

    renderItems(data,index){
        return(
            <li className="item" key={"item-" + data.name + "-" + index }>
                <div className="icon type"></div>
                <div className="name">{data.name}</div>
                <div className="description">{data.description}</div>
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

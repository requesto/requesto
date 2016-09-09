import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {folderAdd,folderDelete,folderItemDelete,tabAdd,modal} from "../actions/index";
import File from "../libs/file";

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.openFolders = false;
        this.openDescriptions = false;
        this.file = new File();
        this.folderAddClick = this.folderAddClick.bind(this);
        this.folderClick = this.folderClick.bind(this);
        this.folderClickDelete = this.folderClickDelete.bind(this);
        this.toggleFolders = this.toggleFolders.bind(this);
        this.toggleRequetsDescriptions = this.toggleRequetsDescriptions.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.itemClickDelete = this.itemClickDelete.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.renderFolders = this.renderFolders.bind(this);
    }

    folderAddClick(e){
        this.props.modal("newFolder");
    }

    folderClick(e){
        const folder = $(e.currentTarget);
        const folderList = folder.next(".items");
        folder.toggleClass("-active");
        if (folderList.is("ul")){
            folderList.toggleClass("-open");
        }
    }

    folderClickDelete(e){
        const folder = $(e.currentTarget).closest(".folder").attr("data-id");
        console.log("DELETE INDEX: " + folder);
        if (confirm("Are you sure?")) this.props.folderDelete(folder);
        e.stopPropagation();
        e.preventDefault();
    }

    toggleRequetsDescriptions(e){
        this.openDescriptions = !this.openDescriptions
        this.forceUpdate();
    }

    toggleFolders(e){
        this.openFolders = !this.openFolders;
        this.forceUpdate();
    }

    toggleSearchClick(e){
        $(".component-sidebar .search").slideToggle(0);
    }

    onBlurSearch(e){
        $(".component-sidebar .search").slideToggle(0);
    }

    itemClick(index,data,e){
        this.props.tabAdd(data);
    }

    itemClickDelete(e){
        const item = $(e.currentTarget).closest(".item");
        const itemIndex = item.attr("data-id");
        const folder = item.closest(".folder");
        const folderIndex = folder.attr("data-id");
        if (confirm("Are you sure?")) this.props.folderItemDelete(folderIndex,itemIndex);
        e.stopPropagation();
        e.preventDefault();
    }

    itemClickEdit(e){
        alert("Item will be edited");
        e.stopPropagation();
        e.preventDefault();
    }

    renderItems(data,index){

        var description = (data.description.trim() != "") ? data.description : "Request description"

        return(
            <li className="item" data-id={index} key={"item-" + data.name + "-" + index } onClick={this.itemClick.bind(this,index,data)}>
                <div className="name">{data.name}</div>
            <div className="description">{description}</div>
                <div className={"type " + " -" + data.type.toLowerCase()}>{data.type}</div>
                <div className="actions">
                    <div className="edit" onClick={this.itemClickEdit}>
                        <svg x="0px" y="0px" viewBox="0 0 469.331 469.331" width="100%" height="100%">
                            <path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4   c-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6   l-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3   S458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1   l245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4   s22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>
                        </svg>
                    </div>
                    <div className="delete" onClick={this.itemClickDelete}>
                        <svg x="0px" y="0px" viewBox="0 0 774.266 774.266" width="100%" height="100%">
                            <g>
                                <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>
                                <rect x="475.031" y="286.593" width="48.418" height="396.942" />
                                <rect x="363.361" y="286.593" width="48.418" height="396.942" />
                                <rect x="251.69" y="286.593" width="48.418" height="396.942" />
                            </g>
                        </svg>
                    </div>
                </div>
            </li>
        )
    }

    renderFolders(data,index){

        var items = ('items' in data)? data.items : [];
        var coverClass = "cover " + ((this.openFolders)? "-active" : "");
        var itemsClass = "items " + ((this.openFolders)? "-open" : "");

        return(
            <li className="folder" data-id={index} key={"folder-" + data.name + "-" + index }>
                <div className={coverClass} onClick={this.folderClick} >
                    <div className="icon type"></div>
                    <div className="name">{data.name}</div>
                    <div className="description">{items.length + " requests"}</div>
                    <div className="actions">
                        <div className="edit">
                            <svg x="0px" y="0px" viewBox="0 0 469.331 469.331" width="100%" height="100%">
                                <path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4   c-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6   l-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3   S458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1   l245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4   s22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z"/>
                            </svg>
                        </div>
                        <div className="delete" onClick={this.folderClickDelete}>
                            <svg x="0px" y="0px" viewBox="0 0 774.266 774.266" width="100%" height="100%">
                                <g>
                                    <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>
                                    <rect x="475.031" y="286.593" width="48.418" height="396.942" />
                                    <rect x="363.361" y="286.593" width="48.418" height="396.942" />
                                    <rect x="251.69" y="286.593" width="48.418" height="396.942" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <ul className={itemsClass}>
                    {items.map(this.renderItems)}
                </ul>
            </li>
        );
    }

    render() {

        var folderListClass = "folder-list " + ((this.openDescriptions) ? "-show-descriptions" : "");
        var toggleDescriptionsTitle = (this.openDescriptions)? "Hide descriptions" : "Show descriptions";
        var toggleFoldersTitle = (this.openFolders)? "Close folders" : "Open folders";

        return (
            <div className="component-sidebar">
                <div className="top">
                    <div className="brand">
                        <div className="name">Requesto <small>beta</small></div>
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="main">
                    <ul className={folderListClass}>
                        {this.props.folders.map(this.renderFolders)}
                    </ul>
                </div>
                <div className="bottom">
                    <div className="search">
                        <div className="input">
                            <input id="search" type="text" name="name" placeholder="Search" onBlur={this.onBlurSearch}/>
                        </div>
                    </div>
                    <div className="options">
                        <ul className="list left">
                            {/* <li className="item" onClick={this.toggleSearchClick}>
                                <span className="icon ion-search"></span>
                            </li> */}
                        </ul>
                        <ul className="list middle">
                            <li className="item" data-title={toggleFoldersTitle} onClick={this.toggleFolders}>
                                <span className="icon ion-ios-folder"></span>
                            </li>
                            <li className="item" data-title={toggleDescriptionsTitle} onClick={this.toggleRequetsDescriptions}>
                                <span className="icon ion-information-circled"></span>
                            </li>
                            <li className="item" data-title="Export json" onClick={this.file.exportSetup}>
                                <span className="icon ion-android-document"></span>
                            </li>
                            {/* <li className="item" data-title="History">
                                <span className="icon ion-android-time"></span>
                            </li> */}
                            {/* <li className="item" data-title="Settings">
                                <span className="icon ion-wrench"></span>
                            </li> */}
                        </ul>
                        <ul className="list right">
                            <li className="item" data-title="New folder" onClick={this.folderAddClick}>
                                <span className="icon ion-plus"></span>
                            </li>
                        </ul>
                    </div>
                    {/* <a className="folder-add" onClick={this.folderAddClick} data-title="New folder">
                        <svg className="icon  icon--plus" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
                        </svg>
                    </a> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({folderAdd,folderDelete,folderItemDelete,tabAdd,modal},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Sidebar);

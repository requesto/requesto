
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.folderClickHandler = this.folderClickHandler.bind(this);
    }

    folderClickHandler(e){
        const folder = $(e.currentTarget);
        const folderList = folder.next(".folder-itens");
        folder.toggleClass("-active");
        if (folderList.is("ul")){
            folderList.toggleClass("-open");
        }
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
                    <li className="folder" onClick={this.folderClickHandler}>
                        <div className="icon type"></div>
                        <div className="name">Gapp</div>
                        <div className="description">2 endpoints</div>
                    </li>
                    <ul className="folder-itens">
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">User/token</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                    </ul>
                    <li className="folder" onClick={this.folderClickHandler}>
                        <div className="icon type"></div>
                        <div className="name">Test</div>
                        <div className="description">2 endpoints</div>
                    </li>
                    <ul className="folder-itens">
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">User/token</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                    </ul>
                    <li className="folder" onClick={this.folderClickHandler}>
                        <div className="icon type"></div>
                        <div className="name">Test</div>
                        <div className="description">2 endpoints</div>
                    </li>
                    <ul className="folder-itens">
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">User/token</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test 1</div>
                            <div className="description">2 endpoints</div>
                        </li>
                    </ul>
                </ul>
            </div>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Sidebar);

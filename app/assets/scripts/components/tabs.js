import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {viewerAdd} from '../actions/index.js';

class Tabs extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickTab = this.onClickTab.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("Tabs: ",nextProps );
    }

    onClickAdd(){
        this.props.viewerAdd();
    }

    onClickTab(index,e){
        console.log("TAB click: ",index, e.target);
        $(e.target).addClass('-active');
        $(e.target).siblings().removeClass('-active');
        console.log("HAHAHAH");
    }

    renderTabs(data,index){
        return(
            <li className="tab" onClick={this.onClickTab.bind(this,index)} key={"tab-" + data.name}>{data.name}</li>
        );
    }

    render() {
        return (
            <div className="component-tabs">
                <ul className="tabs">
                    {this.props.viewers.map(this.renderTabs)}
                    <li className="tab -plus" onClick={this.onClickAdd}> + </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps({viewers}){
    return {viewers};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({viewerAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Tabs);

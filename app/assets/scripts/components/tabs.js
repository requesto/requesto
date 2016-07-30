import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd} from '../actions/index';

class Tabs extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickTab = this.onClickTab.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // console.log("Tabs: ",nextProps );
    }

    onClickAdd(){
        this.props.tabAdd();
    }

    onClickTab(index,e){
        var indexSelected = $(e.target).index();
        console.log(indexSelected);
        $(e.target).addClass("-active").siblings().removeClass("-active");
        $(".component-editors .editor").removeClass("-show").eq(indexSelected).addClass("-show");
    }

    renderTabs(data,index){
        return(
            <li className="tab" onClick={this.onClickTab.bind(this,index)} key={"tab-" + data.name + "-" + index }>{data.name}</li>
        );
    }

    render() {
        return (
            <div className="component-tabs">
                <ul className="tabs">
                    {this.props.tabs.map(this.renderTabs)}
                    <li className="tab -plus" onClick={this.onClickAdd}> + </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps({tabs}){
    return {tabs};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({tabAdd},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Tabs);

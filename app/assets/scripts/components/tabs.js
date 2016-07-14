import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {viewerAdd} from '../actions/index.js';

class Tabs extends Component {

    constructor(props){
        super(props);
        this.state = {};


        console.log(props);
    }

    onClickAdd(){
        $( "<li class='tab'>Nova aba</li>" ).insertBefore( ".component-tabs .tabs .tab.-plus" );
    }

    render() {
        return (
            <div className="component-tabs">
                <ul className="tabs">
                    <li className="tab active" >user/token</li>
                    <li className="tab">Aba 4</li>
                    <li className="tab">Aba 3</li>
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

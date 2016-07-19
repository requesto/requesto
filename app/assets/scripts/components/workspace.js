import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Tabs from "./tabs";
import Editors from "./editors";

class Workspace extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        console.log("Workspace: ",nextProps );
    }

    render() {
        return (
            <div className="component-workspace">
                <Tabs/>
                <Editors />
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

export default connect (mapStateToProps,mapDispatchToProps)(Workspace);

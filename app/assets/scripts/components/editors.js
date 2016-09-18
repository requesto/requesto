import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {tabAdd,modal} from "./../actions/index";

import Editor from "./editor";

class Editors extends Component {

    constructor(props){
        super(props);
        this.state = {};

        this.renderEditor = this.renderEditor.bind(this);
    }


    renderEditor(data,index){
        return (
            <Editor data={data} index={index} key={"editor-" + data.name + "-" + index}/>
        )
    }

    render() {
        return (
            <div className="component-editors">
                <ul className="list">
                    {this.props.tabs.map(this.renderEditor)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({tabs}){
    return {tabs};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({tabAdd,modal},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Editors);


import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-sidebar">
                <ul className="folder-list">
                    <li className="item">
                        <div className="icon type"></div>
                        <div className="name">Test 1</div>
                        <div className="description">2 endpoints</div>
                    </li>
                    <li className="item active">
                        <div className="icon type"></div>
                        <div className="name">Test</div>
                        <div className="description">2 endpoints</div>
                    </li>
                    <li className="item">
                        <div className="icon type"></div>
                        <div className="name">Test</div>
                        <div className="description">2 endpoints</div>
                    </li>
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

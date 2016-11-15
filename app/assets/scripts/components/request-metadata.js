import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class RequestMetadata extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="request-metadata">
                <div className="field headers">
                    <span className="label">headers:</span>
                    <span className="value">{this.props.headers || "-"}</span>
                </div>
                <div className="field status">
                    <span className="label">status:</span>
                    <span className="value">{this.props.status || "-"}</span>
                </div>
                <div className="field time">
                    <span className="label">Time:</span>
                    <span className="value">{this.props.time || "-"}</span>
                </div>
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

export default connect (mapStateToProps,mapDispatchToProps)(RequestMetadata);

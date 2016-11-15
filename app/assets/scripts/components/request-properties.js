import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Properties from "./properties";

class RequestProperties extends Component {

    constructor(props){
        super(props);

        this.onClickHeaders = this.onClickHeaders.bind(this);
        this.onClickParams = this.onClickParams.bind(this);
        this.onClickBody = this.onClickBody.bind(this);
        this.state = {
            selectedProperty: null,
        };
    }


    onClickHeaders(e){
        var value = (this.state.selectedProperty == "headers")? null: "headers";
        this.setState({
            selectedProperty: value
        })
    }

    onClickParams(e){
        var value = (this.state.selectedProperty == "params")? null: "params";
        this.setState({
            selectedProperty: value
        })
    }

    onClickBody(e){
        var value = (this.state.selectedProperty == "body")? null: "body";
        this.setState({
            selectedProperty: value
        })
    }

    render() {

        const paramsCount = (Object.keys(this.props.params).length > 0)? ` (${Object.keys(this.props.params).length})` : "";
        const headersCount = (Object.keys(this.props.headers).length > 0)? ` (${Object.keys(this.props.headers).length})` : "";
        const bodyCount = (Object.keys(this.props.body).length > 0)? ` (${Object.keys(this.props.body).length})` : "";
        const showProperties = (!this.state.selectedProperty && this.props.show) ? "" : "-show" ;

        console.log(this.state.selectedProperty,this.props.show,showProperties);

        return (
            <div className={`request-properties ${showProperties}`}>
                <ul className="list">
                    <li className={"item -headers" + ((this.state.selectedProperty == "headers") ? " -active" : "") } onClick={this.onClickHeaders}>
                        <span className="text">Headers</span>
                        <span className="count">{headersCount}</span>
                    </li>
                    <li className={"item -params" + ((this.state.selectedProperty == "params") ? " -active" : "") } onClick={this.onClickParams}>
                        <span className="text">Params</span>
                        <span className="count">{paramsCount}</span>
                    </li>
                    <li className={"item -body" + ((this.state.selectedProperty == "body") ? " -active" : "") } onClick={this.onClickBody}>
                        <span className="text">Body</span>
                        <span className="count">{bodyCount}</span>
                    </li>
                </ul>
                <Properties
                    hidden={(this.state.selectedProperty == null)? true : false}
                    title="lalla"
                    headers={this.props.headers}
                    params={this.props.params}
                    body={this.props.body}
                    child={(this.state.selectedProperty == null)? "headers" : this.state.selectedProperty}
                />
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

export default connect (mapStateToProps,mapDispatchToProps)(RequestProperties);

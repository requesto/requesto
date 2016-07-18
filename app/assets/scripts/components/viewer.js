import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Viewer extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.renderViewers = this.renderViewers.bind(this);
    }

    renderViewers(data,index){
        return (
            <li className="item" key={"viewer-" + data.name}>
                <h1>{data.name}</h1>
                <pre id="json-renderer"></pre>
            </li>
        )
    }

    render() {
        return (
            <div className="component-viewer">
                <ul clssName="list">
                    {this.props.tabs.map(this.renderViewers)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({tabs}){
    return {tabs};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Viewer);

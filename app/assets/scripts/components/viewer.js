import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Viewer extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-viewer">
                <ul clssName="list">
                    <li className="item">
                        <pre id="json-renderer"></pre>
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

export default connect (mapStateToProps,mapDispatchToProps)(Viewer);

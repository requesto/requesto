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
                <pre className="viewer pretty -active"></pre>
                <pre className="viewer raw"></pre>
                <div className="viewer preview">
                    <iframe className="iframe" src=""/>
                </div>
                <img className="preload" src="assets/images/preload.svg"/>
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

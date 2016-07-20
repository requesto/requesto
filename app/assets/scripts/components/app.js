import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-app">
                {this.props.children}
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

export default connect (mapStateToProps,mapDispatchToProps)(App);

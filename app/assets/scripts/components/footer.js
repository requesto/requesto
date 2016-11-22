import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-footer">
                We are using node 2
                <script>
                    document.write(process.versions.node)
                </script>, Chromium
                <script>
                    document.write(process.versions.chrome)
                </script>, and Electron
                <script>
                    document.write(process.versions.electron)
                </script>
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

export default connect (mapStateToProps,mapDispatchToProps)(Footer);

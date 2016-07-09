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
                <div className="component-sidebar">
                    <ul className="folder-list">
                        <li className="item">
                            <div className="icon type"></div>
                            <div className="name">Test</div>
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
                <div className="component-content">
                    <div className="component-tabs">
                        <ul className="tabs">
                            <li className="tab active">user/token</li>
                            <li className="tab">Aba 2</li>
                            <li className="tab">Aba 3</li>
                        </ul>
                    </div>
                    <div className="bar">
                        <div className="columm action">
                            <input className="input-action" type="text" name="action" placeholder="GET" value="get" />
                        </div>
                        <div className="columm url">
                            <input className="input-url" name="url" placeholder="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" value="http://beta.json-generator.com/api/json/get/4JVFHRAHZ" />
                        </div>
                        <div className="columm button">
                            <input className="input-button" type="button" name="send" value="Send" />
                        </div>
                    </div>
                    <div className="result">
                        <pre id="json-renderer"></pre>
                    </div>
                    <div className="component-footer">
                        We are using node
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

export default connect (mapStateToProps,mapDispatchToProps)(App);

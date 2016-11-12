import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


import SplitPane from "react-split-pane";
import Sidebar from "./sidebar";
import Workspace from "./workspace";
import Footer from "./footer";
import Modal from "./modal";


class Index extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="component-index">
                <div className="main">
                    <SplitPane
                        split="vertical"
                        primary="second"
                        minSize={200}
                        maxSize={500}
                        defaultSize={ parseInt(localStorage.getItem('splitPos')) }
                        onChange={ size => localStorage.setItem('splitPos', size) }>

                        <Sidebar />
                        <Workspace />

                    </SplitPane>
                </div>
                <Footer />
                <Modal />
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

export default connect (mapStateToProps,mapDispatchToProps)(Index);

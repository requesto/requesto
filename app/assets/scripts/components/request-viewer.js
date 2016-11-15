import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import JSONTree from "react-json-tree";

class RequestViewer extends Component {

    constructor(props){
        super(props);

        this.onClickTab = this.onClickTab.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.state = {
            tabs : ["Pretty","Raw","Preview","Headers"],
            selectedTab: 0
        };

        //success
        // headersViewer.jsonViewer(response.headers);

        //error
        // prettyViewer.jsonViewer(error.data);
        // headersViewer.jsonViewer(error.headers);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data
        })
    }

    onClickTab(index,e){
        this.setState({
            selectedTab: index
        })
    }

    isSelected(name){
        const nameIndex = this.state.tabs.indexOf(name);
        const selectedTab = this.state.selectedTab;
        return ( nameIndex  === selectedTab  ? " " + "-active" : "" );
    }

    renderTabs(tab,index){
        const selectedClass = (this.state.selectedTab === index) ? "-active" : "";

        return(
            <li key={index} className={`item ${selectedClass}`} onClick={this.onClickTab.bind(this,index)}>
                {tab}
            </li>
        );
    }

    render() {
        const showClass = (this.props.show) ? "-show" : "";
        const loadingClass = (this.props.loading) ? "-loading" : "";

        $(document).ready(() => {
            $(this.viewer).find(".pretty").jsonViewer(this.props.data);
            $(this.viewer).find(".headers").jsonViewer(this.props.headers);
        })
    
        return (
            <div className={`component-viewer ${loadingClass} ${showClass}`} ref={(el) => this.viewer = el}>
                <requesto-editor-tabs>
                    <ul className="list">
                        {this.state.tabs.map(this.renderTabs)}
                    </ul>
                </requesto-editor-tabs>
                <div className="viewers">
                    <div className={"viewer pretty" + this.isSelected("Pretty")}></div>
                    <textarea className={"viewer raw" + this.isSelected("Raw")} readOnly value={JSON.stringify(this.props.data)}></textarea>
                    <div className={"viewer preview" + this.isSelected("Preview")}>
                        <iframe className="iframe" src={this.props.url}/>
                    </div>
                    <div className={"viewer headers" + this.isSelected("Headers")}></div>
                    <img className="preload" src="assets/images/preload.svg"/>
                </div>
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

export default connect (mapStateToProps,mapDispatchToProps)(RequestViewer);

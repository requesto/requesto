import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Viewer extends Component {

    constructor(props){
        super(props);

        console.log("Viewer");
        console.log(props);
        console.log(this.props.data);

        this.state = {
            activeViewer: "pretty",
            activeClass: "-active",
            data: props.data
        };

        this.onClickTab = this.onClickTab.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data
        })
    }

    onClickTab(e){
        this.setState({
            activeViewer: e.target.getAttribute("data-name")
        })
    }

    isSelected(name){
        return ((this.state.activeViewer === name)? " " + this.state.activeClass : "")
    }

    render() {
        console.log("editor tabs selected: ",this.state.activeViewer);
        return (
            <div className="component-viewer">
                <requesto-editor-tabs>
                    <ul className="list">
                        <li className={"item" + this.isSelected("pretty")} data-name="pretty" onClick={this.onClickTab}>Pretty</li>
                        <li className={"item" + this.isSelected("raw")} data-name="raw" onClick={this.onClickTab}>Raw</li>
                        <li className={"item" + this.isSelected("preview")} data-name="preview" onClick={this.onClickTab}>Preview</li>
                        <li className={"item" + this.isSelected("headers")} data-name="headers" onClick={this.onClickTab}>Headers</li>
                    </ul>
                </requesto-editor-tabs>
                <div className="viewers">
                    <pre className={"viewer pretty" + this.isSelected("pretty")}></pre>
                    <textarea className={"viewer raw" + this.isSelected("raw")} readOnly value={this.state.data}></textarea>
                    <div className={"viewer preview" + this.isSelected("preview")}>
                        <iframe className="iframe" src=""/>
                    </div>
                    <pre className={"viewer headers" + this.isSelected("headers")}></pre>
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

export default connect (mapStateToProps,mapDispatchToProps)(Viewer);

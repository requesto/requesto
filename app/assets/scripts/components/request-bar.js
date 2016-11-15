import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class RequestBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            url: props.url
        };

        console.log("RequestBar: ",props.isSaved);
    }

    formSubmit(index,e){
        this.props.onSend();
        e.preventDefault();
    }

    render() {
        return (
            <div className="request-bar">
                <form className="form" onSubmit={this.formSubmit.bind(this,this.props.index)}>
                    <div className="columm action">
                        <div className="select">
                            <select className="action" onChange={e => this.setState({type: e.target.value})} value={this.state.type}>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="PATCH">PATCH</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>
                    </div>

                    <div className="columm url">
                        <input
                            className="input-url"
                            name="url" placeholder={"Enter request URL"}
                            onChange={e => this.setState({url: e.target.value})}
                            value={this.state.url}
                        />
                    </div>
                    <div className="columm button">
                        <input
                            className="input-button send"
                            onClick={this.props.onSend}
                            type="button" name="send"
                            defaultValue="Send"
                        />
                    </div>
                    <div className="columm button">
                        <input
                            className="input-button save"
                            onClick={this.props.onSave}
                            type="button"
                            name="save"
                            defaultValue={(this.props.isSaved) ? "Save" : "Save as" }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({folders}){
    return {folders};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(RequestBar);

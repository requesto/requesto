import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class FormRequestEditor extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }

    renderFields(data,index){
        console.log("modal",index,data);
    }

    onFormSubmit(e){
        console.log("FORM SUBMIT","FormNewFolder");
    }

    render() {
        return (
            <form name="formRequestEditor" onSubmit={this.onFormSubmit}>
                <fieldset>
                    <label>Headers</label>
                    {this.state.data.map(this.renderFields)}
                </fieldset>
            </form>
        );
    }
}

function mapStateToProps({}){
    return {};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(FormRequestEditor);

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class FormRequestEditor extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: ("data" in props)? props.data: []
        };

        this.renderFields = this.renderFields.bind(this);
        this.onClickAddField = this.onClickAddField.bind(this);
        this.onChangeKey = this.onChangeKey.bind(this);
    }


    onClickAddField(e){
        var data = this.state.data;
        data["untitled"] = ""
        this.setState({data});
    }

    onChangeKey(key,e){
        var data = this.state.data;
        data[e.target.value] = this.state.data[key]
        delete data[key]
        this.setState({data});
    }

    onChangeKeyValue(key,e){
        console.log(data,e.target.value);
    }

    onClickRemoveField(key,e){
        var data = this.state.data;
        delete data[key]
        this.setState({data});
    }

    onFormSubmit(e){
        console.log("FORM SUBMIT","FormNewFolder");
    }

    renderFields(key,index){
        console.log("modal",index,key,this.state.data[key]);
        return (
            <fieldset className="two-columns" key={index}>
                <input className="key" type="text" value={key} onChange={this.onChangeKey.bind(this,key)}/>
                <input className="value" type="text" value={this.state.data[key]} onChange={this.onChangeKeyValue.bind(this,key)}/>
                <div className="ion-close-circled icon-remove" style={{float:"left"}} onClick={this.onClickRemoveField.bind(this,key)}></div>
            </fieldset>
        )
    }

    render() {
        return (
            <form name="formRequestEditor" onSubmit={this.onFormSubmit}>
                <label>Headers</label>
                {Object.keys(this.state.data).map(this.renderFields)}
                <br/>
                <div onClick={this.onClickAddField}>Add header</div>
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

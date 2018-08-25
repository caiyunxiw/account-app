import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Record extends Component {
    constructor(){
        super();
        this.state = {
            edit:false
        }
    }
    handleToggle(){
        this.setState({edit:!this.state.edit});
    }
    handleEdit(event){
        event.preventDefault();
        const reData = {id:this.props.record.id,data:this.refs.data.value,title:this.refs.title.value,amount:Number.parseInt(this.refs.amount.value,0)};
        console.log(reData)
        axios.put(`records/${this.props.record.id}`,reData).then(
            response => {
                this.setState({edit:false});
                this.props.handleEditRecord(this.props.record,response.data)
            }
        ).catch(
            error => console.log(error.message)
        )
    }
    handleDelete(event){
        event.preventDefault();
        axios.delete(`records/${this.props.record.id}`).then(
            response => {
                this.props.handleDeleteRecord(this.props.record)
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    recordRow(){
        return (
            <tr>
                <td>{this.props.record.data}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className="btn btn-danger mr-1"onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );

    }

    recordForm(){
        return (
            <tr>
                <td><input type="text" className={"form-control"} defaultValue={this.props.record.data} ref="data"/></td>
                <td><input type="text" className={"form-control"} defaultValue={this.props.record.title} ref="title"/></td>
                <td><input type="text" className={"form-control"} defaultValue={this.props.record.amount}ref="amount"/></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        );

    }

    render() {
        if(this.state.edit){
            return this.recordForm();
        }else{
            return this.recordRow();
        }

    }
}


Record.prototypes = {
    id:PropTypes.string,
    data:PropTypes.date,
    title:PropTypes.string,
    amount:PropTypes.number
}
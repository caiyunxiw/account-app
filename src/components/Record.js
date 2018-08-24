import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Record extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.data}</td>
                <td>{this.props.title}</td>
                <td>{this.props.amount}</td>
            </tr>
        );
    }
}


Record.prototypes = {
    id:PropTypes.number,
    data:PropTypes.date,
    title:PropTypes.string,
    amount:PropTypes.number
}
import React, {Component} from 'react';
import Record from './Record'
/*import $ from 'jquery';*//*导入全部*/
/*import {getJSON} from 'jquery';/!*按需导入*!/*/
import axios from 'axios';

/*导入组件*/

class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false, /*判断加载状态，加载中为false，其他为true*/
            records: []
        }
    }

    /*组件加载之后，发送个请求，去得到一些数据*/
    componentDidMount() {
        axios.get("https://5b7fbb11af5e5600144d5f38.mockapi.io/api/v1/records").then(
            response => this.setState({
                records: response.data,
                isLoaded: true
            })
        ).catch(
            error => this.setState({
                error: error,
                isLoaded: true
            })
        )
/*jqury发送请求，获取数据
        getJSON("https://5b7fbb11af5e5600144d5f38.mockapi.io/api/v1/records").then(
            response => this.setState({
                records: response,
                isLoaded: true
            }),
            error => this.setState({
                error: true,
                isLoaded: true
            })
        );
*/
    }

    render() {
        const {error, isLoaded,records} = this.state;
        if (error) {
            return <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h2>Records</h2>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map((record, i) => <Record key={i} {...record}/>)}
                        </tbody>
                    </table>
                </div>
            );

        }
    }
}

/*spread operator ... 是拓展运算符，把一个hash或对象或数组拓展开来
 * 例题： record={"id":1,"data":"2018-01-09","title":"收入","amount":20}
 *       那么{...record}表示{id:record.id}{data:record.data}{title:record.title}{amount:record.amount}
 */

export default Records;




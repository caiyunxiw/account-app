import React, {Component} from 'react';
import Record from './Record'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'
/*import $ from 'jquery';*/
/*导入全部*/
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
        axios.get(`records`).then(
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
    addRecord(record){
        const a = [{"a":"a"},{"b":"b"}];
        const b = {"c":"c"};
        const c = [...a,b];/*c为[{"a":"a"},{"b":"b"},{"c":"c"}]*/
        console.log(c);
        this.setState({
            error: null,
            isLoaded: false,
            records: [
                ...this.state.records,
                record
            ]

        })
    }
    /**/
    updateRecord(record,reData){
        const a = {"a":"b"};
        const b = {"a":"c"};
        const c = {...a,...b};/*这种做法之后，c的值就是{"a":"c"}替换了刚刚的旧值*/
        const recordIndex = this.state.records.indexOf(record);/*获取这个record的下标*/
        const newRecords =  this.state.records.map(/*这里是找有没有刚刚那个下标，若有，用新元素代替旧元素，否则返旧元素*/
            (item,index) => {
                if(index != recordIndex){
                    return item;
                }
                return {
                    ...item,
                    ...reData
                }
            }
        );
        this.setState({
            records:newRecords
        });
    }
    deleteRecord(record){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item,index) => index != recordIndex );/*array的方法：filter()过滤方法，将不是要过滤的数据组成新的数组*/
        this.setState({
            records:newRecords
        });
    }

    credit(){
        let credits = this.state.records.filter(
            (record) =>{
                return record.amount >= 0;
            });
        return credits.reduce((prev,curr) => {
            console.log(prev);
            console.log(curr);
            return prev + Number.parseInt(curr.amount,0);
        },0)
    }
    debits(){
        let credits = this.state.records.filter(
            (record) =>{
                return record.amount < 0;
            });
        return credits.reduce((prev,curr) => {
            return prev + Number.parseInt(curr.amount,0);
        },0)
    }
    balance(){
        return this.credit() + this.debits();
    }

    render() {
        const {error, isLoaded, records} = this.state;
        let recordsComponent;

        if (error) {
            recordsComponent = <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            recordsComponent = <div>Loading...</div>
        } else {
            recordsComponent = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record, i) => <Record key={i} record={record} handleEditRecord={this.updateRecord.bind(this)} handleDeleteRecord={this.deleteRecord.bind(this)}/>)}
                    </tbody>
                </table>
            );

        }
        return (
            <div>
                <h2>Records</h2>
                <div className="row mb-3">
                    <AmountBox text="Credit" type="success" amount={this.credit()}/>
                    <AmountBox text="Debits" type="danger" amount={this.debits()}/>
                    <AmountBox text="Balance" type="info" amount={this.balance()}/>
                </div>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        );
    }
}

/*spread operator ... 是拓展运算符，把一个hash或对象或数组拓展开来
 * 例题： record={"id":1,"data":"2018-01-09","title":"收入","amount":20}
 *       那么{...record}表示{id:record.id}{data:record.data}{title:record.title}{amount:record.amount}
 *
 *       redux是一个管理数据的插件
 */

export default Records;




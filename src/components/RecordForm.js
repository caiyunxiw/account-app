import React, {Component} from 'react';
import axios from 'axios';

export default class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            title: "",
            amount: ""
        };
    }
    handleChange(event){
      let name,obj;
      name = event.target.name;/*event.target.name表示该标签的name属性，event.target.value表示该标签的value属性*/
      console.log(name)
      this.setState((
          obj = {},
              obj["" +name] = event.target.value,
              obj
      ));

        /* 上述这种写法(obj = {},obj["" +name] = event.target.value,obj)
         * 表示：{"title":“456”}或{"data":"2018-02-01"}或{"amount":12}
         */
    }

    vaild(){
        return this.state.data && this.state.title && this.state.amount;
    }
    handleSubmit(event) {
        event.preventDefault();
        const reData = {data:this.state.data,title:this.state.title,amount:Number.parseInt(this.state.amount,0)};
        axios.post(`records`, reData).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    data: "",
                    title: "",
                    amount: ""
                    }

                );
            }
        ).catch(
            error => console.log(error.message)
        )
    }



    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="data" value={this.state.data}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title"
                           value={this.state.title}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="amount" name="amount"
                           value={this.state.amount}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.vaild()}>Create Record</button>
            </form>
        );
    }
}

/*
* disabled={!this.vaild()}该语句中函数vaild()加了括号，而不是vaild.bind(this),表明该方法是要执行的，而不是？
*``这样的符号表示里面是可变的字符串：例如:`{api}world`就相当于api+"world"
* */
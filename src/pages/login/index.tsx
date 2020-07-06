// imr 生成
import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom"
import { Button } from 'antd-mobile';
import { request } from '../../utils/request';
import css from "./index.module.scss"
import { log } from 'console';
// cc 生成
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
class Home extends React.Component<any>{
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {

  }
  cenglu(): void {
    axios({
      url: "http://hmtoutiao-api.atlansic.com/login",
      method: "POST",
      data: this.state
    }).then(res => {
      const { data } = res
      if (data.message === '登录成功') {
        console.log(data);
        localStorage.setItem("key", data.data.token);
        this.props.history.push('/home')

      } else {
        console.log("登录失败");

      }
    })

  }
  // 输入框
  handleChange(e: any) {
    this.setState({
      username: e.target.value
    })
  }
  // 密码框
  handleChangepass(e: any) {
    this.setState({
      password: e.target.value
    })
  }

  readonly state: Readonly<any> = {
    username: '',
    password: ""
  }

  render() {

    return (
      <div className={css.box}>
        <div className={css.box1}>
          <div>账号</div>
          <input type='text' onChange={this.handleChange.bind(this)} value={this.state.username}
            className={css.name} />
          <p>{this.state.username}</p>
          <div>密码</div>
          <input type='password' onChange={this.handleChangepass.bind(this)} value={this.state.password}
            className={css.paas} />
          <p>{this.state.password}</p>
        </div>






        <div>  <Button type="primary" onClick={() => this.cenglu()} className={css.buuton}>登录</Button></div>
      </div>

    );
  }
}


export default Home;


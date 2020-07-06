// function Layout(props: any) {
//   // 权限配置

//   return <div>{props.children}</div>;
// }

// export default Layout;

// imr 生成
import React from "react";

import { Route, Redirect } from "react-router-dom";


export default class Layout extends React.Component {


  readonly state: Readonly<any> = {
    

  };
  componentDidMount() {
    const key = localStorage.getItem("key") || [];


  }

  render() {
    const { children } = this.props;
    return <div>{
    
      children}</div>;
  }
}

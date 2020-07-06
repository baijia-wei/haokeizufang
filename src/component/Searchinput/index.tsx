import React from "react";
import css from "./index.module.scss";
// 联系代理商的方法 connect
import { connect } from "react-redux";
// withRouter 让组件快速拥有路由相关对象的函数
import { withRouter } from "react-router-dom";

class SearchInput extends React.Component<any> {
  constructor(porpt: any) {
    super(porpt);
  }
  render() {
    return (
      <div className={css.search}>
        <div className={css.search_left}>
          <div
            className={css.search_left_city}
            onClick={() => this.props.history.push("/cityselect")}
          >
            <span>{this.props.cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={css.search_left_input}>
            <i className="iconfont icon-seach"></i>
            <span>请输入小区地址</span>
          </div>
        </div>
        <div className={css.search_map}
          onClick={() => this.props.history.push("/mapfound")}
        >
          <i className={`iconfont icon-map ${css.iconfont}`}></i>
        </div>
      </div>
    )
  }
}
// 把仓库 state 映射到组件的 props 上的函数
const mapStateToProps = (state: any) => ({
  cityName: state.address.city
});


// connect 联系 react-redux 代理商，
// 把仓库的 state 映射到 SearchInput 组件的 props 上
export default connect(mapStateToProps)(withRouter(SearchInput));
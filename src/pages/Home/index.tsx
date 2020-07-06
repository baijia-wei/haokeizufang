// imr 生成
import React from "react";

import { Route, Redirect } from "react-router-dom";
import { TabBar } from 'antd-mobile';

import Index from '../Index';
import Found from '../Found';
import My from '../My';
import Layout from "../layout/layout"


interface IState {
  hidden: boolean;
  stateData: Array<string>;
  location?: any
  history?: any

}

class Home extends React.Component<IState> {

  readonly state: Readonly<IState> = {
    hidden: false,
    stateData: [],

  };
  render() {
    return (
      <Layout>
        {/* 如果是 "/home" 重定向到 "/home/index" 展示首页组件 */}
        <Route exact path="/home"><Redirect to="/home/index"></Redirect></Route>
        {/* 如何实现在切换页面的时候，让对应的选项卡选中 */}
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#21b97a"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="首页"
              icon={<i className="iconfont icon-ind" />}
              selectedIcon={<i className="iconfont icon-ind" />}
              selected={this.props.location.pathname === '/home/index'}
              onPress={() => { this.props.history.push('/home/index'); }}
            >
              <Route path="/home/index" component={Index}></Route>
            </TabBar.Item>
            <TabBar.Item
              title="找房"
              key="找房"
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              selected={this.props.location.pathname === '/home/found'}
              onPress={() => { this.props.history.push('/home/found'); }}
            >
              <Route path="/home/found" component={Found}></Route>
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="我的"
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              selected={this.props.location.pathname === '/home/my'}
              onPress={() => { this.props.history.push('/home/my'); }}
            >
              <Route path="/home/my" component={My}></Route>
            </TabBar.Item>
          </TabBar>
        </div>
      </Layout>
    );
  }
}

export default Home;

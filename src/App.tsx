import React from 'react';
import { connect } from "react-redux";
import './styles/App.scss';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import login from "./pages/login"
import CitySelect from './pages/CitySelect';
import MapFound from './pages/MapFound';
import PageNotFound from './pages/PageNotFound';
import getBaiduCity from "./utils/baiduMap";
import Detailspage from './pages/Detailspage';
import { GET_CITY_ACTION } from './store/actionCreator';

class App extends React.Component<any>{
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    // 调用获取定位的方法
    this.props.getCity();
  }
  render() {
    // this.props.cityName &&
    return (
      <div className="App" >
        {
          this.props.cityName &&
          <HashRouter>
            <Switch>
              <Route path="/found/detailspage" component={Detailspage}></Route>
              <Route exact path="/"><Redirect to="/login"></Redirect></Route>
              <Route path="/home" component={Home}></Route>
              <Route path="/login" component={login}></Route>
              <Route path="/cityselect" component={CitySelect}></Route>
              <Route path="/mapfound" component={MapFound}></Route>
              <Route exact component={PageNotFound}></Route>

            </Switch>
          </HashRouter>
        }
      </div>
    );
  }
}
// 把仓库 state 映射到组件的 props 上的函数
const mapStateToProps = (state: any) => ({
  cityName: state.address.city
});

// 把 dispatch 修改的方法映射到组件 props 上的函数
const mapDispatchToProps = (dispatch: any) => ({
  getCity: () => {
    // 调用 GET_CITY_ACTION
    dispatch(GET_CITY_ACTION());
  }
});

// connect 联系 react-redux 代理商，
// 把仓库的 state 和 dispatch 映射到 App 组件的 props 上
export default connect(mapStateToProps, mapDispatchToProps)(App);

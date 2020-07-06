// 解构创建仓库的方法
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
// 导入仓库管理员
import reducer from "./reducer";
let win: any = window;//
// 创建仓库并传入管理员

const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(

  applyMiddleware(thunk)
)
);

export default store;


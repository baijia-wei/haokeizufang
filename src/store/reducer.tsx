
import { GET_CITY, CHANGE_CITY } from "./actionTypes";
interface Iset {// 默认仓库状态
  address: {
    city: string
  }
  , userInfo: {}
}



const defaultState: Iset = {
  // 地址对象默认值
  address: {
    city: ""
  },
  userInfo: {}
};

// 仓库管理员
//   state     仓库状态
//   action    通过 dispatch 发送的 action
const reducer = (state = defaultState, action: any) => {
  // 判断 action 的类型
  if (action.type === GET_CITY) {
    // 深拷贝
    const newState = JSON.parse(JSON.stringify(state));
    // 把 action 值更新到仓库中
    newState.address = action.value;
    // 返回新的状态
    return newState;
  }
  if (action.type === CHANGE_CITY) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.address = action.value;
    return newState;
  }
  return state;
};

export default reducer;

// 用独立的文件维护 action 对象

// 自动导入的 actionTypes
import { CHANGE_CITY, GET_CITY } from "./actionTypes";
import getBaiduCity from "../utils/baiduMap";
import { request } from "../utils/request";

// 函数可以接受参数，根据参数创建新的 action 对象
export const CHANGE_CITY_ACTION = ({ city, cityId }: any) => ({
  type: CHANGE_CITY,
  value: {
    city,
    cityId,
  },
});

export const GET_CITY_ACTION = () => {
  return async (dispatch: any) => {
    // 百度地图获取城市
    const res: any = await getBaiduCity();
    // 可选操作：把 市 字去掉
    res.city = res.city.replace("市", "");
    // 根据城市，获取城市 ID 信息
    const { label, value } = (
      await request.get("/area/info?name=" + res.city)
    ).data.body;
    // 把城市形象作为 action 对象的 value
    const action = {
      // 使用 actionTypes
      type: GET_CITY,
      value: {
        city: label,
        cityId: value,
      },
    };
    // 通过 dispatch 方法修改仓库的状态
    dispatch(action);
  };
};

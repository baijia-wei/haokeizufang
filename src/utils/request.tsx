import axios from "axios";
import { Toast } from "antd-mobile";
export const baseURL = 'http://157.122.54.189:9060';
export const request = axios.create({ baseURL });
// 请求计数器

let ajaxCount = 0;
request.interceptors.request.use(
  function (config) {
    // 请求的时候计数器加1
    ajaxCount++;
    // Toast 提示组件通过 JS API 调用
    Toast.loading("疯狂加载中...", 0);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器 - 隐藏 loading
request.interceptors.response.use(
  function (response) {
    // 请求完成后计数器就减1
    ajaxCount--;
    // 如果计数器减少为 0
    if (ajaxCount === 0) {
      // 所有请求都完成，就隐藏提示框
      Toast.hide();
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

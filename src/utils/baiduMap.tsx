/* 
  封装的百度地图定位。
*/
let win: any = window;
const getBaiduCity = () => {
  // 通过 Promise 方式封装百度地图定位获取
  return new Promise((resolve, reject) => {
    // 调用百度地图浏览器定位接口
    // 注意事项：全局变量需要添加 window.
    const geolocation = new win.BMap.Geolocation();
    geolocation.getCurrentPosition(function (res: any) {
      if (geolocation.getStatus() === win.BMAP_STATUS_SUCCESS) {
        // 成功失败调用 resolve 给 then 的形参传递数据
        resolve(res.address);
      } else {
        // 失败调用 reject
        reject(res);
      }
    });
  });
};

export default getBaiduCity;

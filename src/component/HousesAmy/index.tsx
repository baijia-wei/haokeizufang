// imr 生成
import React from "react";
import css from "./index.module.scss";
// 联系代理商的方法 connect
import { baseURL } from "../../utils/request";

// cc 生成
// Ctrl+D 选中相同词 - 把组件名称替换成 Found
class HousesAmy extends React.Component<any> {


  render() {

    const { item } = this.props;
    return (
      <div className={`${css.house_item} house_item`} >
        {/* 注意这里图片的路径拼接 */}
        <img
          className={`${css.house_item_img} house_item_img`}
          src={baseURL + item.houseImg}
          alt=""
        />
        <div className={css.house_item_info}>
          <h4 className={css.house_item_info_name}>{item.title}</h4>
          <div className={css.house_item_info_desc}>{item.desc}</div>
          <div className={css.house_item_info_label}>
            {/* 标签渲染 */}
            {item.tags.map((item2: any) => (
              <span key={item2}>{item2}</span>
            ))}
          </div>
          <div className={css.house_item_info_price}>{item.price}</div>
        </div>
      </div>
    );
  }
}

export default HousesAmy;

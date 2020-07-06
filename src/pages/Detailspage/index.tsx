// imr 生成
import React from 'react';
import img2 from '../../assets/331.png'
import { NavBar, Icon, PickerView, Switch } from "antd-mobile";
import css from './index.module.scss';
// cc 生成
// Ctrl+D 选中相同词 - 把组件名称替换成 My
class Detailspage extends React.Component<any>{
  state = {

  };
  render() {
    return (
      <div className={css.letter}>
        {/* ---------------------头 */}
        <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          >
            世纪联华 醉仙楼
          </NavBar>
        </div>
        {/* 轮播图-------------------- */}
        <div className={css.heide_Carousel}>
          <img src={img2} alt="" />

        </div>
        {/* -------------详情 */}
        <div>
          <h4>合租 · 彩云北路世纪城 精装修一室合租房，有家具电视</h4>
        </div>
        <div className={css.avigation}>
          <div className={css.avigation_span}>
            <span>1000原</span>
            <span>标签</span>
          </div>
          <div className={css.avigation_span}>
            <span>1000原</span>
            <span>标签</span>
          </div>
          <div className={css.avigation_span}>
            <span>1000原</span>
            <span>标签</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Detailspage;


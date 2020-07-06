// imr 生成
import React from 'react';
import { connect } from "react-redux";
import { NavBar, Icon, Toast } from "antd-mobile";
import { CHANGE_CITY_ACTION } from "../../store/actionCreator";
import { List } from "react-virtualized";
import { request } from "../../utils/request";

import css from "./index.module.scss";

interface IStatea {//类型校验
  finallList: Array<any>
  letterList: Array<any>

  citonIninx: number
}

interface Iprops {//props下属性校验
  cityName: string,
  history: {
    goBack(): void;
  },
  // changeStoreCity: (arg0: any) => void
  changeStoreCity(str: number): void;
}

class CitySelect extends React.Component<Iprops>{

  ListRef: React.RefObject<any>;
  public constructor(props: any) {
    super(props)
    this.ListRef = React.createRef();
  }
  public readonly state: Readonly<IStatea> = {//states数据
    finallList: [],// 城市总列表
    letterList: [],  // 字母列表

    citonIninx: 0,  // 选中分租的索引


  };


  async componentDidMount() {// 生命周期 

    this.state.finallList.push({//把当前城市放进去
      title: '当前城市',
      children: [{ city: this.props.cityName }]
    });
    // 热门城市
    const res = await Promise.all([
      request.get("/area/hot"),
      request.get("/area/city?level=1"),
    ]);

    const cityHot = res[0].data.body;//热门城市请求
    const cityList = res[1].data.body;//城市列表

    // 把热门城市放进去
    this.state.finallList.push({
      title: '热门城市',
      children: cityHot.map((v: any) => ({ city: v.label }))
    })
    // 对城市列表进行排序
    cityList.sort((a: any, b: any) => (a.short > b.short ? 1 : -1))
    //比较英文字母来排序
    // console.log(cityList);

    cityList.forEach((item: any) => {
      // 拿到short第一个字母转换大写
      const firstLetter = item.short.charAt(0).toUpperCase();
      const index = this.state.finallList.findIndex((v: any) =>
        v.title === firstLetter
      )
      if (index === -1) {
        this.state.finallList.push({
          title: firstLetter,
          children: [{ city: item.label }]
        })
      } else {
        this.state.finallList[index].children.push({ city: item.label })
      }
    });
    console.log(this.state.finallList);

    const letterList = this.state.finallList.map((v: any) => v.title);
    //拿到
    letterList.splice(0, 2, "#", "热");//替换当前的数据

    this.setState({ letterList });//更新数据



    this.ListRef.current.measureAllRows();    // 测量所有行的精确高度
  }
  //---------------------------------


  getCurrentCity = (currentCity: string) => {// 获取当前城市的事件
    const { finallList } = this.state;


    const hotCity = finallList[1].children;//热门城市下的
    const index = hotCity.findIndex((v: any) => v.city === currentCity)
    //判断当前点击的城市在不在热门城市里在返回索引 不在返回-1
    if (index === -1) {
      Toast.info("该城市没有房源信息", 1);
    } else {
      this.props.changeStoreCity(hotCity[index]);
      this.props.history.goBack();
      // 修改到仓库
    }
  }
  // 行渲染函数 - 被 List 组件重复调用 - 负责渲染一行
  rowRenderer = ({ key, index, style }: any) => {
    const { finallList } = this.state;


    return (
      <div className={css.city_group} key={key} style={style}>

        {/* finallList[index] 相当于之前 map 时候的 item */}

        <div className={css.city_group_title}>{finallList[index].title}
        </div>
        {finallList[index].children.map((item: any) => (
          <div
            key={item.city}
            className={css.city_group_item}
            // 给城市绑定点击事件
            onClick={() => this.getCurrentCity(item.city)}
          >
            {item.city}
          </div>
        ))}
      </div>

    )

  }
  onRowsRendered = ({ startIndex }: any) => {//渲染行的回调函数
    if (this.state.citonIninx === startIndex) return;
    this.setState({ citonIninx: startIndex });
  }
  // 计算一大行高度的函数 =>  孩子长度 * 孩子高 + 标题高
  rowHeight = ({ index }: any) => {
    const { finallList } = this.state;
    return finallList[index].children.length * 40 + 40;
  };
  changeIndex = (citonIninx: any) => {
    this.setState({ citonIninx });
    // 好像有问题。
    this.ListRef.current.scrollToRow(citonIninx);
  }
  render() {
    const { finallList, letterList, citonIninx } = this.state;


    return (
      <div>

        {/* 1.0 antd-mobile 的 NavBar 组件 开始 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>


        {
          <List
            // 给组件起个名字
            ref={this.ListRef}
            // 宽度 - Number
            width={window.screen.width}
            // 高度 - Number
            height={window.screen.height - 45}
            // 行数 - Number
            rowCount={finallList.length}
            // 行高度  - Function
            rowHeight={this.rowHeight}
            // 行渲染 - Function - 负责呈现一行
            rowRenderer={this.rowRenderer}
            // 滚动对齐
            scrollToAlignment="start"
            // 滚动到哪个索引
            // scrollToIndex={currentIndex}
            // 行渲染时的回调函数
            onRowsRendered={this.onRowsRendered}
          />
        }




        <div className={css.letter}>
          {
            letterList &&
            letterList.map((item, index) => (
              <div
                onClick={() => this.changeIndex(index)}
                key={item}
                className={css.letter_item}
              >
                <span className={citonIninx === index ? css.active : ""}>
                  {item}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  cityName: state.address.city,
});


// 修改：把仓库 dispatch 映射到组件的 props 上的函数
const mapDispatchToProps = (dispatch: any) => ({
  changeStoreCity: ({ city, cityId }: any) => {
    // 准备个 action
    dispatch(CHANGE_CITY_ACTION({ city, cityId }));
  },
});

// connect 联系 react-redux 代理商，
// 把仓库的 state 映射到 CitySelect 组件的 props 上
export default connect(mapStateToProps, mapDispatchToProps)(CitySelect);

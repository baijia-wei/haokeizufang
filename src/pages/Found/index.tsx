// imr 生成
import React from 'react';
import { NavBar, Icon, PickerView, Switch } from "antd-mobile";
import css from "./inedx.module.scss";
import { connect } from "react-redux";
import HousesAmy from "../../component//HousesAmy";
import Searchinput from "../../component/Searchinput";
import { request, baseURL } from "../../utils/request";


// cc 生成
// Ctrl+D 选中相同词 - 把组件名称替换成 Found
import { List } from 'react-virtualized';
import { log } from 'console';


interface Istate {
  redring: Array<any>,
  Source: Array<any>,
  indexT: any,
  SourceData: Array<any>,
  value: any,
  selectParams: any,
  house_array: Array<any>,
}

interface Props {
  cityName: String,
  history: any
}


class Found extends React.Component<Props, {}>{
  selectParams: any;

  readonly state: Readonly<Istate> = {
    redring: [
      { id: 1, text: "区域", cols: 3 },
      { id: 2, text: "方式", cols: 1 },
      { id: 3, text: "租金", cols: 1 },
      { id: 4, text: "筛选" },
    ],
    Source: [[], [], [], []],//把选中的值放进去
    indexT: -1,
    SourceData: [],//筛选数据     
    value: '',//渲染条件
    selectParams: [],
    house_array: []//请求回来的列表
    //选中保存的值
  };

  id = ""; isLoading = false;
  //定义分页的数据
  pageSize = 10;
  pageParams = {
    end: this.pageSize,
    start: 1
  }
  shubwen(i: number) {
    if (i === this.state.indexT) {
      return;
    }
    this.setState({ indexT: i });
  }

  //*-----------------------*-----------右边筛选点击选择
  clickadd = (value: string) => {
    const { Source, indexT } = this.state
    const isrof = Source[indexT].findIndex((itemc: any) => (itemc === value))
    if (isrof === -1) {
      Source[3].push(value)
    } else {
      Source[3].splice(isrof, 1)
    }
  }
  //-------------------------------------取消
  cancel = () => {
    const { SourceData, indexT } = this.state;
    SourceData[indexT].splice(0);
    this.setState({ SourceData });
  }
  canceld = () => {
    this.quxiao()
  }
  //--------------------------------------确定
  getscreenqding = () => {
    let { Source, house_array, indexT, selectParams
    } = this.state

    const key = Source[0][0]
    const value = ['null'].includes(Source[0][2]) ? Source[0][1] : Source[0][2]

    selectParams = {
      [key]: value,
      rentType: Source[1][0],
      price: Source[2][0],
      more: Source[3].join(","),
    }
    Object.keys(selectParams).forEach((key, index) => {
      // console.log(index, key, selectParams[key]);
      if (
        key === "undefined" ||
        [undefined, "", "null"].includes(selectParams[key])
      ) {
        // 判断 当前区域 是否选中 或者 判断当前selectParams中有没有undefined, "", "null"选项任意有一个都会进行删除
        delete selectParams[key];
      }
    });
    this.setState({ selectParams: selectParams, house_array: [] })
    this.pageParams.end = this.pageSize
    this.pageParams.start = 1
    this.gethouseList()
    this.quxiao()

  }
  //地区城市
  gethouseList = async () => {
    //函数交流
    this.isLoading = true;
    const res = (
      await request.get("/houses", {
        params: {
          cityId: this.id,
          ...this.selectParams,
          ...this.pageParams,
        },
      })
    ).data.body;
    this.isLoading = false;



    this.setState({ house_array: [...this.state.house_array, ...res.list] });

    console.log(this.state.house_array);

  };
  // -----------------------------------生命周期
  componentDidMount = () => {
    this.gethousing()

    console.error(this.state.redring);


  }
  //-------------------------------------------------------------封装获取房源
  gethousing = async () => {
    const { SourceData } = this.state


    this.id = (await request.get(`/area/info?name=${this.props.cityName}`)).data.body.value;


    // 2. 获取当前城市下的房源筛选数据
    const citys = (await request.get("/houses/condition?id=" + this.id)).data
      .body;



    console.log(this.props.cityName);

    console.log(this.id);

    SourceData[0] = [citys.area, citys.subway]
    SourceData[1] = citys.rentType
    SourceData[2] = citys.price
    SourceData[3] = [
      {
        title: "户型",
        children: citys.roomType,
      },
      {
        title: "朝向",
        children: citys.oriented,
      },
      {
        title: "楼层",
        children: citys.floor,
      },
      {
        title: "房屋亮点",
        children: citys.characteristic,
      },
    ];

    this.setState({ SourceData })
    this.gethouseList();

  }
  // 封装隐藏筛选框的
  quxiao = () => {
    this.setState({ indexT: -1 })
  }
  // 筛选中的回调
  onChange = (value: string) => {
    const { Source, indexT } = this.state
    Source[indexT] = value
    this.setState({ Source, value })



  }
  //----------------------渲染的回调
  onScroll = ({ scrollHeight, clientHeight, scrollTop }: any) => {
    // 第一次渲染 List 组件的时候，数据还没请求回来，所以列表高度为 0
    // 这行代码思考下是否有问题，如何写更好 ???
    // 长列表的滚动事件
    //    scrollHeight    长列表内容总高
    //    clientHeight    可视区高
    //    scrollTop       滚动出去了多少
    const isFirstRender = scrollHeight === 0;
    const isReachBottom = scrollHeight - clientHeight - scrollTop <= 50;


    if (isFirstRender || !isReachBottom || this.isLoading) return;

    this.pageParams.start += this.pageSize;
    this.pageParams.end += this.pageSize;
    this.gethouseList();
  }
  ListRendering = () => {
    const { indexT, value, SourceData, redring } = this.state

    if (indexT >= 0 && indexT <= 2) {
      return <div className={css.content}>
        <div className={css.content_title}>
          <PickerView

            data={SourceData[indexT]}
            cols={redring[indexT].cols}
            value={value}
            onChange={this.onChange}
          ></PickerView>
        </div>
        <div className={css.content_buuton}>
          <div onClick={() => this.canceld()}>取消</div>
          <div onClick={() => this.getscreenqding()}>确定</div>
        </div>
        <div
          onClick={() => this.setState({ indexT: -1 })}
          className={css.cheng}
        ></div>
      </div>
    } else if (indexT === 3) {
      return (
        <div className={css.screen}>
          <div className={css.screen_title}>
            {SourceData[3].map((v: any) => (
              <div key={v.title} className={css.screen_title_xignx}>
                <h4 className={css.screen_title_title}>{v.title}</h4>
                {/* ---------------------------------------------------------- */}
                <div className={css.titles}>
                  {v.children.map((item: any) => (
                    <div
                      className={
                        css.titlesw

                      }
                      key={item.value}
                      onClick={() => this.clickadd(item.value)}
                    >
                      {item.label}
                    </div> //判断当期的点击的元素有没有 value 这个属性 有就表示当前数组里有这个属性 有就加上这个类名
                  ))}
                </div>
                {/*---------------------------------------------------------------------  */}
              </div>
            ))}
          </div>
          <div className={css.screen_buuton}>
            <div onClick={() => this.cancel()}>取消</div>
            <div onClick={() => this.getscreenqding()}>确定</div>
          </div>
          <div
            onClick={() => this.setState({ indexT: -1 })}
            className={css.chengc}
          ></div>
        </div>
      );
    } else {
      return <></>
    }
  }
  //********************************************************************************** */
  rowRenderer = ({ key, style, index }: any) => {
    const { house_array } = this.state
    const code = house_array[index]
    return (

      <div key={key} style={style} onClick={() => this.props.history.push("/found/detailspage")}>
        <HousesAmy item={house_array[index]} >

        </HousesAmy>
      </div>
    );
  }
  render() {
    const { indexT, house_array } = this.state
    return (


      <div className={css.found}>


        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          <Searchinput></Searchinput>
        </NavBar>

        <div>
          <div className={css.list}>
            {this.state.redring.map((v, i) => (
              <div
                key={v.id}
                className={(css.list_item, i === indexT ? css.actoe : "")}
                onClick={() => this.shubwen(i)}
              >
                {v.text}
                <i className="iconfont icon-arrow"></i>
              </div>
            ))}

          </div>
        </div>
        {this.ListRendering()}
        <div className={css.house_list}>
          {/* {
            this.state.house_array.map(item => (
              <HousesAmy key={item.houseCode} item={item}></HousesAmy>
            ))
          } */}

          <List
            width={window.screen.width}
            height={window.screen.height - 45 - 40 - 50}
            rowCount={house_array.length}
            rowHeight={108}
            rowRenderer={this.rowRenderer}
            onScroll={this.onScroll}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  cityName: state.address.city,
});

export default connect(mapStateToProps)(Found);
// export default Found;


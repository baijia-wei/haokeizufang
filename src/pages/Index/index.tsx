// imr 生成
import React from 'react';
import { Carousel } from 'antd-mobile';
import { request, baseURL } from '../../utils/request';

import img01 from "../../assets/images/nav-1.png";
import img02 from "../../assets/images/nav-2.png";
import img03 from "../../assets/images/nav-3.png";
import img04 from "../../assets/images/nav-4.png";
import styles from "./index.module.scss";
import SearchInput from "../../component/Searchinput";
interface IState {//state属性接口
  groupdata: Array<any>
  swiperData: Array<any>,
  imgHeight: string
  entryData: Array<IStatea>,
  newsData: Array<any>,

}
interface IStatea {
  id: number,
  text: string,
  img_src: string

}

class Index extends React.Component {


  readonly state: Readonly<IState> = {
    swiperData: [],//轮播图数据
    newsData: [],
    groupdata: [],//租房小组模块
    imgHeight: '56.53vw',
    entryData: [
      { id: 1, text: "整租", img_src: img01 },//字体图标
      { id: 2, text: "合租", img_src: img02 },
      { id: 3, text: "地图找房", img_src: img03 },
      { id: 4, text: "去出租", img_src: img04 },
    ],

  };
  // 租房小组
  getgroupdata() {
    request.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
      .then((res: any) => {

        this.setState({ groupdata: res.data.body });
      });
  }
  // 轮播图
  luanbtu() {
    request.get('/home/swiper').then((res: any) => {
      // console.log(res.data.body);
      // 更新页面数据
      this.setState({ swiperData: res.data.body });
    });
  }

  getNewsData() {
    request.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
      .then((res: any) => {
        this.setState({ newsData: res.data.body });
      });
  }
  componentDidMount() {
    // 通过 axios 发送请求
    this.luanbtu()
    this.getgroupdata()
    this.getNewsData()

  }
  render() {
    return (
      <div>
        {/* 轮播图 */}
        <div>



          <div className={styles.search_index}>
            <SearchInput></SearchInput>
          </div>
          {
            // !! 取反再取反，相当于 Boolean() 的简写，可以把数据快速转换成布尔类型

            // react 的布尔类型不展示到页面中
            !!this.state.swiperData.length &&
            <Carousel
              autoplay
              infinite
            >
              {this.state.swiperData.map(item => (
                <a
                  key={item.id}

                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    // 注意路径拼接
                    src={baseURL + item.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      // 图片加载完毕后，或者浏览器大小改变时，自动调整图片高度
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          }

        </div>
        {/* 导航入口 */}
        <div className={styles.entry}>
          {this.state.entryData.map((item) => (
            <div key={item.id} className={styles.entry_item}>
              <img
                src={item.img_src}
                alt=""
                className={styles.entry_item_img}
              />
              <span className={styles.entry_item_text}>{item.text}</span>
            </div>
          ))}
        </div>
        {/* 租房小组模块 */}
        <div className={styles.group}>
          <div className={styles.group_head}>
            <h3>租房小组</h3>
            <span>更多</span>
          </div>
          <div className={styles.group_body}>
            {/* 列表渲染 */}
            {this.state.groupdata.map((item) => (
              <div key={item.id} className={styles.group_body_item}>
                <div className={styles.group_body_item_info}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <img
                  className={styles.group_body_item_img}
                  src={baseURL + item.imgSrc}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4最新资讯 */}
        <div className={styles.news}>
          <h3 className={styles.news_head}>最新资讯</h3>
          <div className={styles.news_list}>
            {/* 列表渲染 */}
            {this.state.newsData.map((item: any, index) => (
              <div key={index} className={styles.news_item}>
                <img className={styles.news_item_img} src={baseURL + item.imgSrc} alt="" />
                <div className={styles.new_item_info}>
                  <h4>{item.title}</h4>
                  <p>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;


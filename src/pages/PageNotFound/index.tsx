// imr 生成
import React from 'react';

// cc 生成
// Ctrl+D 选中相同词 - 把组件名称替换成 My
class PageNotFound extends React.Component<any> {
  state = {

  };
  componentDidMount() {
    setTimeout(() => {
      this.props.history.replace('/home');
    }, 3000);
  }
  render() {
    return (
      <h1>页面不存在</h1>
    );
  }
}

export default PageNotFound;


import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Menu} from 'antd';
import { } from '@ant-design/icons';
import menulist from './menulist';
const { SubMenu } = Menu;
// function handleJump (e) {
//   console.log(e)
// }
class Slider extends Component {
  handleJump = (e)=>{  //根据事件对象中的path 进行跳转
    // console.log(e)
    let {path} = e.item.props
    this.props.history.push(path)
  }
  renderItem = (data)=>{  //递归渲染侧边栏列表
    // console.log(data)
    return data.map((item)=>{
      if(item.children){  //判断是否有二级
        return(
          <SubMenu
            key={item.key}
            title={
              <span>
                {item.title}
              </span>
            }
          >
            {this.renderItem(item.children)}
            {/* <Menu.Item key="5">option5</Menu.Item> */}
          </SubMenu>
        )
      }else{
        return (
        <Menu.Item key={item.key} path={item.path}>
          {}
          {item.title}
        </Menu.Item>
        )
      }
    })
  }
  render() {
    return (
      <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          theme='dark'
          onClick={this.handleJump}
        >
          {this.renderItem(menulist)}
        </Menu>
    );
  }
}

export default withRouter(Slider);

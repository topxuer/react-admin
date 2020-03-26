import React, { Component } from 'react';
import style from './admin.module.less';
import { Layout} from 'antd';
import Slider from '../../components/slider';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme='light'>
        {/* <div className={style.logo} /> */}
        {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <UserOutlined />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UploadOutlined />
            <span>nav 3</span>
          </Menu.Item>
        </Menu> */}
        <Slider></Slider>
      </Sider>
      <Layout className={style['site-layout']}>
        <Header className={style['site-layout-background']} style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}
        </Header>
        <Content
          className={style['site-layout-background']}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <br/>
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
    );
  }
}

export default Admin;

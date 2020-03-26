import React, { Component } from 'react';
import style from './index.module.less';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../../api/admin';
class Login extends Component {
  onFinish = (e) => {
    // console.log('Received values of form: ', e);
    let {userName,passWord} = e
    console.log(userName,passWord)
    api.login({userName,passWord}).then((res)=>{
      console.log(res)
      if(res.code === 0){
        message.success('登陆成功~ 1秒后跳转至首页')
        setTimeout(() => {
          this.props.history.push('/admin')
        }, 1000);
      }else{
        message.error('用户名或密码错误！请重试~')
      }
    })
   
  };
  render() {
    return (
      <div className={style.box}>
        <Form
          name="normal_login"
          className={style['login-form']}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="userName"
            rules={
              [
                { required: true, message: 'Please input your Username!' },
                {
                  min:3,message:'用户名最少3位~'
                },
                {
                  max:8,message:'用户名最长8位~'
                }
              ]
            }
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="passWord"
            rules={
              [
                { required: true, message: 'Please input your Password!' },
                {min:3,message:'密码最少3位'},
                {max:12,message:'密码最多12位'}
              ]
            }
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <span className="login-form-forgot">
              Forgot password
            </span>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <span >register now!</span>
          </Form.Item>
        </Form>
        
      </div>
    );
  }
}

export default Login;

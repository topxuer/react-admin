import React, { Component } from 'react';
import {Table,Button,Card,Modal,message,Spin,Popconfirm  } from 'antd';
import api from '../../api/admin';
// let columns = [
//   {
//     title: 'id',
//     dataIndex: '_id',
//     key: '_id',
//   },
//   {
//     title: '账号',
//     dataIndex: 'userName',
//     key: 'userName',
//   },
//   {
//     title: '操作',
//     render:(h)=>{
//       // console.log(h)  //每一条数据
//       return (
//         <Button type='danger' size='small' onClick={this.del.bind(this)}>删除</Button>
//       )
//     }
//   },
// ];

class Administrators extends Component {
  state={
    dataSource:[],
    visible:false,
    spinning:false,
    columns : [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '账号',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '操作',
        render:(h)=>{
          // console.log(h)  //每一条数据
          return (
            <Popconfirm placement="topRight" title='确认删除吗，操作后无法撤回' onConfirm={this.del.bind(this,h._id)} okText="确认" cancelText="取消">
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
          )
        }
      },
    ]
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  handleAdd = async () =>{
    let userName = this.refs.user.value
    let passWord = this.refs.pwd.value
    let result = await api.add({userName,passWord})
    console.log(result)
    if(result.code===0){
      message.success('添加成功')
      this.setState({visible:false})
      this.refreshList()
    }else{
      message.error('添加失败')
    }
  }
  del = async (id) => {
    // console.log(this)
    console.log(id)
    let result = await api.del(id)
    if(result.code===0){
      message.success('删除成功')
      this.refreshList()
    }else{
      message.error('删除失败')
    }

  }
  refreshList = async ()=>{
    this.setState({spinning:true})
    let result = await api.getList()
    // console.log(result.adminList)
    this.setState({dataSource:result.adminList})
    this.setState({spinning:false})
  }
  componentDidMount(){
    this.refreshList()
  }
  render() {
    let {dataSource,columns,visible,spinning} = this.state
    return (
      <div>
        <Card title='管理员列表'>
          <Button type='primary' size='middle' onClick={this.showModal}>添加管理员</Button>
          {/* dataSource 表格内容数据
              columns    表头数据
              rowKey     设置为唯一索引字段
          */}
          {/* <Table dataSource={dataSource} columns={columns} title={()=>'管理员列表'} rowKey='_id'/> */}
          <Spin spinning={spinning}>
            <Table dataSource={dataSource} columns={columns} rowKey='_id'/>
          </Spin>

        </Card>
        <Modal
          title='管理员添加'
          visible={visible}
          onOk={this.handleAdd}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          用户名：<input ref='user'/>
          密码：<input type='password' ref='pwd' />
        </Modal>
      </div>
    );
  }
}

export default Administrators;

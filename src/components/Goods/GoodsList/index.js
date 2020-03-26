import React, { Component } from 'react';
import {Card,Table,Popconfirm,Button,Tag, message,Pagination,Spin} from 'antd';
import goodsApi from '../../../api/goods';
let rootPath = 'http://47.95.207.1:3000'
class Goods extends Component {
  state = {
    dataSource:[],
    visible:false,
    spinning:false,
    count:0,
    page:1,
    pageSize:5,
    columns : [
      {title: '_id',dataIndex: '_id',key: '_id',width:120,fixed:'left'},
      {title: '名称',dataIndex: 'name',key: 'name',width:120},
      {title: '库存',dataIndex: 'stock',key: 'stock',width:80},
      {title: '价格',dataIndex: 'price',key: 'price',width:120},
      {title: '类别',dataIndex: 'kind',key: 'kind',width:80,render(kind){
        console.log(kind)
        return (
          <div>{kind?kind.kindName:'暂未分类'}</div>
        )
      }},
      {title: '缩略图',dataIndex: 'path',key: 'path',render(path){
        return(<img width ='150' height='80'src={rootPath+path}/>)
      },width:150},
      {title: '描述',dataIndex: 'desc',key: 'desc',width:200},
      {title: '单位',dataIndex: 'unit',key: 'unit',width:80},
      {title: '状态',dataIndex: 'putaway',key: 'putaway',width:120,
      render(putaway){
        // console.log(putaway)
        let obj={'-1':{color:'red',msg:'已下架'},'0':{color:'yellow',msg:'未上架'},'1':{color:'green',msg:'已上架'}}
        return(<Tag color={obj[putaway]?obj[putaway].color:''}>{obj[putaway]?obj[putaway].msg:''}</Tag>)  
      }
      },
      {
        title: '操作',
        fixed:'right',
        width:120,
        render:(h)=>{
          // console.log(h)
          return (
            <div>
              <Button type='primary' size='small' onClick={()=>{
                this.goEdit(h._id)
                // this.props.history.push({pathname:'/admin/goodsedit',state:h._id})
              }}>修改</Button>
              <Button type='default' size='small' onClick={()=>{ this.goodsPutaway(h._id,h.putaway)}}>上/下架</Button>
              <Popconfirm placement="topRight" title='确认删除吗，操作后无法撤回' onConfirm={()=>{this.goodsDel(h._id)}} okText="确认" cancelText="取消">
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>
              {/* <Button type='danger' size='small' onClick={()=>{
                this.goodsDel(h._id)
              }}>删除</Button> */}
            </div>
          )
        }
      },
    ]
  }
  // 商品上架
  goodsPutaway = async (id,putaway) =>{
    console.log(putaway)
    // 切换商品上下架 的状态值
    if(putaway === 0 || putaway === -1){
      putaway = 1
    }else{
      putaway = -1
    }
    console.log(putaway)
    let result = await goodsApi.putaway(id,putaway)
    console.log(result)
    if(result.code===0){
      message.success(result.msg)
      this.refreshList()   
    }else{
      message.error(result.msg)
    }
  }
  goodsDel = async (id)=>{  //删除  接收id
    
    let result = await goodsApi.goodsDel(id)
    console.log(result)
    if(result.code===0){
      message.success(result.msg)
      this.refreshList()   
    }else{
      message.error(result.msg)
    }
  }
  goEdit = async (id) =>{ //跳转至修改页
    this.props.history.push({pathname:'/admin/goodsedit',state:id})
  }
  // 刷新列表
  refreshList = async () =>{
    this.setState({spinning:true})
    let {page,pageSize} = this.state
    let result = await goodsApi.getList(page,pageSize)  
    console.log(result.list)
    this.setState({dataSource:result.list,count:result.count,spinning:false})
  }
  
  componentDidMount(){
    this.refreshList()
  }
  
  render() {
    let {dataSource,columns,count,page,pageSize,spinning} = this.state
    // console.log(count)
    return (
      <div> 
        <Spin spinning={spinning}>
          <Card title='商品列表'>
            <Button type='primary' size='middle' onClick={()=>{
              this.props.history.push('/admin/goodsadd')
            }}>商品添加</Button>
            <Table dataSource={dataSource} columns={columns} rowKey='_id' scroll={ {y:450,x:800} } pagination={false}></Table>
            {/* 分页器 */}
            <Pagination defaultCurrent={page} total={count} pageSize={pageSize} showQuickJumper 
              onChange={(page,pageSize)=>{
                // 页码发生改变就触发
                this.setState({page},()=>{
                  this.refreshList()
                })
              }}
            >

            </Pagination>
          </Card>
          
        </Spin>
      </div>
    );
  }
}

export default Goods;

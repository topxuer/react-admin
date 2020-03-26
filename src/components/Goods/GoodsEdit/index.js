import React, { Component } from 'react';
import {Card, Button,message} from 'antd';
import goodsApi from '../../../api/goods';
import uploadApi from '../../../api/upload';
import serverIp from '../../../config/index';

class GoodsEdit extends Component {
  state={
    "name":"",
    "desc":'hhhhh',
    "path":"",
    "link":"http://www.baidu.com",
    "stock":0,
    "kind":'',
    'types':[],
    "putaway":0,
    "price":0,
    "unit":"" ,
  }
  GoodsEdit = async () =>{  //修改
    let {path} = this.state
    if(!path){
      message.info("请上传图片")
      return
    }
    let id = this.props.location.state
    console.log(this.state.kind)
    let result = await goodsApi.goodsEdit(id,this.state)
    // console.log(result)
    if(result.code===0){
      message.success(result.msg)
      this.props.history.push('/admin/goodslist')
    }else{
      message.error(result.msg)
    }
  }
  imgUpload = async () =>{  //上传图片
    // console.log(this.refs)
    let file = this.refs.img.files[0]
    let size = file.size
    if(size>1024*1024){  //1kb = 1024byte 字节 1mb = 1024kb
      message.info('图片尺寸不能超过1M')
      return
    }
     // 将图片转化为formdata 
    let formData = new FormData()
    formData.append("hehe",file)
    let result = await uploadApi.imgUpload(formData)
    let {path} = result  //解构出 上传时生成的路径
    this.setState({path})
    console.log(path,result)
  }
  getKindList = async ()=>{  //获取种类列表
    let result = await goodsApi.kindList()
    // console.log(result.list)
    this.setState({types:result.list})
  }
  async componentDidMount(){
    // console.log(this)
    this.getKindList()
    let id = this.props.location.state
    let result = await goodsApi.findOne(id)
    console.log(result)
    let {code,info} = result   //info 根据id得到的商品数据
    console.log(info[0])
    this.setState({...info[0]})
    // console.log(this.state.kind)
  }
  render() {
    let {name,desc,path,link,price,stock,putaway,unit,kind,types} = this.state
    return (
      <div>  
        <Card title="商品修改">
          名称：<input value={name} onChange={(e)=>{
            // console.log(e.target.value)
            this.setState({name:e.target.value})
          }}/><br/>
          描述：<input value={desc} onChange={(e)=>{
            this.setState({desc:e.target.value})
          }}/><br/>
          链接：<input value={link} onChange={(e)=>{
            this.setState({link:e.target.value})
          }}/><br/>
          库存：<input value={stock} onChange={(e)=>{
            this.setState({stock:e.target.value})
          }}/><br/>
          价格：<input value={price} onChange={(e)=>{
            this.setState({price:e.target.value})
          }} /><br/>
          种类：
          <select value={kind} onChange={(e)=>{
            console.log(kind)
            console.log(e.target.value)
            let val = e.target.value
            this.setState({kind:val},()=>{
              console.log(kind)
            })
            console.log(kind)
          }}>
            {types.map((item)=>{
              return (
                <option value={item._id} key={item._id}>{item.kindName}</option>
              )
            })}
          </select>
          <br/>
          缩略图：<input type='file' ref='img' />
          <Button type='primary' onClick={this.imgUpload}>上传图片</Button>
          <img width='50' height='50' src={serverIp.rootPath+path}/>
          <br/>
          单位：<input value={unit} onChange={(e)=>{
            this.setState({unit:e.target.value})
          }}/><br/>
          状态：
          <select value={putaway}  onChange={(e)=>{
            this.setState({putaway:e.target.value})}}
            >
              <option value='0'>未上架</option>
              <option value='1'>已上架</option>
              <option value='-1'>已下架</option>
          </select>
          <br/>
          
          <Button type='primary' size='middle' onClick={this.GoodsEdit}>确认修改</Button>
        </Card>
      </div>
    );
  }
}

export default GoodsEdit;

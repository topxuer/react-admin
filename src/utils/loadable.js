import React from 'react';
import LoadAble from 'react-loadable';
// import {Spin} from 'antd'; //用作过度组件
function Load (){
  return (
    <div style={{background:'pink',position:'fixed',top:0,bottom:0,left:0,right:0}}>加载中</div>
  )
}
export default (LoadComponent)=>{
  return LoadAble ({
    loader:LoadComponent,
    loading:Load
  })
}

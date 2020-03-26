import axios from '../utils/axios'

class Goods {
  getList(page=1,pageSize=2){  //获取商品列表
    let url = '/xuer/goods'
    return axios.get(url,{params:{page,pageSize}})
  }
  putaway(id,putaway){  //上架
    let url = `/xuer/goods/${id}/putaway`
    return axios.put(url,{putaway})
  }
  goodsAdd(params){  //添加
    let url = '/xuer/goods'
    return axios.post(url,params)
  }
  findOne(id){
    let url ='/xuer/goods/'+id
    return axios.get(url)
  }
  goodsEdit(id,payload){  //修改
    let url = `/xuer/goods/${id}`
    return axios.put(url,payload)
  }
  goodsDel(id){  //删除
    let url = `/xuer/goods/${id}`
    return axios.delete(url)
  }
  kindList(){
    let url = '/xuer/kind'
    return axios.get(url)
  }
}

export default new Goods()
import axios from '../utils/axios'

class Admin {
  login({userName,passWord}){  //登录
    let url = '/xuer/admin/login'
    return axios.post(url,{userName,passWord})
  }
  getList(){  //管理员列表
    let url = '/xuer/admin'
    return axios.get(url)
  }
  add({userName,passWord}){  //增加管理员
    let url = '/xuer/admin'
    return axios.post(url,{userName,passWord})
  }
  del(id){  //删除管理员
    let url = `/xuer/admin/${id}`
    return axios.delete(url)
  }
}

export default new Admin()
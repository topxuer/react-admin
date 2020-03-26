import axios from '../utils/axios'

class Upload {
  imgUpload(params){
    let url = '/xuer/upload'
    return axios.post(url,params)
  }
}
export default new Upload
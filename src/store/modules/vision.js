import { requestVision } from '../../request/axios.enterprise'


// 企業視界
// (企业视界:t_horizon,发展历程:t_dev_path," +\n "照片墙:t_photo_wall,产品服务:t_product_service,资质信息:t_qa_info)
const state = {
  t_horizon:[],
  t_company:{},
  t_dev_path:[],
  t_photo_wall:[],
  t_product_service:[],
  t_qa_info:[],
}
const getters = {

}
const mutations = {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = null ;
      state[i] = payload[i] ;
    }
  }
}
const actions = {
  requestVision({commit,state},{tableName,page_size=10,page_num=1,companyId,isPass}){
    requestVision({tableName,page_num,page_size,companyId,isPass})
      .then(res=>{
        commit('changeKey',{
          [tableName]:res.data.list
        })
      })
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
}
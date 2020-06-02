import {
  requesetGetCompanyDetail,
  requestGetGrade,
  scorePortrait,
} from '../../request/axios.credit'

import { 
  requestVision,
  requestDeleteVision,
  requestGetBasicInfo,
} from '../../request/axios.enterprise'


import { 
  getCompanyInfo,
  getAtrribute
} from '../../request/axios.company'
const state = {

  title:'My Enterprises',

  // 修改信息----企业视界
// (企业视界:t_horizon,发展历程:t_dev_path," +\n "照片墙:t_photo_wall,产品服务:t_product_service,资质信息:t_qa_info)

  editDetailInfo:{
    t_horizon:[],
    t_dev_path:[],
    t_photo_wall:[],
    t_product_service:[],
    t_qa_info:[],
  },

  addDetailInfo:{
    t_qa_info:{},//資質信息--修改/添加
    t_photo_wall:{},//照片墻--修改/添加
  },

  riskStatus: {},//风险状况
  currentScore: {},//当前评分
  differScore: {},//较上次评分增加

  // 信用信息
  gradeInfo:{

  },
  
  //我关注的企业
  companyListFocus:[

  ],
  
  // companyDetailForEdit:{
  //   phone:'',//電話號碼
  //   website:'',//網址
  //   fax:'',//傳真
  //   info:'',//企業概況
  // },

  // 基本信息
  eci:{
    company:{},//
    companyAttribute:{},//郵箱網址等信息

    branchs:[],//分支机构
    changes:[],//工商变更记录
    partners:[],//股东
    
    employees:[],//
    opExceptions:[],//异常经营
  },

  // 修改基本信息
  basicInfo:{

  }

}
const getters = {
  company(state){
    return state.eci.company
  }
}
const mutations = {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = null ;
      state[i] = payload[i] ;
    }
    //console.log(state)
  },
  changeKeyVision(state,payload){
    const editDetailInfo = Object.assign({},state.editDetailInfo,payload) ;
    state.editDetailInfo = editDetailInfo ;
  },
  changeKeyVisionAdd(state,payload){
    const addDetailInfo = Object.assign({},state.addDetailInfo,payload) ;
    state.addDetailInfo = null ; 
    state.addDetailInfo = addDetailInfo ;
  },
  clearDetail(state){
    state.eci = {
      company:{},//

      companyAttribute:{},
  
      branchs:[],//分支机构
      changes:[],//工商变更记录
      partners:[],//股东
      
      employees:[],//
      opExceptions:[],//异常经营
    };
    
  }
}
const actions = {
  changeTitle({commit},title){
    commit('changeKey',{title})
  },
  requesetGetCompanyDetail({rootState,state,commit,dispatch},id){
    return new Promise((resolve,reject)=>{

      getAtrribute(id)
      .then(res=>{
        // console.log(res.data)
        commit('changeKey',res.data[rootState.lan])
        dispatch('requestGetGrade',res.data.zh.eci.company.companyName)
        resolve(res)
      })
      .catch(()=>{
        commit('clearDetail')
      })

    })
  },
  //风险状况
  scorePortrait({state, getters, commit, rootState}, option) {
      console.log(option)
      return scorePortrait(option).then(res=>{
          commit('changeKey', {
              riskStatus: res.data.data.riskNum,
              currentScore: res.data.data.companyScore,
              differScore: res.data.data.differScore
          })
      })
  },
  // 獲取信用等級
  requestGetGrade({commit},name){
    requestGetGrade({
      name
    })
    .then(res=>{
      console.log(res)
      commit('changeKey',{
        gradeInfo:res.data?res.data:''
      })
    })
  },
  // 获取企业个性化信息
  requestVision({commit,state},{tableName,companyId,page_size=10,page_num=1}){
    return new Promise((resolve,reject)=>{

      requestVision({tableName,page_num,page_size,companyId})
      .then(res=>{
        commit('changeKeyVision',{
          [tableName]:res.data.list
        })
        resolve()
      })
      .catch(()=>{
        reject()
      })
    })
  },
  // 刪除企業個性化xinxi
  requestDeleteVision({commit,state,dispatch},{tableName,id,companyId}){
    requestDeleteVision({
      tableName,
      id,
      companyId
    })
    .then(res=>{
      Vue.$toast.success('Success');
      dispatch('requestVision',{tableName})
    })
  },
  // 获取basic信息
  requestGetBasicInfo({commit},data){
    requestGetBasicInfo(data)
      .then(res=>{
        if(res.data){
          commit('changeKey',{
            basicInfo:res.data
          })
        }
      })
      .catch(err=>{
        console.log(err)
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
// import {
//   requestGetMyCompanyDetail
// } from '../../request/axios.enterprise'

const state = {
  identify:{
    addressEn:'',
    addressCn:'',
    bankAccountName:'',//开户名
    bankName:'',//开户银行
    bankNo:'',//开户行号
    certificationImg:'',//营业执照
    companyId:'',
    companyNameCn:'',
    companyNameEn:'',
    corporateAccount:'',//对公账号
    creditCode:'',//企业信用码
    email:'',
    operName:'',
    uid:'',//当前用户名
    website:'',

    
  },
  
  licenseList:[
    // {
    //   fileId: "f2f4481e18594d6080e105e01d6fbbdc",
    //   fileName: "下载 (1).png",
    //   fileType: "png",
    //   hash: "64b39e622dce58a3a089895ef3b74cbe",
    //   isCreateIndex: 0,
    //   size: 956104,

    // }
  ],


  // info:{
  //   addressEn:'',
  //   addressCn:'',
  //   bankAccountName:'',
  //   bankName:'',
  //   bankNo:'',
  //   companyCardCn:'',
  //   companyCardEn:'',
  //   companyNameCn:'',
  //   companyNameEn:'',
  //   corporateAccount:'',
  //   createTime:'',
  //   creditCode:'',
  //   email:'',
  //   operName:'',
  //   updateTime:'',
  //   website:'',
  // },

  step:0,
}
const getters = {

}
const mutations = {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = null ;
      state[i] = payload[i] ;
    }
  },
  changeIdentify(state,payload){
    for(let i in payload){
      state.identify[i] = null;
      state.identify[i] = payload[i];
    }
  }
}
const actions = {
  
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
}
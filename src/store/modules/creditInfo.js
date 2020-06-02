const state = {
  isToggle:false,
  // isVisibleKeywordsAll:false,//是否显示全部类别 
  title:'',
  riskStatus: {},//风险状况
  currentScore: {},//当前评分
  differScore: {},//较上次评分增加
  // 信用评级
  gradeInfo:{
    // grade页面
    data:{
      // qualratingnm:'R0',//信用评级
    },
    qualratingnm:'R0',//信用评级
    comppdratio:0,//违约概率
    ratingdes:'',//对应的等级说明
    
  },
  gradeInfoData:{},//新接口信用等级
  riskEvaluation:{
    industry:'',
    area:'',
  },////信用评价
}
const getters = {
  qualratingnmNum(state){
     //console.log(state)
     return state.gradeInfo? state.gradeInfo.qualratingnm : 'No data'
  }
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

}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
}
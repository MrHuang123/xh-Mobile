const state = {
  
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

}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions,
}
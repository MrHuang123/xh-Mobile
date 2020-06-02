export default {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = null ;
      state[i] = payload[i]
    }
  },
  updateToken(state,payload){
    Cookies.set('access_token', payload||'', {domain: window.config.domain, expires: 15});
    state.access_token = payload
  },
  updateWxShareTitle(state,payload){
    state.wxShareTitle = ''
    var wxShareTitle = payload.wxShareTitle?payload.wxShareTitle:'Welcome to Xinhua Credit'
    state.wxShareTitle = payload.wxShareTitle;
    var wxShareDesc = payload.wxShareDesc?payload.wxShareDesc:'Credit inquiry and release platform.'
    state.wxShareDesc = wxShareDesc
  },
  setIsInter(state,isInter){
    state.isInter =isInter;
  }
}
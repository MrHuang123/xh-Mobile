import {
  requestBanks,
  requestProvinces,
  requestCitys,
} from '../request/axios.common'
import { getCodeConfig,getWxSign } from '*/request/axios.common.js'
export default {
  // 获取所有银行
  requestBanks({commit}){
    requestBanks()
      .then(res=>{
        res.data.length && ( localStorage.banks = JSON.stringify(res.data) )
        commit('changeKey',{
          banks:res.data
        })
      })
      .catch(()=>{
        // console.log('exsited banks')
      })
  },
  // 获取省份
  requestProvinces({commit}){
    requestProvinces()
      .then(res=>{

        res.data.length && ( localStorage.provinces = JSON.stringify(res.data) )

        commit('changeKey',{
          provinces:res.data
        })
      })
      .catch(()=>{
        // console.log('exsited provinces')
      })
  },
  // 所有城市
  requestCitys({commit}){
    requestCitys()
      .then(res=>{

        res.data.length && ( localStorage.citys = JSON.stringify(res.data) )

        commit('changeKey',{
          citys:res.data
        })
      })
      .catch(()=>{
        // console.log('exsited citys')
      })
  },
  // 微信分享
  setWxShare({ state, getters, commit, rootState },option){
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin) {
      return false;
    }

    
    const origin = 'https://em.credit100.com';
    const img = `${origin}/static/xhxyLOGO.png`;
    var title = !!option&&option.wxShareTitle?option.wxShareTitle:'Welcome to Xinhua Credit';
    var desc = !!option&&option.wxShareDesc?option.wxShareDesc:'Credit inquiry and release platform.';
    //默认的分享信息
    var shareData = {
      title,
      desc,
      link: window.location.href,
      imgUrl: img,
    }
    getWxSign({
      url: window.location.href
    })
    .then(res=>{
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'onMenuShareWeibo', // 分享到微博
            'updateAppMessageShareData', // 转发给微信、qq
            'updateTimelineShareData', // 分享至朋友圈、qq空间
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ'
          ]
        });
        wx.ready(() => {
          wx.updateAppMessageShareData(shareData);
          wx.updateTimelineShareData(shareData);
          //电脑端分享
          wx.onMenuShareWeibo(shareData);
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareQQ(shareData)
        });
      
    })
  },
}
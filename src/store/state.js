export default {
  height:window.innerHeight,//浏览器高度
  width:window.innerWidth,
  timeStamp:Date.now(),//当前时间戳
  isChrome:navigator.userAgent.includes('Chrome'),//是否谷歌
  isIe:navigator.userAgent.includes('Trident'),//是否IE
  zIndex:10,//默认header权重
  access_token: Cookies.get('access_token') || localStorage.access_token || '',//用户token
  appId:"xinhua",//(平台标识xinhua) 
  userId:"TR0001",//(上传者用户ID)

  lan:'en',

  provinces:localStorage.provinces && JSON.parse(localStorage.provinces),//省份
  citys:localStorage.citys && JSON.parse(localStorage.citys),//城市
  banks:localStorage.banks && JSON.parse(localStorage.banks),//银行

  wxShareTitle:'Welcome to Xinhua Credit',
  wxShareDesc:'Credit inquiry and release platform.' ,
  isInter:false
}
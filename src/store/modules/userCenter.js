import { 
    // getUserInfo ,
    getUserCenterUserInfo,
    myCompanyList,
    focusCompanyList,
    myAuthentication,
    updateNickName,
    userInfoUpdate
} from '../../request/axios.userCenter.js';
import { 
    localUpload,
} from '../../request/axios.common.js';
import pattern from '../../utils/pattern.js';
import isCard from '../../utils/verifyCard.js'
const state = {
    userInfo:JSON.parse(sessionStorage.getItem(`userInfo`))||{},
    ucenterUserInfo:{},
    companyList:[],
    certification:{
        name:'',
        cardNum:'',
    },
    feedback:{//反馈消息
        feedbackName:'',//反馈人姓名
        feedbackPhone:'',//反馈人手机号
        text:'',//反馈类型
        feedbackType:'',//反馈类型
        licenseList:[],
    },
  }
  const getters = {
  
  }
  const mutations = {
    changeFeedback(state,payload){
        for(let i in payload){
          state.feedback[i] = null;
          state.feedback[i] = payload[i];
        }
    },
    //修改地址
    changeAdress(state,payload){
        state.ucenterUserInfo.address = payload
    },
    // getUserInfo(state,payload){
    //     sessionStorage.setItem(`userInfo`, JSON.stringify(payload))
    //     state.userInfo = payload;
    //   },
    updateUserCenterUserInfo(state,payload){
        state.ucenterUserInfo = {}
        state.ucenterUserInfo = payload;
    },
    myCompanyList(state,payload){
        state.companyList = payload;
    },
  }
  const actions = {
      //用户信息修改
      userInfoUpdate({ state, getters, commit, rootState }, option){
        //   console.log(option)
          return new Promise((resolve,reject)=>{
            userInfoUpdate(option).then(res =>{
                // console.log(res)
                if(res.code == 200){
                    resolve(res)
                }
            }).catch(()=>{
            
            })
          })
      },
      //修改昵称
      updateNickName({ state, getters, commit, rootState }, option){
        // console.log(option)
        return new Promise((resolve, reject)=>{
            updateNickName({
                access_token:option.access_token,
                nickName:option.nickName
            }).then(res =>{
                // console.log(res.data)
                if(res.code == 200){
                    resolve()
                }
            }).catch(()=>{
            
            })
        })
      },
      //文件服务器上传接口
      localUpload({ state, getters, commit, rootState }, option){
        // console.log(option)
        return new Promise((resolve, reject)=>{
            var data = {
                appId:option.appId, 
                userId:option.userId,
                fileName:option.fileName,
                file:option.file
            }
            const fd = new FormData();
            fd.append('file',data.file);
            fd.append('appId',data.appId);
            fd.append('userId',data.userId);
            fd.append('fileName',data.fileName);
            localUpload(fd).then(res =>{
                if(res.code == 0){
                    resolve(res.data)
                }
            }).catch((res)=>{
                // console.log(res)
                if(res.code == 0){
                   
                    resolve(res.data)
                }
            })
        }).catch(err=>{
            // console.log(err);
            reject()
          });
      },
     //获取用户信息
    //  getUserInfo({ state, getters, commit, rootState }, option){
    //      console.log(option),
    //      getUserInfo({
    //         access_token:option
    //      }).then(res =>{
    //          console.log(res.data)
    //          if(res.data.code == 200){
    //             commit('getUserInfo', res.data.data)
    //          }
    //      }).catch(()=>{
            
    //     })
    //  },
     //用户名片数据
     getUserCenterUserInfo({ state, getters, commit, rootState }, option){
        return new Promise((resolve, reject) =>{
            getUserCenterUserInfo().then(res =>{
                //  console.log(res)
                 if(res.code == 200){
                    commit('updateUserCenterUserInfo', res.data)
                    resolve(res)
                 }
             }).catch((err)=>{
                console.log(err)
                reject()
              })
        }).catch(()=>{
                
        })
     },
     //我的企业列表
     myCompanyList({ state, getters, commit, rootState }, option){
        myCompanyList({
            access_token:option.access_token,
            currentPage:option.currentPage,
            pageSize:option.pageSize,
        }).then(res =>{
            if(res.data.code == 200){
                commit('myCompanyList', res.data.data.list)
            }
        }).catch(()=>{
            
          })
     },
     //我关注的企业
     focusCompanyList({ state, getters, commit, rootState }, option){
        // console.log(option);
        return new Promise((resolve, reject)=>{
            focusCompanyList({
                access_token:option.access_token,
                currentPage:option.currentPage,
                pageSize:option.pageSize,
            }).then(res =>{
                // console.log(res.data)
                if(res.code == 200){
                    
                    resolve(res.data)
                }
            }).catch(()=>{
            
            })
        })
     },
     //个人认证
     myAuthentication({ state, getters, commit, rootState }, option){
        // console.log(option)
        return new Promise((resolve, reject) => {
            if(!option.name){
                Vue.prototype.$toast('Please enter your real name')
                return false;
            }
            if(option.cardType == 1){
                if(!option.cardNum){
                    Vue.prototype.$toast('Please enter your id number')
                    return false;
                }
                if(!pattern.passportNum.test(option.cardNum)){
                    Vue.prototype.$toast('Please enter your id card number in the correct format')
                    return false;
                }
                if(!isCard(option.cardNum)){
                    Vue.prototype.$toast('Please enter your id card number in the correct format')
                    return false;
                }
                if(!option.positive){
                    Vue.prototype.$toast('Please upload the front photo of your id card')
                    return false;
                }
                if(!option.reverse){
                    Vue.prototype.$toast('Please upload the reverse photo of your id card')
                    return false;
                }
            }else{
                if(!option.cardNum){
                    Vue.prototype.$toast('Please enter your passport number')
                    return false;
                }
                if(!pattern.passportNum.test(option.cardNum)){
                    Vue.prototype.$toast('Please enter your passport number in the correct format')
                    return false;
                }
                if(!option.positive){
                    Vue.prototype.$toast('Please upload the home page of passport')
                    return false;
                }
                if(!option.reverse){
                    Vue.prototype.$toast('Please upload the last page of passport')
                    return false;
                }
            }
            myAuthentication({
                access_token:option.access_token,
                cardNum:option.cardNum,
                cardType:option.cardType,
                name:option.name,
                positive:option.positive,
                reverse:option.reverse,
            }).then(res => {
                // console.log(res)
                if(res.code == 200){
                    resolve(res.data)
                }
            }).catch(()=>{
            
            })
            
        }).catch(()=>{
            
        })
     },
  }
  
  export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
  }
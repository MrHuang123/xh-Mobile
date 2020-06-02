
import { 
    msgList,
    msgInfo,
    userCardInfoById,
    userCardImgByMsgId,
    msgDelete,
    getReceive,
    getBusinessCardsSent,
    updateReceiveState,
    msgReceiveDelete,
    msgSendDelete,
} from '../../request/axios.notificationCenter.js';
const state = {
    
  }
  const getters = {
  
  }
  const mutations = {
    
  }
  const actions = {
      //删除发送的名片
      msgSendDelete({ state, getters, commit, rootState }, option){
        return new Promise((resolve,reject)=>{
            msgSendDelete(option).then(res=>{
                if(res.code==200){
                    resolve(res)
                }
            }).catch(()=>{
            
            })
        }).catch(()=>{
            
        })
    },
    //删除收到的名片
    msgReceiveDelete({ state, getters, commit, rootState }, option){
        return new Promise((resolve,reject)=>{
            msgReceiveDelete(option).then(res=>{
                if(res.code==200){
                    resolve(res)
                }
            }).catch(()=>{
            
            })
        }).catch(()=>{
            
        })
    },
    //修改收到名片已读状态
    updateReceiveState({ state, getters, commit, rootState }, option){
        return new Promise((resolve,reject)=>{
            updateReceiveState(option).then(res=>{
                if(res.code == 200){
                    resolve(res)
                }
            }).catch(()=>{
            
            })
        }).catch(()=>{
            
        })
    },
    //已发送名片
    getBusinessCardsSent({ state, getters, commit, rootState }, option){
      return new Promise((resolve,reject)=>{
          getBusinessCardsSent(option).then(res=>{
              resolve(res)
          }).catch(()=>{
          
          })
      }).catch(()=>{
          
      })
  },
  //我收到的名片
   getReceive({ state, getters, commit, rootState }, option){
      return new Promise((resolve,reject)=>{
          getReceive(option).then(res=>{
              if(res.code == 200){
                  resolve(res)
              }
          }).catch(()=>{
          
          })
      }).catch(()=>{
          
      })
   },
    //删除消息
    msgDelete({ state, getters, commit, rootState }, option){
      return new Promise((resolve, reject)=>{
        msgDelete({
          id:option
        }).then(res =>{
           if(res.code == 200){
            resolve()
           }
        }).catch(()=>{
        
        })
      }).catch(()=>{
        
      })
    },
    //用户名片图片
    userCardImgByMsgId({ state, getters, commit, rootState }, option){
      var downloadElement = document.createElement('a');
      // var href = `${window.config.api}/ucenter/userCardImgByMsgId?access_token=${localStorage.access_token}&id=${option}`; 
      window.location.href = `${window.config.api}/ucenter/userCardImgByMsgId?access_token=${localStorage.access_token}&id=${option}`; //创建下载的链接
  // 　　downloadElement.href = href;
  // 　　document.body.appendChild(downloadElement);
  // 　　downloadElement.click(); //点击下载
  // 　　document.body.removeChild(downloadElement); //下载完成移除元素
  // 　　window.URL.revokeObjectURL(href); //释放掉blob对象
    },
    //消息详情
    msgInfo({ state, getters, commit, rootState }, option){
      // console.log(option)
      return new Promise((resolve, reject) => {
        msgInfo({
          id:option
        }).then(res =>{
            // console.log(res.data)
            if(res.code == 200){
              resolve(res.data)
            }
        })
      })
    },
    //我的消息列表
    msgList({ state, getters, commit, rootState }, option){
        return new Promise((resolve, reject) => {
          msgList({
                access_token:option.access_token,
                currentPage:option.currentPage,
                pageSize:option.pageSize,
                type:option.type
            }).then(res => {
                // console.log(res)
                if(res.code == 200){
                    resolve(res.data)
                }
            }).catch(()=>{
                reject()
              })
            
        }).catch(err=>{
            // console.log(err);
          });
    },
    userCardInfoById({ state, getters, commit, rootState }, option){
      return new Promise((resolve, reject)=>{
        userCardInfoById({
          id:option
        }).then(res=>{
            resolve(res)
        }).catch(()=>{
          reject()
        })
      }).catch(()=>{
        
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
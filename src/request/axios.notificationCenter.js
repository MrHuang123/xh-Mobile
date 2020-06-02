import axios from './axios'

/********************************** 我的消息模块(企业互动) *******************************************/
//修改未读状态
export const updateReceiveState = data => {
  return axios({
    url:'/ucenter/updateState',
    data
  })
}
//删除发送的名片
export const msgSendDelete = data => {
  return axios({
    url:'/ucenter/msgSendDelete',
    data
  })
}
//删除收到的名片
export const msgReceiveDelete = data => {
  return axios({
    url:'/ucenter/msgReceiveDelete',
    data
  })
}
//收到得名片
export const getReceive = data => {
  return axios({
    url:'/ucenter/getReceive',
    data
  })
}
//已发送名片
export const getBusinessCardsSent = data => {
  return axios({
    url:'/ucenter/getBusinessCardsSent',
    data
  })
}
/**
   * 我的消息列表
   * @param {
   *  access_token用户令牌
   *  currentPage 当前页码默认1
   *  pageSize 每页显示多少条默认10
   *  type  类型：1递名片，2.合作
   * }
   */
  export const msgList = params => {
    return axios({
        url:'/ucenter/msgList?isLoading=1',
        data:params
      })
} 
/**
   * 消息详情
   * @param {
   *   id 消息ID
   * }
   */
  export const msgInfo = params => {
    return axios({
        url:'/ucenter/msgInfo',
        data:params
      })
} 
/**
   * 用户名片数据
   * @param {
   *   access_token 用户令牌
   *   id 消息ID
   * }
   */
  export const userCardInfoById = params => {
    return axios({
        url:'/ucenter/userCardInfoById',
        data:params
      })
} 
/**
   * 用户名片图片
   * @param {
   *   access_token 用户令牌
   *   id 消息ID
   * }
   */
  export const userCardImgByMsgId = params => {
    return axios.get('/ucenter/userCardImgByMsgId',{params})
} 
/**
   * 我的消息删除
   * @param {
   *   access_token 用户令牌
   *   id 消息ID
   * }
   */
  export const msgDelete = params => {
    return axios({
      url:'/ucenter/msgDelete',
      data:params
    })
} 
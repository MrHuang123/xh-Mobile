import axios from './axios.js';

//意见反馈接口
//PUserId 
// backContent 提交内容
// contactName 联系人姓名
// customerType 
//  feedbackType 反馈类型 0：问题反馈 1：投诉 2：数据错误 3：其他
//  phone 手机号
// 
export const contactCustomer = data => {
    return axios({
      url:'/xhsRest/contactCustomer?isLoading=1',
      data:data
    })
  } 
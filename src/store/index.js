import state from './state.js';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

import notificationCenter from './modules/notificationCenter'
import account from './modules/account'
import creditInfo from './modules/creditInfo'
import creditEnterprise from './modules/creditEnterprise'
import enterDetail from './modules/enterDetai'
import enterIdentify from './modules/enterIdentify'
import userCenter from './modules/userCenter'
import vision from './modules/vision'

// store入口js

export default {
  state,
  actions,
  mutations,
  getters,
  modules:{
    account,
    creditInfo,
    userCenter,
    notificationCenter,
    creditEnterprise,
    enterDetail,
    enterIdentify,
    userCenter,
    vision
  }
}
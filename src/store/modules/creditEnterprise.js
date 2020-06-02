import { requesetGetCompanyDetail } from '*/request/axios.credit.js'
import {
  getPartner,
  getBranch,
  getChange,
  getOpexception,

  getSoftwareCopyrights,
  getWebsites,
  getCopyrights,
  getCertification,
  getPatentDetail,
  getTmInfo,

  getTaxes,
  getFinancing,
  getInvest,
  getLiquidation,
  getMpledge,
  getPenalty,
  getPledge,
  getProduct,
  getRecruit,
  getSpotcheck,


  getCase,
  getCourts,
  getShixin,
  getZhixing,

} from '../../request/axios.company'

const state = {
  title:'',
  // 基本信息
  eci:{
    company:{},//
    companyAttribute:{},//网址、等数据
    industry:{},//行业信息

    branchs:[],//分支机构
    scope:[],
    changes:[],//工商变更记录
    partners:[],//股东
    
    employees:[],//主要人员
    opExceptions:[],//异常经营
  },
  // 知識產權信息
  eciAsset:{
    certifications:[],
    copyrights:[],
    patentDetails:[],
    softwareCopyrightses:[],
    tmInfos:[],
    websites:[]
  },
  // 司法信息
  law:{
    cases:[],
    chinaCourts:[],
    shiXins:[],
    zhiXings:[]
  },


  // 經營狀況+经营风险
  eciOperation:{
    financingTaxes:[],
    financings:[],
    mpledges:[],
    products:[],
    recruitInfos:[],
    spotChecks:[],
    
    pledges:[],
    liquidations:[],
    investInfos:[],//对外投资
    penaltys:[],
  },
  
  // 查看信息详情，全部为数组
  details:[
    
  ],


  scopeKey:'经营范围',

  isRequested:false,//紧紧于改造之前保留

  // vision企業視界
  stamp:new Date().getTime(),

  isBrand:'',//是否为民族品牌

  totalAllDetail:{
    partner:0,
    invest:0,
    branch:0,
    change:0,
    scope:0,
    patentDetails:0,
    softwareCopyrightses:0,
    copyrights:0,
    websites:0,
    certifications:0,
    tmInfos:0,
    debtor:0,
    dishonest:0,
    cases:0,
    chinaCourts:0,
    financings:0,
    financingTaxes:0,
    products:0,
    spotChecks:0,
    recruitInfos:0,
    mpledges:0,
    pledges:0,
    liquidations:0,
    opExceptions:0,
    penaltys:0,

  },
}
const getters = {
  scopeLength(state){
    let len = 0;
    state.eci.changes.forEach(item=>{
      item.changeName==state.scopeKey && len++ 
     }
    )

    return len;
  },
  // stamp(){
  //   return new Date().getTime()
  // }
}
const mutations = {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = null ;
      state[i] = payload[i] ;
    }
    state.stamp = new Date().getTime();
  },
  changeTotal(state,payload){
    state.totalAllDetail = Object.assign({},state.totalAllDetail,payload)
  },
  changeEci(state,payload){
    for(let i in payload){
      state.eci[i] = undefined;
      state.eci[i] = payload[i] || [];
    }
    const eci = JSON.stringify(state.eci);
    state.eci = undefined;
    state.eci = JSON.parse(eci);
    state.stamp = new Date().getTime();

  },
  changeEciasset(state,payload){
    for(let i in payload){
      state.eciAsset[i] = undefined;
      state.eciAsset[i] = payload[i] || [];
    }
    state.stamp = new Date().getTime();

  },
  changeOperation(state,payload){
    for(let i in payload){
      state.eciOperation[i] = undefined;
      state.eciOperation[i] = payload[i] || [];
    }
    state.stamp = new Date().getTime();

  },
  changeLaw(state,payload){
    for(let i in payload){
      state.law[i] = undefined;
      state.law[i] = payload[i] || [];
    }
    state.stamp = new Date().getTime();

  },
  clearDetail(state){
    // 基本信息
    state.eci={
      company:{},//
      companyAttribute:{},//网址、等数据

      branchs:[],//分支机构
      changes:[],//工商变更记录
      partners:[],//股东
      
      employees:[],//主要人员
      opExceptions:[],//异常经营
    };
    // 知識產權信息
    state.eciAsset={
      certifications:[],
      copyrights:[],
      patentDetails:[],
      softwareCopyrightses:[],
      tmInfos:[],
      websites:[]
    };
    // 司法信息
    state.law={
      cases:[],
      chinaCourts:[],
      shiXins:[],
      zhiXings:[]
    };


    // 經營狀況+经营风险
    state.eciOperation={
      financingTaxes:[],
      financings:[],
      mpledges:[],
      products:[],
      recruitInfos:[],
      spotChecks:[],
      
      pledges:[],
      liquidations:[],
      investInfos:[],//对外投资
      penaltys:[],
    };
  
    // 查看信息详情，全部为数组
    state.details=[];

  },
}
const actions = {
  // 改造完成之前暂时使用
  getCompanyDetail({commit,state,rootState},id){
    if(state.isRequested) return ;
    requesetGetCompanyDetail({id})
      .then(res=>{
        commit('changeKey',res.data[rootState.lan]);
        commit('changeKey',{isRequested:true})
      })
  },
  changeDetail({commit,state,getters},type){
    
    let list = [];

    switch (type){
      // 股东出资方
      case 'partner':
        state.eci.partners.forEach(item=>{
          list.push({
            header:item.stockName,
            list:[
              {title:'Shareholder Name',content:item.stockName},
              {title:"Amount of Contribution (RMB '0,000)",content:item.shouldCapi},
              {title:"Paid-in Amount (RMB'0,000)",content:item.realCapi},
              {title:'Date of Actual Contribution',content:item.shouldCapiDate},
              {title:'Proportion',content:item.stockPercent},
              {title:'Form of Contribution ',content:item.shouldType},
              {title:'License No. (Enterprise Code/Identification Card)',content:item.identifyNo},
            ]
          })
        })
        commit('changeKey',{
          title:'Shareholder & Investor'
        })
        break ;
      // 对外投资 
      case 'invest':
        state.eciOperation.investInfos.forEach(item=>{
          list.push({
            header:item.name,
            list:[
              {title:'Name of Investee',content:item.name},
              {title:"Registered Capital (RMB '0,000)",content:item.registCapi},
              {title:"Unified Social Credit Code (Industry and Commerce) ",content:item.creditCode},
            ]
          })
        })
        commit('changeKey',{
          title:'External Investments'
        })
        break ;
      // 分支机构
      case 'branch':
        state.eci.branchs.forEach(item=>{
          list.push({
            header:item.name,
            list:[
              // {title:'Principal',content:item.reqNo},
              {title:'branch NO.',content:item.regNo},
              {title:'Registration Authority',content:item.belongOrg},
            ]
          })
        })
        commit('changeKey',{
          title:'Branches'
        })
        break ;
      // 变更记录
      case 'change':
        state.eci.changes.forEach(item=>{
          list.push({
            list:[
              {title:'Matter',content:item.changeName},
              {title:'Before Change',content:item.beforeChange},
              {title:'After Change',content:item.afterChange},
              {title:'Date of Change ',content:item.changeDate},
            ]
          })
        })
        commit('changeKey',{
          title:'Change Records of Industrial and Commercial Registration'
        })
        break ;
      // 范围变更***进行过滤
      case 'scope':
        state.eci.scope.forEach(item=>{
          list.push({
            list:[
              {title:'Matter',content:item.changeName},
              {title:'Before Change',content:item.beforeChange},
              {title:'After Change',content:item.afterChange},
              {title:'Date of Change ',content:item.changeDate},
            ]
          })
        })
        commit('changeKey',{
          title:'Changes in Business Scope'
        })
        break ;



      // 专利信息
      case 'patentDetails':
        state.eciAsset.patentDetails.forEach(item=>{
          list.push({
            // header:title,
            list:[
              {title:'Patent Name',content:item.title},
              {title:'Publicity No.',content:item.publicationNumber},
              {title:'Patent Type',content:item.kindCodeDesc},
              {title:'Disclosure Date',content:item.legalStatusDate},
              // {title:'keyNo',content:item.keyNo},
              // {title:'publicationDate',content:item.publicationDate},
              // {title:'applicationDate',content:item.applicationDate},
              // {title:'applicationNumber',content:item.applicationNumber},
              // {title:'inventorStringList',content:item.inventorStringList},
              // {title:'assigneeStringList',content:item.assigneeStringList},
              // {title:'agent',content:item.agent},
              // {title:'agency',content:item.anency},
              // {title:'kindCode',content:item.kindCode},
            ]
          })
        })
        commit('changeKey',{
          title:'Patents'
        })
        break ;
      // 软件著作
      case 'softwareCopyrightses':
        state.eciAsset.softwareCopyrightses.forEach(item=>{
          list.push({
            // header:item.name,
            list:[
              {title:'Name',content:item.name},
              {title:'Registration No.',content:item.registerNo},
              {title:'Copyright Owner',content:item.owner},
              {title:'Registration Date',content:item.registerAperDate},
              {title:'Type of Works',content:item.category},
              {title:'Date of Publication',content:item.publishDate},
            ]
          })
        })
        commit('changeKey',{
          title:'Software Copyright'
        })
        break ;
      // 作品著作
      case 'copyrights':
        state.eciAsset.copyrights.forEach(item=>{
          list.push({
            // header:item.name,
            list:[
              {title:'Name',content:item.name},
              {title:'Registration No.',content:item.registerNo},
              {title:'Copyright Owner',content:item.owner},
              {title:'Registration Date',content:item.registerDate},
              {title:'Type of Works',content:item.category},
              {title:'Date of Publication',content:item.publishDate},

            ]
          })
        })
        commit('changeKey',{
          title:'Copyright of Works'
        })
        break ;
      // 网站信息
      case 'websites':
        state.eciAsset.websites.forEach(item=>{
          list.push({
            // header:item.name,
            list:[
              {title:'website',content:item.homeSite},
              {title:'Website Type',content:item.typeName},
              {title:'Domain Name',content:item.yuming},
              {title:'Web Registration / License No.',content:item.beian},
              {title:'Approval Date',content:item.sdate},
            ]
          })
        })
        commit('changeKey',{
          title:'Websites'
        })
        break ;
      // 证书信息
      case 'certifications':
        state.eciAsset.certifications.forEach(item=>{
          list.push({
            // header:item.name,
            list:[
              {title:'Certificate Name',content:item.name},
              {title:'Certificate No.',content:item.no},
              {title:'Date of Issue',content:item.startDate},
              {title:'Certificate Status',content:item.status},

            ]
          })
        })
        commit('changeKey',{
          title:'Certificate'
        })
        break ;
      // 商标信息
      case 'tmInfos':
        state.eciAsset.tmInfos.forEach(item=>{
          list.push({
            list:[
              {title:'Trademark Name',content:item.name},
              {title:'Logo',content:!!item.imageUrl ? '<img class="h-48" src='+item.imageUrl+' />' : null},
              {title:'Application / Registration No.',content:item.regNo},
              {title:'Date of Application',content:item.appDate},
              {title:'Name of Applicant',content:item.applicantCn},
              {title:'Trademark Type',content:item.intClsDesc},
              {title:'Trademark Status',content:filterStatue(item.status,'en')},
              // {title:'Justice Information',content:item.status},
            ]
          })
        })
        commit('changeKey',{
          title:'Trademark'
        })
        break ;



      // 被执行人信息
      case 'debtor':
        state.law.zhiXings.forEach(item=>{
          list.push({
            list:[
              {title:'Reference No.',content:item.anno},
              {title:'Court of Execution',content:item.executeGov},
              {title:'Subject of Execution',content:item.biaodi},
              {title:'Date of Filing',content:item.lianDate},
            ]
          })
        })
        commit('changeKey',{
          title:'Person Subject to Enforce'
        })
        break ;
      // 失信人信息
      case 'dishonest':
        state.law.shiXins.forEach(item=>{
          list.push({
            header:'Credit Defaulter Subject to Enforce ',
            list:[
              {title:'Case No.',content:item.anno},
              {title:'Fulfillment of Person Subject to Enforce',content:item.executeStatus},
              {title:'Obligations Specified in Legal Documents',content:item.yiwu},
              {title:'Release Date',content:item.publicdate},
            ]
          })
        })
        commit('changeKey',{
          title:'Credit Defaulter Subject to Enforce'
        })
        break ;
      // 裁判文书信息
      case 'cases':
        state.law.cases.forEach(item=>{
          list.push({
            header:'Judicial Documents',
            list:[
              {title:'Document No.',content:item.caseNo},
              {title:'Title',content:item.caseName},
              {title:'Type',content:item.caseType},
            ]
          })
        })
        commit('changeKey',{
          title:'Judicial Documents'
        })
        break ;
      // 法院公告信息
      case 'chinaCourts':
        state.law.chinaCourts.forEach(item=>{
          list.push({
            header:'Court Announcements',
            list:[
              {title:'Time of Publication',content:item.publishDate},
              {title:'Category ',content:item.category},
              {title:'Interested Parties',content:item.party},
              {title:'Contents',content:item.content},
              // {title:'State of Operation',content:item.},
            ]
          })
        })
        commit('changeKey',{
          title:'Court Announcements'
        })
        break ;


      // 融資信息
      case 'financings':
        state.eciOperation.financings.forEach(item=>{
          list.push({
            header:'Financing',
            list:[
              {title:'Date',content:item.date},
              {title:'Investor',content:item.investment},
              {title:'Level',content:item.round},
              {title:'Amount',content:item.amount},
            ]
          })
        })
        commit('changeKey',{
          title:'Financing'
        })
        break ;
      // 財務總覽信息
      case 'financingTaxes':
        state.eciOperation.financingTaxes.forEach(item=>{
          list.push({
            header:'Financial Overview',
            list:[
              {title:'Strength Level (RMB)',content:item.revenueRange},
              {title:'Taxation Range (RMB)',content:item.taxRange},
              {title:'Net Margin',content:item.netProfitMargins},
              {title:'Gross Margin',content:item.grossProfitMargins},
              {title:'Financial Year',content:item.year},
            ]
          })
        })
        commit('changeKey',{
          title:'Financial Overview'
        })
        break ;
      // 產品信息
      case 'products':
        state.eciOperation.products.forEach(item=>{
          list.push({
            header:'Products',
            list:[
              {title:'Product Picture',content:item.imageUrl ? '<img src='+item.imageUrl+' />' : null},
              {title:'Product Name',content:item.name},
              {title:'Field',content:item.domain},
              {title:'Product Introduction',content:item.description},
            ]
          })
        })
        commit('changeKey',{
          title:'Products'
        })
        break ;
      // 抽查信息
      case 'spotChecks':
        state.eciOperation.spotChecks.forEach(item=>{
          list.push({
            header:'Random Inspection',
            list:[
              {title:'Implementing Organ',content:item.executiveOrg},
            ]
          })
        })
        commit('changeKey',{
          title:'Random Inspection'
        })
        break ;
      // 招投標信息
      case 'tender':
        break ;
      // 招聘類信息
      case 'recruitInfos':
        state.eciOperation.recruitInfos.forEach(item=>{
          list.push({
            header:'Recruitment',
            list:[
              {title:'Job Title',content:item.title},
              {title:'Region',content:item.area},
              {title:'Salary',content:item.salary},
              {title:'Educational Background',content:item.education},
              {title:'Work Experience',content:item.experience},
              {title:'Job Description (Requirements)',content:item.description},
              {title:'Data Source',content:item.source},
            ]
          })
        })
        commit('changeKey',{
          title:'Recruitment'
        })
        break ;
      // 动产抵押 
      case 'mpledges':
        state.eciOperation.mpledges.forEach(item=>{
          list.push({
            header:'Pledge of Movables',
            list:[
              {title:'Registration No.',content:item.registerNo},
              {title:'Claim Secured',content:item.debtSecuredAmount},
              {title:'Status',content:item.status},
              {title:'Date of Publication',content:item.registerDate},
            ]
          })
        })
        commit('changeKey',{
          title:'Pledge of Movables'
        })
        break ;
      
      // 股权出资
      case 'pledges':
        state.eciOperation.pledges.forEach(item=>{
          list.push({
            header:'Equity Pledge',
            list:[
              {title:'Pledgor',content:item.pledgor},
              {title:'Equity Pledged',content:item.pledgedAmount},
              {title:'Pledgee',content:item.pledgee},
              {title:'License / Certificate No.',content:item.pledgorNo},
            ]
          })
        });
        commit('changeKey',{
          title:'Equity Pledge'
        })
        break ;
      // 清算信息
      case 'liquidations':
        state.eciOperation.liquidations.forEach(item=>{
          list.push({
            header:'Liquidation',
            list:[
              {title:'Leader of Liquidation Group',content:item.leader},
              {title:'Members of Liquidation Group',content:item.member},
            ]
          })
        });
        commit('changeKey',{
          title:'Liquidation'
        })
        break ;
      // 工商异常
      case 'opExceptions':
        state.eci.opExceptions.forEach(item=>{
          list.push({
            header:'List of Industrial and Commercial Exceptions',
            list:[
              {title:'Reasons for Listing',content:item.addReason},
              {title:'Date of Listing',content:item.addDate},
              {title:'Reasons for Removal',content:item.removeReason},
              {title:'Date of Removal',content:item.removeDate},
              {title:'Decision-making Unit',content:item.decisionOffice},
            ]
          })
        });
        commit('changeKey',{
          title:'List of Industrial and Commercial Exceptions'
        })
        break ;
      // 行政处罚
      case 'penaltys':
        state.eciOperation.penaltys.forEach(item=>{
          list.push({
            header:'Administrative Penalty',
            list:[
              {title:'Decision Instrument No.',content:item.docNo},
              {title:'Type of Illegal Acts',content:item.penaltyType},
              {title:'Administrative Penalty',content:item.content},
              {title:'Decision-making Unit',content:item.officeName},
              {title:'Decision-making Date',content:item.penaltyDate},
              // {title:'Decision-making Date',content:item.penaltyDate},
            ]
          })

        });
        commit('changeKey',{
          title:'Administrative Penalty'
        })
        break ;
      default :
        break ;
    };


    commit('changeKey',{details:list})
  },
  
  //ECI部分------------ 
  async getPartner({commit,state,rootState},{companyId,page,size}){
    await getPartner({companyId,page,size})
      .then(res=>{
        commit('changeEci',{
          partners:page == 1 ? res.data[rootState.lan].eci.partners||[]: [...state.eci.partners,...res.data[rootState.lan].eci.partners||[]]
        });
        commit('changeTotal',{
          partner:res.total
        });
      })
      
      return Promise.resolve(state)
  
  },
  async getBranch({commit,rootState,state},{companyId,page,size}){
    await getBranch({companyId,page,size})
      .then(res=>{
        commit('changeEci',{
          branchs:page == 1 ? res.data[rootState.lan].eci.branchs||[] : [...state.eci.branchs,...res.data[rootState.lan].eci.branchs||[]]
        });
        commit('changeTotal',{
          branch:res.total
        });
      })
      return Promise.resolve(state)
  },
  async getChange({commit,rootState,state},{companyId,page,size,type}){
    await getChange({companyId,page,size,type})
      .then(res=>{
        commit('changeEci',{
          [type?"scope":"changes"]:page == 1 ? res.data[rootState.lan].eci.changes||[] : [...state.eci[type?'scope':'changes'],...res.data[rootState.lan].eci.changes||[]]
        });
        commit('changeTotal',{
          [type?"scope":"change"]:res.total
        });
      })
    return Promise.resolve(state)
  },
  async getEmployee({commit,rootState,state},{companyId,page,size}){
    await getEmployee({companyId,page,size})
      .then(res=>{
        commit('changeEci',{
          employees:page == 1 ? res.data[rootState.lan].eci.employees||[] : [...state.eci.employees,...res.data[rootState.lan].eci.employees||[]] 
        });
        commit('changeTotal',{
          employees:res.total
        });
      })
      return Promise.resolve(state)
    
  },
  async getOpexception({commit,state,rootState},{companyId,page,size}){
    await getOpexception({companyId,page,size})
      .then(res=>{
        commit('changeEci',{
          opExceptions:page == 1 ? res.data[rootState.lan].eci.opExceptions||[] : [...state.eci.opExceptions,...res.data[rootState.lan].eci.opExceptions||[]]
        });
        commit('changeTotal',{
          opExceptions:res.total
        });
      })
    return Promise.resolve(state)

  },

  // eciAsset-------------------
  async getSoftwareCopyrights({commit,state,rootState},{companyId,page,size}){
    await getSoftwareCopyrights({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          softwareCopyrightses:page == 1 ? res.data[rootState.lan].eciAsset.softwareCopyrightses||[] : [...state.eciAsset.softwareCopyrightses,...res.data[rootState.lan].eciAsset.softwareCopyrightses||[]]
        });
        commit('changeTotal',{
          softwareCopyrightses:res.total
        });
      })
    return Promise.resolve(state)

  },
  async getCertification({commit,state,rootState},{companyId,page,size}){
    await getCertification({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          certifications:page == 1 ? res.data[rootState.lan].eciAsset.certifications||[] : [...state.eciAsset.certifications,...res.data[rootState.lan].eciAsset.certifications||[]]
        });
        commit('changeTotal',{
          certifications:res.total
        });
      })
    return Promise.resolve(state)

  },
  async getCopyrights({commit,state,rootState},{companyId,page,size}){
    getCopyrights({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          copyrights:page == 1 ? res.data[rootState.lan].eciAsset.copyrights||[] : [...state.eciAsset.copyrights,...res.data[rootState.lan].eciAsset.copyrights||[]],
        });
        commit('changeTotal',{
          copyrights:res.total
        });
      })
    return Promise.resolve(state)

  },
  async getPatentDetail({commit,state,rootState},{companyId,page,size}){
    await getPatentDetail({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          patentDetails:page == 1 ? res.data[rootState.lan].eciAsset.patentDetails||[] : [...state.eciAsset.patentDetails,...res.data[rootState.lan].eciAsset.patentDetails||[]]
        });
        commit('changeTotal',{
          patentDetails:res.total
        });
      })
    return Promise.resolve(state)

  },
  getTmInfo({commit,rootState},{companyId,page,size}){
    getTmInfo({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          tmInfos:page == 1 ? res.data[rootState.lan].eciAsset.tmInfos||[] : [...state.eciAsset.tmInfos,...res.data[rootState.lan].eciAsset.tmInfos||[]]
        });
        commit('changeTotal',{
          tmInfos:res.total
        });
      })
  },
  getWebsites({commit,rootState},{companyId,page,size}){
    getWebsites({companyId,page,size})
      .then(res=>{
        commit('changeEciasset',{
          websites: page == 1 ? res.data[rootState.lan].eciAsset.websites||[] : [...state.eciAsset.websites,...res.data[rootState.lan].eciAsset.websites||[]]
        });
        commit('changeTotal',{
          websites:res.total
        });
      })
  },
  // law-------------------
  getCase({commit,rootState},{companyId,page,size}){
    getCase({companyId,page,size})
      .then(res=>{
        commit('changeLaw',{
          cases:page == 1 ? res.data[rootState.lan].law.cases||[] : [...state.law.cases,...res.data[rootState.lan].law.cases||[]]
        });
        commit('changeTotal',{
          cases:res.total
        });
      })
  },
  getCourts({commit,rootState},{companyId,page,size}){
    getCourts({companyId,page,size})
      .then(res=>{
        commit('changeLaw',{
          chinaCourts:page == 1 ? res.data[rootState.lan].law.chinaCourts||[] : [...state.law.chinaCourts,...res.data[rootState.lan].law.chinaCourts||[]]
        });
        commit('changeTotal',{
          chinaCourts:res.total
        });
      })
  },
  getShixin({commit,rootState},{companyId,page,size}){
    getShixin({companyId,page,size})
      .then(res=>{
        commit('changeLaw',{
          shiXins:page == 1 ? res.data[rootState.lan].law.shiXins||[] : [...state.law.shiXins,...res.data[rootState.lan].law.shiXins||[]]
        });
        commit('changeTotal',{
          dishonest:res.total
        });
      })
  },
  getZhixing({commit,rootState},{companyId,page,size}){
    getZhixing({companyId,page,size})
      .then(res=>{
        commit('changeLaw',{
          zhiXings:page == 1 ? res.data[rootState.lan].law.zhiXings||[] : [...state.law.zhiXings,...res.data[rootState.lan].law.zhiXings||[]]
        });
        commit('changeTotal',{
          debtor:res.total
        });
      })
  },
  // eciOperation-------------
  getTaxes({commit,rootState},{companyId,page,size}){
    getTaxes({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          financingTaxes:page == 1 ? res.data[rootState.lan].eciOperation.financingTaxes||[] : [...state.eciOperation.financingTaxes,...res.data[rootState.lan].eciOperation.financingTaxes||[]]
        });
        commit('changeTotal',{
          financingTaxes:res.total
        });
      })
  },
  getFinancing({commit,rootState},{companyId,page,size}){
    getFinancing({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          financings:page == 1 ? res.data[rootState.lan].eciOperation.financings||[] : [...state.eciOperation.financings,...res.data[rootState.lan].eciOperation.financings||[]]
        });
        commit('changeTotal',{
          financings:res.total
        });
      })
  },
  async getInvest({commit,rootState,state},payload){
    const {companyId,page,size} = payload;
    await getInvest({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          investInfos:page == 1 ? res.data[rootState.lan].eciOperation.investInfos||[] : [...state.eciOperation.investInfos,...res.data[rootState.lan].eciOperation.investInfos||[]]
        });
        commit('changeTotal',{
          invest:res.total
        });
      })
    return Promise.resolve(state)
  },
  getMpledge({commit,rootState},{companyId,page,size}){
    getMpledge({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          mpledges:page == 1 ? res.data[rootState.lan].eciOperation.mpledges||[] : [...state.eciOperation.mpledges,...res.data[rootState.lan].eciOperation.mpledges||[]]
        });
        commit('changeTotal',{
          mpledges:res.total
        });
      })
  },
  getProduct({commit,rootState},{companyId,page,size}){
    getProduct({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          products:page == 1 ? res.data[rootState.lan].eciOperation.products||[] : [...state.eciOperation.products,...res.data[rootState.lan].eciOperation.products||[]]
        });
        commit('changeTotal',{
          products:res.total
        });
      })
  },
  getRecruit({commit,rootState},{companyId,page,size}){
    getRecruit({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          recruitInfos:page == 1 ? res.data[rootState.lan].eciOperation.recruitInfos||[] : [...state.eciOperation.recruitInfos,...res.data[rootState.lan].eciOperation.recruitInfos||[]]
        });
        commit('changeTotal',{
          recruitInfos:res.total
        });
      })
  },
  getSpotcheck({commit,rootState},{companyId,page,size}){
    getSpotcheck({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          spotChecks:page == 1 ? res.data[rootState.lan].eciOperation.spotChecks||[] : [...state.eciOperation.spotChecks,...res.data[rootState.lan].eciOperation.spotChecks||[]]
        });
        commit('changeTotal',{
          spotChecks:res.total
        });
      })
  },
  getPledge({commit,rootState},{companyId,page,size}){
    getPledge({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          pledges:page == 1 ? res.data[rootState.lan].eciOperation.pledges||[] : [...state.eciOperation.pledges,...res.data[rootState.lan].eciOperation.pledges||[]]
        });
        commit('changeTotal',{
          pledges:res.total
        });
      })
  },
  getLiquidation({commit,rootState},{companyId,page,size}){
    getLiquidation({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          liquidations:page == 1 ? res.data[rootState.lan].eciOperation.liquidations||[] : [...state.eciOperation.liquidations,...res.data[rootState.lan].eciOperation.liquidations||[]]
        });
        commit('changeTotal',{
          liquidations:res.total
        });
      })
  },
  getPenalty({commit,rootState},{companyId,page,size}){
    getPenalty({companyId,page,size})
      .then(res=>{
        commit('changeOperation',{
          penaltys:page == 1 ? res.data[rootState.lan].eciOperation.penaltys||[] : [...state.eciOperation.penaltys,...res.data[rootState.lan].eciOperation.penaltys||[]]
        });
        commit('changeTotal',{
          penaltys:res.total
        });
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



const filterStatue = (val,isZh)=>{
  
  if(val==1) {return 'valid'};
  if(val==2) {return 'invalid'};
  if(val==3) {return 'pending trial'};
  if(val==4) {return 'uncertain'};
  if(val==5) {return 'unknown'};

}

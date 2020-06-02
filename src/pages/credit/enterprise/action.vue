<template>
  <!-- 企业互动 -->
  <div >
    <header class='f-c p-30'>
      <section @click='actionType="ask"' class='f-1 shadow-app b-r-8 ease-400 h-200 m-r-30 f-column f-c' :class='actionType=="ask"?"b-blue":"b-transparent"'>
        <img src="../../../image/notificationCenter/iconTop.png" class='h-72'/>
        <span class='f-s-24  m-t-5 f-w-600 ease-400' :class='actionType=="ask"?"c-333":"c-999"'>Ask for Cooperation</span>
      </section>
      <section @click="actionType='deliver'" class='f-1 shadow-app b-r-8 ease-400 h-200  f-column f-c' :class='actionType=="deliver"?"b-blue":"b-transparent"'>
        <img src="../../../image/icon/icon_card.png" class='h-72'/>
        <span class='f-s-24  m-t-5 f-w-600 ease-400' :class='actionType=="deliver"?"c-333":"c-999"'>Deliver a Business Card</span>
      </section>
    </header>
    <transition-group tag='main' name='up'>
      <!-- 發送消息 -->
      <section v-if='actionType=="ask"' key='ask'>
        <h3 class='h-70 bg-app f-s-c p-l-30 '>
          <span class='c-999 f-s-24'>
            Mode of cooperation/products
          </span>
        </h3>
        <div class='p-30 d-f h-300'>
          <textarea v-model='content' maxlength="100" class='f-1 f-s-28 c-333' placeholder="Please outline the mode of cooperation/products"></textarea>
        </div>  
      </section>
      <!-- 發送名片 -->
      <section v-else class='p-lr-30' key='card'>
        <p class='h-90 b-app b-w-1 b-no-lrt f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Real Name</span>
          <span>
            <span class='f-s-28 c-999 m-r-10'>{{userCardData.name}}</span>
            <!-- <Icon type='icon-right' class='c-999 f-s-28' /> -->
          </span>
        </p>
        <p class='h-90 b-app b-w-1 b-no-lrt f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Phone Number</span>
          <span>
            <span class='f-s-28 c-333 m-r-10'>{{userCardData.phone}}</span>
            <!-- <Icon type='icon-right' class='c-999 f-s-28' /> -->
          </span>
        </p>
        <p class='h-90 b-app b-w-1 b-no-lrt f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>E-mail</span>
          <span>
            <span class='f-s-28 c-333 m-r-10'>{{userCardData.email}}</span>
            <!-- <Icon type='icon-right' class='c-999 f-s-28' /> -->
          </span>
        </p>
        <p class='h-90 b-app b-w-1 b-no-lrt f-b-c' @click='$router.push("/enterprise/home?isBack=1")'>
          <span class='f-s-28 c-333 f-w-600'>Enterprise Name</span>
          <span class='f-1 white-1 d-f'>
            <span class='f-s-28  m-lr-10 white-1 f-1'>{{enter.companyName}}</span>
            <Icon type='icon-right' class='c-999 f-s-28' />
          </span>
        </p>
        <p class='h-90 b-app b-w-1 b-no-lrt f-b-c' @click='$router.push("/enterprise/home?isBack=1")'>
          <span class='f-s-28 c-333 f-w-600'>Enterprise Address</span>
          <span class='f-1 white-1 d-f'>
            <span class='f-s-28  m-lr-10 white-1 f-1'>{{enter.address}}</span>
            <Icon type='icon-right' class='c-999 f-s-28' />
          </span>
        </p>
      </section>
    </transition-group>
    <footer @click='askCooperation' class='h-88 w-650 p-f-xc-yb f-c m-b-50 bg-linear-header b-r-44 f-ccc '>
      <span class='f-s-32 c-fff'>Submit</span>
    </footer>
  </div>
</template>
<script>
import { requestAskForCoopration,requestUserCardImg,getUserCenterUserInfo,requestSendCard,myCompanyList } from '../../../request/axios.userCenter'
export default {
  name:'action',
  data(){
    return {
      actionType:'ask' ,// ask,deliver
      content:'',//合作产品请求
      userCardData:{

      },
      enter:{

      },
    }
  },
  computed:{
    ...mapState(['lan',"access_token"])
  },
  mounted(){
    !!localStorage.access_token&&this.requestUserCardData()
    this.enter = localStorage.companyCard ? JSON.parse(localStorage.companyCard) : {}
  },
  beforeRouteEnter(to,from,next){
    const isJumpFromMyEnter = from.path.includes('/enterprise/home');
    next(vm=>{
      vm.actionType = isJumpFromMyEnter ? 'deliver' : 'ask'
    })
  },
  methods:{
    // 请求合作
    async askCooperation(){
      
      



      this.actionType == 'ask' ?
      this.requestAskForCoopration() :
      this.requestSendCard()

    },
    // 获取用户名片数据
    requestUserCardData(){
      getUserCenterUserInfo()
        .then(res=>{
          this.userCardData = res.data ;
        })
    },

    // 发送请求
    async requestAskForCoopration(){
      if(this.content.trim()==''){
        this.$notify('Please enter content')
        document.querySelector('textarea').focus();
        return ;
      }
      let list = await myCompanyList()
                          .then(res=>{
                            return res.data.list
                          })
                          .catch(()=>{
                            return []
                          })
      if(list.map(item=>item.companyId).includes(this.$route.params.id)){
        this.$notify('You have certified the enterprise.')
        return false;
      }


      requestAskForCoopration({
        content:this.content,
        companyId:this.$route.params.id
      })
      .then(res=>{
        this._success()
      }) 
      .catch(()=>{})
    },

    // 发送名片
    async requestSendCard(){
      let list = await myCompanyList()
                          .then(res=>{
                            return res.data.list
                          })
                          .catch(()=>{
                            return []
                          })
      if(list.map(item=>item.companyId).includes(this.$route.params.id)){
        this.$notify('You have certified the enterprise.')
        return false;
      }

      requestSendCard({
        companyId:this.$route.params.id
      })
      .then(res=>{
        this._success()
      })
      .catch(()=>{})
    },
  },

}
</script>

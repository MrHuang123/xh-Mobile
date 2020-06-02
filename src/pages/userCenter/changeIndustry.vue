<template>
  <div class="changeCompanyAddress p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Industry">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right"  class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class='h-88'>
        <!-- <p class='l-h-40 f-s-28 c-999'>{{$route.query.industry}}</p>
        <p class=' h-2 w-per-100 bg-color-eee m-t-10'></p> -->
        <!-- <input v-focusInput v-model="industry" type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter your industry' /> -->
         <van-field
        v-model="industry"
        :class="{active:type==2}" @focus="type=2" @blur='type=1'
        clearable
        right-icon="arrow-down"
        placeholder="Please select industry"
        @click-right-icon="show=true"
      />
      </section>
    </main>
     <van-popup v-model="show" position="bottom" :overlay="true">
          <van-picker :loading='loading' confirm-button-text='OK'  cancel-button-text='Cancel'   show-toolbar :columns="industryList" :default-index="index"   @cancel="show=false" @confirm="onConfirm"/>
      </van-popup>
  </div>
</template>
<script>
// 修改行业
import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup, NavBar,Popup, Picker, } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
import {getIndustryList} from '../../request/axios.common'
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar)
  .use(Popup)
  .use(Picker);;
export default {
  components: { xHeader },
  data() {
    return {
      industry: "",
      data:{},
      show:false,
      type:1,
      index:0,//初始索引
      industryList:[],
      loading:true,
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", ["ucenterUserInfo"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations("userCenter", ["changeAdress"]),
    ...mapActions("userCenter", [
      "getUserInfo",
      "getUserCenterUserInfo",
      "userInfoUpdate"
    ]),
    //弹出框确定按钮
    onConfirm(value,index){
        this.industry = value.text
        this.show = false
    },
    init() {
      getIndustryList().then(res=>{
        this.loading = false
        if(res.data.length>0){
          this.industryList = res.data.map((item,index)=>(Object.assign({},item,{
              text:item.enName,
              value:index
          })))
        }
      })
      this.getUserCenterUserInfo(this.access_token).then(res => {
        if (res) {
          this.data = res.data
          // this.industry = res.data.industry;
          this.industry = this.$route.query.industry
        }
      });
    },
    back() {
      this.$router.back();
    },
    confim() {
        this.data.industry = this.industry
        console.log(this.industry,this.data.industry)
        this.userInfoUpdate(this.data).then(res => {
          this.$router.push({
            name: "personalInformation"
          });
        });
    }
  }
};
</script>
<style lang="stylus">
.changeCompanyAddress {
  .van-cell-group {
    height: 100% !important;
    font-size: 28px !important;
    font-family: PingFangSC-Semibold !important;
    font-weight: 600 !important;
    color: rgba(153, 153, 153, 1) !important;
    line-height: 40px !important;
  }

  .van-field {
    height: 100% !important;
  }

  .van-cell {
    height: 100% !important;
    min-height: 88px !important;
  }
  .van-field__right-icon{
    padding: 0 0.2rem;
    .van-icon {
        display: block;
        min-width: 1em;
        font-size: 0.32rem!important
        line-height: inherit;
    }
   }
  .active{
    border-bottom 1px solid #1C71B7!important
    transition border-bottom 1s;
  }
}
</style>

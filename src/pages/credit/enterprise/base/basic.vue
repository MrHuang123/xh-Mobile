<template>
  <div class="p-lr-30 p-b-30 p-t-100" >
    <van-notice-bar
        :speed='40'
        class="p-f pos-t-100 pos-l-0 w-per-100 h-88 p-lr-30"
        color="#1C71B7"
        background="#e7eef7"
        left-icon="warning-o   m-lr-10 f-s-32 f-w-600"
      >
        <template slot='default'>
          {{isBrand? 
          "The following information is from human translation.":
          "The following information is from machine translation, for reference only"}}  
        </template>
      </van-notice-bar>
    <section class="p-lr-50 f-column f-s-c">
      <img class="m-t-30 h-120 w-120" src="../../../../image/userCenter/nationImg.png" alt="logo" />
      <h3 class="m-t-30 c-333 f-s-28 f-w-600 t-c">{{this.company.companyName}}</h3>
      <p class="m-t-10 c-999 f-s-22 t-c">{{this.company.econKind}}</p>
    </section>
    <section class='m-t-30 p-lr-30 shadow-app b-r-8 b-app'>
      <ul class="h-230 p-tb-40 f-column f-b b-app b-w-1 b-no-lrt">
        <li class="f-b-c w-per-100">
          <span class="c-333 f-w-600 f-s-24">Legal Representative</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.operName}}</span>
        </li>
        <li class="f-b-c w-per-100">
          <span class="c-333 f-w-600 f-s-24">Registered Capital</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.rawRegistCapi}}</span>
        </li>
        <li class="f-b-c w-per-100">
          <span class="c-333 f-w-600 f-s-24">Date of Establishment</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.termStart}}</span>
        </li>
      </ul>
      <ul class="h-230 p-tb-40 f-column f-b b-app b-w-1 b-no-lrt">
        <li class="f-b-c w-per-100 m-b-30">
          <!-- 信用代碼 -->
          <span class="c-333 f-w-600 f-s-24">Unified Credit Code</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.creditCode}}</span>
        </li>
        <li class="f-b-c w-per-100 m-b-30">
          <!-- 最新等級日期 -->
          <span class="c-333 f-w-600 f-s-24">Latest Registration Date</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.updatedDate}}</span>
        </li>
        <li class="f-b w-per-100">
          <!-- 等級狀態 -->
          <span class="c-333 f-w-600 f-s-24 w-per-50">Registration Status</span>
          <span class="c-666 f-w-400 f-s-24 w-per-50 t-r">{{this.company.status}}</span>
        </li>
      </ul>
      <ul class="h-230 p-tb-40 f-column f-b">
        <li class="f-b-c w-per-100">
          <!-- 所屬行業 -->
          <span class="c-333 f-w-600 f-s-24">Industry</span>
          <span class="c-666 f-w-400 f-s-24">{{eci && eci.industry &&  eci.industry.industry}}</span>
        </li>
        <li class="f-b-c w-per-100">
          <!-- 所屬地區 -->
          <span class="c-333 f-w-600 f-s-24">Region</span>
          <span class="c-666 f-w-400 f-s-24">{{this.company.province}}</span>
        </li>
        <li class="f-b-c w-per-100">
          <!-- 企業網站 -->
          <span class="c-333 f-w-600 f-s-24">Website</span>
          <span class="c-666 f-w-400 f-s-24">{{eci.companyAttribute.webSite}}</span>
        </li>
      </ul>
    </section>
    <!-- 登记机关、注册地址、经营范围 -->
    <section class='p-lr-30'>
      <div v-for='(item,index) in registInfo' :key='index'>
        <h3 class="f-s-c m-t-40">
          <span class="w-12 h-12 m-r-15 b-r-circle bg-color-1C71B7 "></span>
          <p class="c-333  f-s-24 f-w-600 l-h-35 ">{{item.title}}</p>
        </h3>
        <p class="m-t-10 f-s-22 c-999 l-h-35 ">
          {{item.content}}
        </p>
      </div>
    </section>
  </div>
</template>
<script>
// 公司基本信息
import xHeader from '@/layout/header.vue'
import {mapState} from 'vuex'
import { NoticeBar } from 'vant';

Vue.use(NoticeBar);

export default {
  components: { xHeader },
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState('creditEnterprise',['eci','isBrand']),
    company(){
      return this.eci.company ;
    },
    registInfo(){
      return [
              {
                title: 'Registration Authority',
                content:this.eci.company.belongOrg
              },
              {
                title: 'Registered Address',
                content:this.eci.company.address
              },
              {
                title: 'Business Scope',
                content:this.eci.company.scope
              }
          ]
    }
  }
}
</script>

<template>
    <div class="p-lr-30">
      <ul>
        <!-- <li v-for='(item,index) in grades' :key='index' :class='index+1==qualratingnmNum?"bg-app":""' class="d-f p-tb-30 b-2-eee b-no-lr b-no-t"> -->
        <li v-for='(item,index) in grades' :key='index'  class="d-f p-tb-30 b-2-eee b-no-lr b-no-t">
          <section class="grade-label h-100 w-100 f-c">
            <span class="c-FFBB47 f-s-28">R{{index+1}}</span>
          </section>
          <section class="m-t-10 m-l-35 f-1">
            <h3 class="h-35 f-s-24 c-333 f-w-600">Default probability ≤<span class="c-C63639">&nbsp;{{item.grade}}%</span></h3>
            <p class="f-s-24 c-999 m-t-10">{{item.content}}</p>
          </section>
        </li>
      </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import xHeader from '@/layout/header'

export default {
  components:{
    xHeader
  },
  data(){
    return {
      grades:[
        {grade:0.03,content:'The best credit grade represents the best credit quality'},
        {grade:0.10,content:'Sub-optimal grade represents almost the best credit quality'},
        {grade:0.21,content:'Have very strong solvency'},
        {grade:0.37,content:'Have strong solvency'},
        {grade:0.66,content:'Have relatively good solvency, which is hardly susceptible to minor changes in external environment'},
        {grade:1.07,content:'Have general solvency, which is susceptible to minor changes in external environment'},
        {grade:1.53,content:'Have general solvency and changes in external environment are easy to undermine the solvency'},
        {grade:2.16,content:'Hardly have solvency, which is exposed to risks caused by changes in external environment'},
        {grade:3.10,content:"Hardly have solvency but unfavorable business, financial or economic environment may undermine the debtor's ability or will to some extent"},
        {grade:4.30,content:"Hardly have solvency but unfavorable business, financial or economic environment may undermine the debtor's ability or will"},
        {grade:5.66,content:"Hardly have solvency but unfavorable business, financial or economic environment may undermine the debtor's ability or will soon"},
        {grade:7.16,content:'When credit quality is very poor, it is difficult to repay corresponding debt, and solvency depends on a stable business, financial or economic environment'},
        {grade:8.94,content:'When credit quality is very poor, it is probably difficult to repay corresponding debt, and solvency depends on a good business, financial or economic environment'},
        {grade:31.62,content:'When credit quality is very poor, it is very difficult to repay corresponding debt, and solvency highly depends on a good business, financial or economic environment'},
        {grade:100,content:'Default'},
      ]
    }
  },
  computed:{
    ...mapGetters('creditInfo',['qualratingnmNum'])
  }  
}
</script>
<style lang="stylus">
.grade-label
  background url('../../../image/bg/bg_grade.png') no-repeat center center 
  background-size 100% 100%
</style>

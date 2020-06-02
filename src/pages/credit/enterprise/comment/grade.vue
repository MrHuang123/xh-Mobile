<template>
  <div class='p-30'>
    <header v-if='gradeInfoData' class=' d-f'>
      <div class='grade-label h-100 w-100 f-c'>
        <span class='c-FFBB47 f-s-28'>{{gradeInfoData.creditLevel}}</span>
      </div>
      <section class="m-t-10 m-l-35 f-1">
        <h3 class="h-35 f-s-24 c-333 f-w-600">Current Rating:<span class="c-C63639">&nbsp;{{gradeInfoData.creditLevel}}</span></h3>
        <p class="f-s-24 c-999 m-t-10">{{gradeInfoData.creditDesc}}</p>
        <p class="f-s-24 c-999 m-t-10">Please continue your efforts.</p>
      </section>
    </header>
    <!-- 风险状况 -->
    <section v-if='gradeInfoData' class='m-t-30'>
      <h3 class='f-s-c'>
        <Icon type='icon-data' class='f-s-32 c-blue'/>
        <span class='f-s-28 c-333 m-l-20'>Risk Profile</span>
      </h3>
      <div class='shadow-app m-t-15 b-r-8 p-lr-30 p-tb-40'>
        <p class='w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Current Risk</span>
          <span class='f-s-24 c-666'>No risk</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Court's Enforcement</span>
          <span class='f-s-24 c-666'>{{riskStatus?riskStatus.fyzx:''}}</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Tax Arrears</span>
          <span class='f-s-24 c-666'>{{riskStatus?riskStatus.jylr:''}}</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Abnormal Operations</span>
          <span class='f-s-24 c-666'>{{riskStatus?riskStatus.qsqj:''}}</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Associated Risk</span>
          <span class='f-s-24 c-666'>{{riskStatus?riskStatus.glfx:''}}</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Credit Blacklist</span>
          <span class='f-s-24 c-666'>{{riskStatus?riskStatus.xzcf:''}}</span>
        </p>
      </div>
    </section>
    <!-- 信用评价 -->
    <section v-if='gradeInfoData' class='m-t-30'>
      <h3 class='f-s-c'>
        <Icon type='icon-bianji' class='f-s-32 c-blue'/>
        <span class='f-s-28 c-333 m-l-20'>Credit Evaluation</span>
      </h3>
      <div class='shadow-app m-t-15 b-r-8 p-lr-30 p-tb-40'>
        <p class='w-per-100 f-b-c'>
          <span class='f-s-28 c-333 f-w-600'>Current Score</span>
          <span class='f-s-24 c-666'>{{currentScore}}</span>
        </p>
        <p class='m-t-30 w-per-100 f-b-c m-b-45'>
          <span class='f-s-28 c-333 f-w-600'>Increased than the last score</span>
          <span class='f-s-24 c-666'>{{differScore}}</span>
        </p>
       <p class='f-s-c' v-if='riskEvaluation.industry'>
         Leading <span class='c-32BA59  break-word' >{{riskEvaluation.industry}}</span> of companies in this industry
         <!-- <Icon type='icon-ok' class='f-s-32 c-32BA59 m-r-25' /> -->
         <span class='f-s-24 c-32BA59 f-1 break-word' >
           <!-- {{gradeInfo.desc}} -->
           <!-- Leading 24.60% of enterprises in this industry It leads 37.55% of enterprises in the region. -->
         </span>
       </p>
        <p class=' f-s-c m-t-20' v-if='riskEvaluation.area'>
         Leading <span class='c-32BA59  break-word' >{{riskEvaluation.area}}</span>  of companies in the region
       </p>
      </div>
    </section>
    <NoData v-if='!gradeInfoData.creditLevel' />
  </div>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import {
  getCalcScore,
  scorePortrait,
  scorePercent
} from '../../../../request/axios.credit.js'
export default {
  computed:{
    ...mapState('creditInfo',['gradeInfo','riskStatus','currentScore','differScore','gradeInfoData','riskEvaluation'])
  },
  mounted(){
    this.getCalcScore(this.$route.params.id)
    this.scorePortrait(this.$route.params.id)
    this.scorePercent(this.$route.params.id)
  },
  methods:{
    ...mapMutations('creditInfo',{
      changeKeyCreditInfo:'changeKey'
    }),
    scorePercent(companyId){
      scorePercent({
        companyId,
      }).then(res=>{
         console.log(res)
         if(!!res.data&&!! res.data.data){
           this.changeKeyCreditInfo({
              riskEvaluation:res.data.data
            })
         }
      })
    },
    getCalcScore(companyId){
      getCalcScore({
        companyId,
      }).then(res=>{
        if(!!res.data&&!! res.data.data){
          this.changeKeyCreditInfo({
            gradeInfoData:res.data.data
          })
        }
      })
    },
    scorePortrait(companyId){
      scorePortrait({
        companyId,
      }).then(res=>{
        if(!!res.data&&!! res.data.data){
          this.changeKeyCreditInfo({
            riskStatus: res.data?res.data.data.riskNum:'',
            currentScore: res.data?res.data.data.companyScore:'',
            differScore: res.data?res.data.data.differScore:''
          })
        }
      })
    },
  }
}
</script>

<style lang="stylus">
.grade-label
  background url('../../../../image/bg/bg_grade.png') no-repeat center center 
  background-size 100% 100%
</style>

<template>
  <div class='m-t-15 p-step2 p-b-120'>
    <section>
      <!-- 所属省市 -->
      <p @click='showAddress=true' class='h-90 w-per-100 b-app b-no-lrt f-b-c'>
        <span class='f-s-28 c-333 f-w-600'>Province & city</span>
        <span  class='f-s-28 c-666 d-f f-e-c f-1 white-1 m-l-5'>
          <span class='white-1'>{{area}}</span>
          <Icon type='icon-right' class='rotate-90 f-s-26 m-l-15' />
        </span>
      </p>
      <!-- 开户银行 -->
      <p @click='showBank=true' class='h-90 w-per-100 b-app b-no-lrt f-b-c'>
        <span class='f-s-28 c-333 f-w-600'>Bank of deposit</span>
        <span  class='f-s-28 c-666 d-f f-e-c f-1 white-1 m-l-5'>
          <span class='white-1'>{{identify.bankName}}</span>
          <Icon type='icon-right' class='rotate-90 f-s-26 m-l-15' />
        </span>
      </p>
      <!-- 联行号***某某支行 -->
      <p @click='showBankCNA = Boolean(bankListCNA.length)' class='h-90 w-per-100 b-app b-no-lrt f-b-c'>
        <span class='f-s-28 c-333 f-w-600'>CNAPS code</span>
        <span  class='f-s-28 c-666 d-f f-e-c f-1 white-1 m-l-5'>
          <span class='white-1'>{{openBankName}}</span>
          <Icon type='icon-right' class='rotate-90 f-s-26 m-l-15' />
        </span>
      </p>
      <!-- 开户名 -->
      <router-link to='../name' tag='p' class='h-90 w-per-100 b-app b-no-lrt f-b-c'>
        <span class='f-s-28 c-333 f-w-600'>Account name</span>
        <span class='f-s-28 c-666 d-f f-e-c f-1 white-1 m-l-5'>
          <span class='white-1'>{{identify.bankAccountName}}</span>
          <Icon type='icon-right' class='f-s-26 m-l-15' />
        </span>
      </router-link>
      <!-- 开户号码 -->
      <router-link to='../code' tag='p' class='h-90 w-per-100 b-app b-no-lrt f-b-c'>
        <span class='f-s-28 c-333 f-w-600'>Business account No.</span>
        <span class='f-s-28 c-666 d-f f-e-c f-1 white-1 m-l-5'>
          <span class='white-1'>{{identify.corporateAccount}}</span>
          <Icon type='icon-right' class='f-s-26 m-l-15' />
        </span>
      </router-link>
    </section>
    <section class='p-tb-50 f-c'>
      <button @click='$router.back()' class='w-312 h-88 f-c b-blue b-w-1 b-r-44 m-r-30'><span class='c-app f-s-32'>Back</span></button>
      <button v-if='!!this.identify.bankNo&&!!this.identify.bankAccountName&&!!this.identify.corporateAccount' @click='requestSaveCompanyCertification' class='w-312 h-88 f-c bg-linear-header b-r-44 '><span class='c-fff f-s-32 '>Submit</span></button>
      <button v-else class='w-312 h-88 f-c bg-ccc b-r-44 '><span class='c-fff f-s-32 '>Submit</span></button>
    </section>
    <van-actionsheet v-model="showAddress" >
      <van-area
        :value='provinceId'
        columns-num=2 
        confirm-button-text='OK'
        cancel-button-text='Cancel'
        :area-list="areas" 
        @confirm='selectAddress'
        @cancel='showAddress=false'
        class=' w-per-100 shadow-area '
      />
    </van-actionsheet>
    <van-dialog
      v-model="showBank"
      title=""
      :show-cancel-button='false'
      :showConfirmButton='false'
    >
      <main class=' h-510 o-y-a '>

          <ul>
            <li  v-for='(item,index) in banks' @click='selectBank(index)' :key='index' class='h-88 w-per-100 f-c p-lr-20'>
              <span class='t-c'>{{item.bankNameEn}}</span>
            </li>
          </ul>
        </main>
    </van-dialog>

    <van-dialog
      v-model="showBankCNA"
      title=""
      :show-cancel-button='false'
      :showConfirmButton='false'
    >
      <main class=' h-510 o-y-a '>

          <ul>
            <li  v-for='(item,index) in bankListCNA' @click='selectBankCNA(index)' :key='index' class='h-88 w-per-100 f-c p-lr-20'>
              <span class='t-c'>{{item.openBankNameEn}}</span>
            </li>
          </ul>
        </main>
    </van-dialog>
    
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import { Area,Actionsheet,Dialog } from 'vant';
import { requestGetCNAPS,requestSaveCompanyCertification,requestCertBank } from '../../../request/axios.enterprise'
import { getUserCenterUserInfo } from '*/request/axios.userCenter'


Vue.use(Area).use(Actionsheet).use(Dialog)

export default {
  data(){
    return{
      showAddress:false,
      showBank:false,
      showBankCNA:false,
      bankId:'',
      cityId:'',
      provinceId:"420000",

      area:'',
      // bankName:'',

      // bankNameCNA
      openBankName:'',

      bankListCNA:[],
    }
  },
  computed:{
    ...mapState(['banks']),
    ...mapGetters('enterDetail',['company']),
    ...mapGetters(['areas','bankList']),
    ...mapState('enterIdentify',['identify'])
  },
  mounted(){
    
  },  
  methods:{
    ...mapMutations('enterIdentify',['changeIdentify','changeKey']),
    // 认证
    async requestSaveCompanyCertification(){

      if(!!!this.identify.bankNo){
        this.$notify('Please select CNAPS code')
        return ;
      }
      if(!!!this.identify.bankAccountName){
        this.$notify('Please enter account name')
        return ;
      }
      if(!!!this.identify.corporateAccount){
        this.$notify('Please enter account NO.')
        return ;
      }
      
      const uid = await getUserCenterUserInfo()
                          .then(res=>{
                            return res.data.username;
                          })

                        // console.log(uid)
      // requestCertBank({
      //   accountName:this.identify.bankAccountName,
      //   accountNo:this.identify.corporateAccount,
      //   bankId:this.bankId,
      //   bankLineNo:this.identify.bankNo,
      //   city:this.cityId,
      //   openBankName:this.identify.bankName,
      //   province:this.provinceId,
      // })
      // .then(res=>{

        requestSaveCompanyCertification(Object.assign({},this.identify,{uid}))
        .then(res=>{
            this.$dialog.alert({
              message: 'Submission Success',
              confirmButtonText:'OK'
            }).then(() => {
              this.$router.push('/userCenter/mine')
            });
        })

      // })
      // .catch(()=>{
      //   this._toast('Error in bank information')
      // })
    },
    selectAddress(v){
      // console.log(v,this.areas)
      this.showAddress = false;
      this.provinceId = v[0].code;
      this.cityId = v[1].code;
      this.area=`${v[0].name},${v[1].name}`;
      this.bankId = '';
      this.openBankName = '';
      this.changeIdentify({
        bankName:'',
        bankNo:'',
      })
    },
    selectBank(index){
      // console.log(index)
      this.showBank = false;
      this.bankId = this.banks[index].bankId;
      // this.bankName=this.banks[index].bankName;
      this.openBankName = '';
      this.changeIdentify({
        bankName:this.banks[index].bankNameEn,
        bankNo:'',
      })
      this.getCNAPS()
    },
    selectBankCNA(index){
      // console.log(this.bankListCNA[index])
      this.showBankCNA = false;
      this.changeIdentify({
        bankNo: this.bankListCNA[index].bankLineNo
      })

      this.openBankName = this.bankListCNA[index].openBankNameEn;
      // this.bankId = this.banks[index].bankId;
      // this.bankName=this.banks[index].bankName;
    },
    getCNAPS(){
      if(this.area===''){
        this.$notify('Please select province & city');
        return ;
      }
      if(this.bankId==''){
        this.$notify('Please select bank of deposit');
        return ;
      }
      requestGetCNAPS({
        bankId:this.bankId,
        provinceId:this.provinceId,
        cityCode:this.cityId
      })
      .then(res=>{
        this.bankListCNA = res.data;
        // this.showBankCNA = true;
        if(res.data.length===0){
          this.$notify('There is no branch-bank')
          // return
          this.bankId = '';
          this.changeIdentify({
            bankName:''
          })
        }
      })
      
    }
  }
}
</script>
<style lang="stylus">
.shadow-area
  box-shadow  0rem 0rem 0.2rem 0rem rgba(0,0,0,0.15)
.p-step2
  .van-picker__frame, .van-picker__loading .van-loading
    width 0!important
</style>

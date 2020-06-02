<template>
    <van-dialog
      v-model="show"
      title="For security reason, please enter verification number."
      show-cancel-button
      class="tokenModal"
      confirmButtonText='OK'
      cancelButtonText='Cancel'
      :beforeClose="beforeClose"
      @confirm='submit'
      @cancel='show=false'
    >
        <div class="f-s-c p-lr-40 m-tb-40">
            <Icon slot="left-icon"  type='icon-dentifyingcode' class="f-s-32 c-0145A8" />
            <input v-model="code" class="f-1 h-64 bg-transparent"  placeholder="Graph code"/>
            <img class="w-140 h-64" @click="getUdid" :src="imgUrl">
        </div>
  </van-dialog>
</template>
<script>
import {Dialog } from 'vant'
import getUdid from "../../utils/getUdid.js";
import { mapState, mapActions, mapMutations } from "vuex";
import { checkCode } from "../../request/axios.account.js";
Vue.use(Dialog)
export default {
    data(){
        return {
             show:false,
             code:'',
             uuid:getUdid(),
             token:'',
             type:0
        }
    },
     computed: {
         ...mapState('account',['filed']),
        imgUrl() {
            return `${window.config.apiUc}/ucApi/getImageCode?uuid=${this.token}&n=${this.uuid}`;
        }
    },
    methods:{
        ...mapMutations("account",['changeColor']),
        blur(){
            this.type = 0
            this.changeColor(0)
        },
        getUdid() {
            this.uuid = getUdid();
            this.code = "";
        },
        beforeClose(action, done) {
        //     if(!this.code){
        //        done(false) //不关闭弹框
        //       return false
         
        //  }
            if(action === 'confirm') {
                done(false) //不关闭弹框
            } else if(action === 'cancel') {
                done(true) //关闭
            }
        },
        submit(){
            if(!this.code){
              this.$toast('Please enter graphic verification code')
              return false
          }
          var obj = {
              code : this.code,
              uuid : this.token
          }
          checkCode({
            code:obj.code,
            uuid:this.token
          }).then(res=>{
            if(res.code == 200){
                this.$toast('Validation successful')
                this.$emit('submitSucess')
                this.show = false
            }else{
                this.getUdid()
                return 
            }
            }).catch(err=>{
                this.getUdid()
                return 
            })
        }
    }
}
</script>
<style lang="stylus">
.tokenModal
    ._1C71B7
        color: #1C71B7;
        font-weight:400;
        line-height:34px
    .imgCode
        width 140px
        height 64px
</style>

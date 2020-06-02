<template>
  <div class="passwordLogin">
   <section class="h-per-100 w-per-100 p-l-48 p-r-48">
      <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==1,cell_active:type==1}" @focus="type=1" @blur='blur' v-model="passwordLogin.username"   placeholder="Username / Email / Phone number">
            <Icon slot="left-icon"  type='icon-user4' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
       <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==2,cell_active:type==2}" @focus="type=2" @blur='blur' v-model="passwordLogin.password" ref='password' :type="passwordType"  placeholder="Password">
            <Icon slot="left-icon"  type='icon-password' class="f-s-32 c-0145A8" />
            <!-- <Icon slot="right-icon" @click="isShowPassword" type='icon-password' class="f-s-32 c-0145A8" /> -->
            <Icon slot="right-icon" type='icon-chakan'   v-if='passwordType=="password"'  @click="isShowPassword"  class="f-s-32 c-999"    />
            <Icon slot="right-icon" type='icon-yincangchakan'  v-else  @click="isShowPassword"  class="f-s-32 c-999"    />
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field :class="{cell_filed:filed==3,cell_active:type==3}" @focus="type=3" @blur='blur' v-model="passwordLogin.code" center   placeholder="Graph code">
          <Icon slot="left-icon"  type='icon-dentifyingcode' class="f-s-32 c-0145A8" />
          <div slot="button" class="imgCode"  size="small" type="primary">
              <img class="h-per-100 w-per-100" @click="getUdid" :src="imgUrl">
          </div>
        </van-field>
      </van-cell-group>
    </section>
  </div>
</template>
<script>
import getUdid from "../../../utils/getUdid.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      type:0,
      passwordType:'password',
      passwordLogin:{
        username:'',
        password:'',
        code:'',
        uuid:getUdid(),
      },
    };
  },
   computed: {
     ...mapState('account',['filed']),
      imgUrl() {
      // return `${window.config.api}/ucApi/getImageCode?uuid=/${this.passwordLogin.uuid}`;
      return `${window.config.apiUc}/ucApi/getImageCode?uuid=${this.passwordLogin.uuid}`;
    }
  },
  mounted(){
      // if(localStorage.username){
      //   this.passwordLogin.username = localStorage.username
      // }
      this.getUdid()
      this.changeColor(0)
  },
  methods:{
    ...mapActions("account", ["getImageCode",]),
    ...mapMutations("account",['changeColor']),
    //是否显示密码
    isShowPassword(){
      this.passwordType = this.passwordType == "password"?'text':'password';
    },
    blur(){
      this.type = 0
      this.changeColor(0)
    },
     getUdid() {
      this.passwordLogin.uuid = getUdid();
      // this.getImageCode(this.passwordLogin.uuid);
      this.passwordLogin.code = "";
    },
  }
};
</script>
<style lang="stylus">
.passwordLogin
  ._1C71B7
    color: #1C71B7;
    font-weight:400;
    line-height:34px
  .imgCode
    width 140px
    height 64px
</style>



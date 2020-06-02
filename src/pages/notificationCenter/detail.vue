<template>
    <div class="notificationCenter_detail p-t-100 p-b-120">
        <xHeader :title="cardType==1?'Business Cards Received':'Business Cards Sent'">
            <!-- <Icon @click="download" slot="" class="f-s-32 c-fff scale-50-active" type="icon-download"/> -->
        </xHeader>
        <main class="p-tb-40 w-per-100 p-lr-32">
            <p class="c-333 f-s-28 f-f-ArialMT l-h-32 m-b-32">{{data.create_time|enTime}}</p>
            <div class="f-c p-r m-b-40 w-per-100 h-440" id="mymap" @click="goDetail">
                <!-- <div class=" w-per-100 cardBg p-tb-40 p-lr-32 "  @click="goDetail" v-longtap='longtap'>
                    <h3 class="f-s-36 c-fff f-w-600 f-f-PingFangSC-Semibold l-h-50 white-1 m-b-4">{{data.name}}</h3>
                    <p   class="f-s-28 l-h-40 f-w-600 f-f-PingFangSC-Semibold c-fff white-2 m-b-8" >{{data.company_name}}</p>
                    <p class="f-s-24 f-f-PingFangSC-Semibold f-w-600  h-34 l-h-34 c-fff m-b-20">{{data.position}}</p>
                    <div class="f-s-c align-c m-b-20 w-480">
                        <Icon type='icon-phone' class="c-fff f-s-32"/>
                        <p class="f-s-18 f-w-400 f-f-PingFangSC-Regular l-h-26 m-l-16 c-fff white-1">{{data.phone}}</p>
                    </div>
                    <div class="f-s-c align-c m-b-20 w-480">
                        <Icon type='icon-email' class="c-fff f-s-32" />
                        <p class="f-s-18 f-w-400 f-f-PingFangSC-Regular  l-h-26 m-l-16 c-fff white-1">{{data.email}}</p>
                    </div>
                    <div class="f-s  m-b-20 w-480">
                        <Icon type='icon-adress' class=" c-fff f-s-32" />
                        <p class="f-s-18 f-w-400 f-f-PingFangSC-Regular  l-h-26 m-l-16 c-fff white-3">{{data.address}}</p>
                    </div>
                </div>
                <div class="w-112 h-112 p-a possion_box">
                    <img class="w-per-100" :src='codeUrl'/>
                </div> -->
                <img class="w-per-100 b-r-16" :src='imgUrl' />
            </div>
            <div v-if='data.content'>
                <p class="c-1C71B7 f-s-28 f-f-Arial-BoldMT l-h-32 m-b-16">I want to cooperate：</p>
                <p class="c-333 f-f-ArialMT l-h-40">{{data.content}}</p>
            </div>
        </main>
    </div>
</template>
<script>
import { Icon, Cell, CellGroup,NavBar} from "vant";
import { mapState, mapActions } from "vuex";
import xHeader from '@/layout/header'
import QRcode from "qrcode";
// import html2canvas from "html2canvas";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar)
export default {
    components: { 
        xHeader,
    },
    data() {
        return {
            cardType:1,
            codeUrl:'',
            data:{},
            id:'',
        };
    },
     computed: {
      imgUrl() {
        return `${window.config.api}/ucenter/userCardImgByMsgId?access_token=${localStorage.access_token}&id=${this.id}&type=${this.data.oneselfSource}`;
        }
    },
    mounted(){
        var id = this.$route.params.id
        this.id = this.$route.params.id
        this.generateQRcode(id)
        this.cardType = this.$route.params.type
        if(this.cardType == 1){
            this.updateReceiveState({
                 id,
                 state:1
            })
        }
        this.msgInfo(id).then(res=>{
            if(res){
                this.data = res
                // console.log(res)
                // !!res.company_name&&this.updateWxShareTitle({wxShareTitle:`[Business Card] ${res.company_name}`})
                !!res.company_name&&this.setWxShare({wxShareTitle:`[Business Card] ${res.company_name}`})
            }
        })
    },
    methods:{
        ...mapActions("notificationCenter", ["msgInfo",'updateReceiveState','userCardImgByMsgId']),
        download(){
            this.userCardImgByMsgId(this.id)
        },
        
       
        //点击前往详情页面
        goDetail(){ 
            //console.log(this.data)
            if(this.cardType == 1){
                if(this.data.oneselfSource == 2){
                    //console.log(this.data.oneselfCompanyInfo)
                    let obj = JSON.parse(this.data.oneselfCompanyInfo)
                    let obj_1 = {
                        ...obj,
                        companyName:obj.name,
                        country:obj.countryCode,
                        address:obj.registrationAddress,
                    }
                    this.$router.push({
                        path:'/international/details',
                    })
                    localStorage.setItem("internationalDetails", JSON.stringify(obj_1));
                }else{
                    this.$router.push(`/credit/${this.data.oneselfCompany_id}/enter/home`)
                }
            }else{
                if(this.data.oneselfSource == 2){
                    //console.log(this.data.oneselfCompanyInfo)
                    let obj = JSON.parse(this.data.oneselfCompanyInfo)
                    let obj_1 = {
                        ...obj,
                        companyName:obj.name,
                        country:obj.countryCode,
                        address:obj.registrationAddress,
                    }
                    this.$router.push({
                        path:'/international/details',
                    })
                    localStorage.setItem("internationalDetails", JSON.stringify(obj_1));
                }else{
                   this.$router.push(`/credit/${this.data.oneselfCompany_id}/enter/home`)
                }
            }
        },
        //生成二维码
        generateQRcode(id) {
            //  console.log(`${window.config.hostM}/${this.userData.company_id}/enter/home`)
            QRcode.toDataURL(`${window.config.hostM}/credit/${id}/enter/home`).then(
            url => {
                this.codeUrl = url;
            }
            );
        
        },
        back(){
            this.$router.push({
                path:'/notificationCenter/index',
            })
        }
    }
}
</script>
<style lang="stylus">
.notificationCenter_detail
    .cardBg
        background: url('../../image/notificationCenter/cardBg.png') no-repeat ;
        background-size: 100% 100%;
    .possion_box
        right 32px!important
        bottom 60px!important
        background red!important
        z-index 100!important
</style>

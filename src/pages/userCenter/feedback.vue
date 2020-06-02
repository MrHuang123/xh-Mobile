<template>
    <div class="feedback p-t-100 p-b-120">
        <xHeader title="Feedback">
            <p slot  @click="reset"  class="c-fff f-PingFangSC-Regular f-s-28">
                Reset
            </p>  
        </xHeader>
        <main class="p-t-16">
            <section class="p-lr-32">
                <ul>
                    <li class="h-90 f-s-c" @click="show=true">
                        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
                            <span class='c-333 f-s-28 break-word white-1 f-s-c'>
                               <span class="c-red m-r-8 m-t-2">*</span>
                                <span>Feedback Category</span>
                            </span>
                            <span class='f-e-c '>
                                <span class='f-s-28 c-666 m-r-15' v-if='feedbacks.text'>{{feedbacks.text}}</span>
                                <span class="f-s-28 f-w-400 c-ccc f-f-PingFangSC-Regular m-r-15" v-else>Select</span>
                                <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
                            </span>
                        </p>
                    </li>
                    <li class="h-90 f-s-c" @click="goChange('/userCenter/feedback/feedbackName',feedback.feedbackName)">
                        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
                            <span class='c-333 f-s-28 break-word white-1 f-s-c'>
                               <span class="c-red m-r-8 m-t-2">*</span>
                                <span>Contact</span>
                            </span>
                            <span class='f-e-c '>
                                <span class='f-s-28 c-666 m-r-15' v-if='feedback.feedbackName'>{{feedback.feedbackName}}</span>
                                <span class="f-s-28 f-w-400 c-ccc f-f-PingFangSC-Regular m-r-15" v-else>Please input your name</span>
                                <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
                            </span>
                        </p>
                    </li>
                    <li class="h-90 f-s-c" @click="goChange('/userCenter/feedback/feedbackPhone',feedback.feedbackPhone)">
                        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
                            <span class='c-333 f-s-28 break-word white-1 f-s-c'>
                               <span class="c-red m-r-8 m-t-2">*</span>
                                <span>Phone</span>
                            </span>
                            <span class='f-e-c '>
                                <span class='f-s-28 c-666 m-r-15' v-if='feedback.feedbackPhone'>{{feedback.feedbackPhone}}</span>
                                <span class="f-s-28 f-w-400 c-ccc f-f-PingFangSC-Regular m-r-15" v-else>Please input phone No.</span>
                                <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
                            </span>
                        </p>
                    </li>
                </ul>
                <p class="h-88 l-h-88">
                    <span class=" c-333 f-s-28"><span class="c-red m-r-8">*</span>Description</span>
                </p>
                <textarea v-model="feedbacks.backContent"  maxlength="500"  class="w-per-100 h-200 c-666 b-f6f6f6 m-b-32 p-lr-24 p-tb-20" placeholder="Please describe the feedback with no more than 500 characters">
               
                </textarea>
                <div class=' clearfix m-b-32'  style='margin-right:-15px;'>
                    <div v-for='(item,index) in feedback.licenseList' :key='index' :style='{"background-image":"url("+item.url+")"}' class='w-148 h-148 b-r-4 step1-bg f-l m-r-30 p-r'>
                    <span @click='deleteItem(index)' class='h-40 w-40 p-a-xr-yt bg-red f-c'>
                        <Icon class='c-fff f-s-24' type='icon-trash' />
                    </span>
                    </div>
                    <div v-if='feedback.licenseList.length<4' class='w-148 h-148 p-r f-l bg-app b-r-8 f-c o-h'>
                    <img src="../../image/icon/icon_photo.png" alt="" class='w-72' />
                    <xUpload @cb='uploadLicense' :length='4' :accept="accept" class='h-per-100 w-per-100 p-a o-0' />
                    </div>
                </div>
                <p class="c-666 f-f-PingFangSC-Regular h-34 l-h-34 m-b-110" >Service Time: AM 9:00 - 11:30; PM 2:00 - 5:30</p>
                <div class="p-lr-16 m-b-80">
                    <button
                    size="large"
                    class="h-88 w-per-100 bg-color-blue b-r-44 c-fff f-s-32"
                    @click="submit"
                    >Submit</button>
                </div>
            </section>
        </main>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker confirm-button-text='OK'  cancel-button-text='Cancel'   show-toolbar :columns="customerTypeList" :default-index="index"   @cancel="show=false" @confirm="onConfirm"/>
        </van-popup>

    </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import xHeader from "@/layout/header";
import { localUpload } from '../../request/axios.common'
import xUpload from '@/upload/index.vue'
import { contactCustomer } from '../../request/axios.contactCustomer'
import { Icon, Cell, CellGroup , Popup, Picker,} from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Popup)
  .use(Picker);
export default {
    components: { xHeader,xUpload  },
    data(){
        return {
            accept:'image/*',
            feedbacks:{
                text:'',
                feedbackType:'',//反馈类型
                customerType:3,// 0：游客 1：个人用户 2：企业用户 3 : 英文
                sourceType:2,// 1:中文版, 2:英文版 3:手机端
                backContent:'',//反馈内容
            },
            show: false,
            index:0,//初始索引
            customerTypeList:[
                {
                    text:'Translation Correction',
                    value:7
                },
                {
                    text:'Translation Service',
                    value:6
                },
                {
                    text:'National Report',
                    value:5
                },
                {
                    text:'Enterprise Settle-in',
                    value:4
                },
                {
                    text:'Credit Report',
                    value:3
                },
                {
                    text:'Complaints',
                    value:2
                },
                {
                    text:'Issues Feedback',
                    value:1
                },
                {
                    text:'Others',
                    value:0
                },
            ],
        }
    },
    beforeRouteEnter(to, from,next){
        next(vm=>{
            if(from.path === '/userCenter/mine'){
                vm.feedbacks = {
                    text:'',
                    feedbackType:'',//反馈类型
                    customerType:3,// 0：游客 1：个人用户 2：企业用户 3 : 英文
                    sourceType:2,// 1:中文版, 2:英文版 3:手机端
                    backContent:'',//反馈内容
                    feedbackPhone:'',//
                    feedbackName:'',//
                    licenseList:[],
                },
                vm.changeFeedback(vm.feedbacks)
            }
        })
   },
    computed:{
        ...mapState('userCenter',['feedback']),
        ...mapState(['userId','appId'])
    },
    mounted(){
        this.feedbacks = {
            ...this.feedbacks,
            ...this.feedback

        }
    },
    methods:{
        ...mapMutations('enterIdentify',['changeKey','changeIdentify']),
        ...mapMutations('userCenter',['changeFeedback']),
        //重置
        reset(){
            this.feedbacks = {
                text:'',
                feedbackType:'',//反馈类型
                customerType:3,// 0：游客 1：个人用户 2：企业用户 3 : 英文
                sourceType:2,// 1:中文版, 2:英文版 3:手机端
                backContent:'',//反馈内容
                feedbackPhone:'',//
                feedbackName:'',//
                licenseList:[],
            },
            this.changeFeedback(this.feedbacks)
        },
        //提交
        submit(){
            if(!this.feedbacks.feedbackType){
                this.$toast('Please select the type of feedback')
                return false
            }
            if(!this.feedback.feedbackName){
                this.$toast('Please input your name')
                return false
            }
            if(!this.feedback.feedbackPhone){
                this.$toast('Please input the frequently used phone number')
                return false
            }
            if(!this.feedbacks.backContent){
                this.$toast('Please describe the feedback with words no more than 500')
                return false
            }
            var licenseList = this.feedback.licenseList
            if(licenseList.length>0){
                licenseList.map(item=>{
                    item.path = item.url
                })
            }
            //意见反馈
            var obj = {
                feedback:JSON.stringify({
                    feedbackType:this.feedbacks.feedbackType,
                    contactName:this.feedback.feedbackName,
                    phone:this.feedback.feedbackPhone,
                    backContent:this.feedbacks.backContent,
                    customerType:this.feedbacks.customerType,
                    sourceType:this.feedbacks.sourceType,
                    uploadPictureVoList:licenseList
                })
            }
            this._loading()
            contactCustomer(obj).then(res=>{
                if(res.code == 200){
                    this.$toast('Successful')
                    this.$router.push('/userCenter/mine')
                }
            })
        },
        goChange(path,value){
            this.$router.push({
                path,
                query:{
                    value
                }
            })
             this.changeFeedback({
                text:this.feedbacks.text,
                feedbackType:this.feedbacks.feedbackType,//反馈类型
                backContent:this.feedbacks.backContent
            })
        },
        onConfirm(value,index){
            this.feedbacks.text = value.text
            this.feedbacks.feedbackType = value.value
            this.index = index
            this.show = false
        },
        deleteItem(index){
        let licenseList = JSON.parse(JSON.stringify(this.feedback.licenseList));

        licenseList.splice(index,1)

        this.changeFeedback({
            licenseList
        })

        },
        uploadLicense(file){
            this.changeFeedback({
                licenseList:this.feedback.licenseList.concat(file)
            })
        }
    }
}
</script>
<style lang="stylus">
.feedback
    .shadow-content
        box-shadow:0px 0px 20px 0px rgba(0,0,0,0.05);
    .step1-bg
        background-repeat no-repeat
        background-size cover
        background-position center center
</style>

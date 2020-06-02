<template>
    <div class="contactUs p-t-100 p-b-120">
        <xHeader title="Contact Us"></xHeader>
        <div class="w-per-100 p-lr-32 p-t-48">
            <img class='w-320 h-80 m-b-82' src='../../image/logo.png'/>
            <ul>
                <li class="f-s-c" :class="{'h-208':index==2,'align-s':index==2}" v-for='(item,index) in adressInfo' :key='index' @click="chooseType(index)">
                    <div :class="{'p-t-24':index==2}">
                        <Icon  :type="item.iconLeft" class="f-s-32 c-0145A8 m-r-32"/>
                    </div>
                    <div class="f-b-c f-1 p-tb-24 b-app b-no-lr" :class="{'b-no-tb':index==1}" > 
                        <p class="l-h-40  f-s-28 c-333 f-f-PingFangSC-Regular" :class="{'c-1C71B7':index==0}"> {{item.value}}</p>
                        <Icon v-if='item.iconRight' :type="item.iconRight" class="f-s-32 c-ccc"/>
                    </div>
                </li>
            </ul>
        </div>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <ul class="w-per-100 h-190">
                <li class="h-88 f-c c-1C71B7 f-w-600 b-app f-s-32" @click="callPhone('(+86)010-88052705')">Call</li>
                <li class="h-88 f-c f-s-32" @click="show=false">Cancel</li>
            </ul>
        </van-popup>
    </div>
</template>
<script>
import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup , Popup, Picker,} from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Popup)
  .use(Picker);
export default {
    components: { xHeader },
    data(){
        return {
            index:1,
            columns: ["Call", "Cancel"],
            show:false,
            adressInfo:[
                {
                    iconLeft:'icon-lianxiwomen',
                    value:'(+86) 010-88052705',
                    iconRight:'icon-right'
                },
                {
                    iconLeft:'icon-message1',
                    value:'credit@xinhua.org',
                    
                },
                {
                    iconLeft:'icon-position',
                    value:'Working Area 3, Xinhua News Agency, No. 1, Xuanwumenwai Street A, Xicheng District, Beijing',
                   
                }
            ]
        }
    },
    methods:{
        // 调用拨号功能
        callPhone (phoneNumber) {
           window.location.href = 'tel://' + phoneNumber
        },
        onConfirm(){

        },
         chooseType(index) {
            if(index == 0){
                if (!this.show) {
                    this.show = true;
                }
            }
        },
    }
}
</script>
<style lang="stylus">

</style>

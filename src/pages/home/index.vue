<template>
    <div class="u-h-m" >
        <div class="pv" :class="{act:isInter}">
            <div class="c-home">
                <cHome />
            </div>
            <div>
                <iHome  v-show='isShow'/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import cHome from '../index/home';
import iHome from '../international/home/home';
export default {
    data(){
        return {
            isShow:false
        }
    },
    components:{
        cHome,
        iHome
    },
    mounted(){
        if(!this.isInter){
            setTimeout(()=>{
                this.isShow = false
            },500)
        }else{
            this.isShow = true
        }
    },
    computed:{
        ...mapState(['isInter'])
    },
    watch:{
        isInter(val){
            if(!val){
                setTimeout(()=>{
                    this.isShow = false
                },500)
            }else{
                this.isShow = true
            }
        }
    }
}
</script>
<style scoped>
.u-h-m{
    position: relative;
    overflow: hidden;
}
.pv{
    white-space: nowrap;
    transition: all linear 0.3s;
    font-size: 0;
}
.pv>div{
    vertical-align: top;
    display: inline-block;
    width: 100%;
    transition: ease-in-out 0.32s;
}
.pv.act{
    transform: translateX(-100%);
}
/* .c-home{
    min-height: 100vh;
    background: url('../../image/bg/bg_home.jpg') no-repeat center center;
    background-size:100% 100%
} */
</style>
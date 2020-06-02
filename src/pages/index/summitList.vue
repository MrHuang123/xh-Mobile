<template>
    <div class="summitList p-r p-t-100 p-b-120 bg-color-fff w-per-100">
        <xHeader title="News">
        </xHeader>
        <main class='w-per-100'>
            <!-- <section class="w-per-100 m-b-28 banner p-r">
                <router-link :to='"/summitDetail/" + encodeURIComponent(firstNew.picLinks)'>
                    <img class="w-per-100" :src="firstNew.logoFile"/>
                    <p class="p-a f-s-32 f-w-600 c-fff f-f-PingFangSC t-l white-2">{{firstNew.title}}</p>
                </router-link>
            </section> -->
            <section >
                <van-list
                    style='height:618px'
                    class='f-1 o-x-h' 
                    v-on='$listeners'
                    :finished="finished"
                    :offset="10"
                    finished-text=""
                    loading-text="loading..."
                    @load="params.pageNum>1 && getList()"
                    v-if='list.length'
                >
                    <div class="w-per-100 m-b-28 banner p-r">
                        <router-link :to='{path:"/summitDetail/" + encodeURIComponent(firstNew.picLinks),query:{title:firstNew.title}}'>
                            <img class="w-per-100" :src="firstNew.logoFile" @error='catchError'/>
                            <p class="p-a f-s-32 f-w-600 c-fff f-f-PingFangSC t-l white-2">{{firstNew.title}}</p>
                        </router-link>
                    </div>
                    <ul class="p-tb-15 p-lr-30">
                        <router-link :to='{path:"/summitDetail/"+encodeURIComponent(item.picLinks),query:{title:item.title}}' tag='li' v-for='(item,index) in newList' :key='index' class='d-f m-t-25 '>
                            <img @error='catchError' :src="item.logoFile||picFormat" class='h-164 w-272 m-r-25 b-r-4' />
                            <div class='f-1'>
                                <h3 class='l-h-36 f-s-28 c-333 f-w-600 white-3 h-108'>{{item.title}}</h3>
                                <p class="m-t-25">
                                    <span class='f-s-24 c-999 m-l-5'>{{item.publishDate | enTime}}</span>
                                </p>
                            </div>
                        </router-link>
                    </ul>
                </van-list>
                <NoData v-else />
            </section>
        </main>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import xHeader from "@/layout/header";
import {List, Lazyload} from 'vant';
import axios from 'axios'
import { requestGetInformationNew, getColumnList, selectMomentsNews, selectMoments} from '../../request/axios.summit'

Vue.use(List);

export default {
	components: { xHeader },
	data() {
		return {
            firstNew: {},
            newList: [],
            list:[],
            picFormat:require('../../image/icon/icon_format_pic.png'),
            fetchUrl:'',//獲取列表JSON
            pageTotal:0,
            params: {
                pageSize: 10,
                pageNum: 1
            },
		};
	},
	computed:{
        ...mapState(['lan']),
        finished(){
            return this.list.length >= this.pageTotal && this.pageTotal>0 ;
        },
	},
	mounted() {
		this.getNewsList()
	},
	methods: {
        async getNewsList() {
            selectMomentsNews({
                pageSize: this.params.pageSize,
				pageNo: this.params.pageNum
            }).then(res=>{
                this.pageTotal = res.total;
                this.list = this.list.concat(res.data);
                this.newList = this.list.slice(1);
                this.firstNew = this.list[0];
                res.data.length == this.params.pageSize && (this.params.pageNum+=1);
                this.isUpLoading= false;
            }).catch(()=>{
                this.isUpLoading= false;
            })
        },
        catchError(e){
            e.target.setAttribute('src',this.picFormat)
        },
        getList(page = this.params.pageNum) {
            this.getNewsList();
        }
	}
};
</script>
<style lang="stylus">
.summitList
    main
        .banner
            img 
                height 450px
            p 
                width 100%
                bottom 0
                height 100px
                line-height 50px
                background linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.44) 40%,rgba(0,0,0,0.6) 100%)
                padding 0 32px
</style>

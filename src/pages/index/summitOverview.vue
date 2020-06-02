<template>
  <div class="summit p-r p-t-100 p-b-170 bg-color-F5F5F5 w-per-100">
    <!--  -->
    <xHeader title="Summit Overview">
    </xHeader>
    <main class='w-per-100'>
		<section class="w-per-100 m-b-28 banner p-t-40 bg-fff p-lr-32">
			<img src="../../image/summit/indexBanner.png"/>
			<p class="f-s-28 c-000 f-f-PingFangSC t-l m-tb-18">As a national high-end forum intended to advance the credit system construction of cities, the Forum for Credit System Construction of Chinese Cities focuses on city credit construction and the credit life of citizens, builds an exchange platform for city credit construction, releases credit monitoring results of Chinese cities, explores effective paths for city credit construction, exchanges outstanding experience in city credit construction, emphasizes social credit system construction, and improves the comprehensive development level of cities.</p>
		</section>
		<section class='w-per-100 p-lr-32'>
			<div class="partBox m-b-30">
				<div class="title p-r m-b-20">
                    <p class="clearfix w-per-100">
                        <span class="icon"></span>News
						<router-link to="/summitList">
							<a href="javascript:;" class="f-r more">More</a>
						</router-link>
                    </p>
                </div>
				<div class="newsBox bg-color-fff b-r-8 p-20">
					<div class="new p-r">
						<router-link :to='{path:"/summitDetail/" + encodeURIComponent(firstNew.picLinks),query:{title:firstNew.title}}'>
							<img :src="firstNew.logoFile"/>
							<p class="p-a c-fff p-lr-20 w-per-100 p_out">{{firstNew.title}}</p>
						</router-link>
					</div>
				</div>
			</div>
			<div class="partBox m-b-30">
				<div class="title p-r m-b-20">
                    <p class="clearfix w-per-100">
                        <span class="icon"></span>Agenda & Organizers
                    </p>
                </div>
				<div class="timeBox b-r-8">
					<ul class="p-r">
						<div class="line p-a"></div>
						<li class="clearfix c-fff p-r">
							<span class="icon yellowIcon f-l p-a"></span>
							<span class="time f-l">TIME</span>
							<span class="info f-l">MAJOR ACTIVITIES</span>
						</li>
						<li class="clearfix c-fff p-r">
							<span class="icon f-l p-a"></span>
							<span class="time f-l">Sep 23, 2019  9:00 - 17:30</span>
							<span class="info f-l">Check in</span>
						</li>
						<li class="clearfix c-fff p-r">
							<span class="icon f-l p-a"></span>
							<span class="time f-l">Sep 24, 2019  9:00 - 11:30</span>
							<span class="info f-l">Opening ceremony</span>
						</li>
						<li class="clearfix c-fff p-r">
							<span class="icon f-l p-a"></span>
							<span class="time f-l">Sep 24, 2019  14:30 - 17:30</span>
							<span class="info f-l">Main venue</span>
						</li>
						<li class="clearfix c-fff p-r">
							<span class="icon f-l p-a"></span>
							<span class="time f-l">Sep 25, 2019  09:00 - 12:00</span>
							<span class="info f-l">Multiple themes in branch venues</span>
						</li>
					</ul>
				</div>
				<ul class="whiteBox b-r-8 m-t-30">
					<li class="clearfix">
						<span class="label f-l">Date：</span>
						<span class="text f-l">Sep 23-25, 2019</span>
					</li>
					<li class="clearfix">
						<span class="label f-l">Location：</span>
						<span class="text f-l">Shandong Hotel</span>
					</li>
					<li class="clearfix">
						<span class="label f-l">Guided by：</span>
						<span class="text f-l">National Development and Reform Commission</span>
					</li>
					<li class="clearfix">
						<span class="label f-l">Hosted by:</span>
						<span class="text f-l">Xinhua News Agency Jinan Municipal Government</span>
					</li>
					<li class="clearfix">
						<span class="label f-l">Organized by:</span>
						<span class="text f-l">Jinan Development and Reform Commission</span>
					</li>
				</ul>
			</div>
			<div class="partBox m-b-30">
				<div class="title p-r m-b-20">
                    <p class="clearfix w-per-100">
                        <span class="icon"></span>About Summit
                    </p>
                </div>
				<div class="videoBox b-r-8 bg-color-000 p-20">
					<div class="video p-r">
						<!-- <div class="videoPop p-a"></div> -->
						<video controls="controls" poster="../../image/videoBg.png" loop muted>
							<source src="https://www.credit100.com/xhxy/upload/resources/video/2019/09/27/69356_spd.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
			<div class="partBox m-b-30">
				<div class="title p-r m-b-20">
                    <p class="clearfix w-per-100">
                        <span class="icon"></span>Moments
                    </p>
                </div>
				<div class="imgBox b-r-8 bg-color-fff p-20">
					<van-swipe :autoplay="300000000000000" :show-indicators="false" :touchable="true" :initial-swipe="imgIndex">
						<van-swipe-item v-for="(item, index) in list" :key="index">
							<img @click='previewImg(index)' :v-lazy="item.logoFile" :src="item.logoFile"/>
							<div class="imgNoBox p-a b-r-16 c-fff p-lr-16">{{index+1}}/{{total}}</div>
						</van-swipe-item>
					</van-swipe>
				</div>
			</div>
		</section>
    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import xHeader from "@/layout/header";
import { Swipe, SwipeItem, ImagePreview, Lazyload} from 'vant';
import { requestGetInformationNew, getColumnList, selectMomentsNews, selectMoments} from '../../request/axios.summit'

Vue.use(Swipe).use(SwipeItem).use(ImagePreview);


export default {
	components: { xHeader },
	data() {
		return {
			firstNew: {},
			list: [],
			newList: [],
			params: {
                pageSize: 10,
                pageNum: 1
            },
			total: 0,
			imgIndex: 0,
			isUpLoading:false,
			imgList: []
		};
	},
	computed:{
		...mapState(['lan'])
	},
	mounted() {
		this.getNewsList()
		this.getSelectMomentsNews();
	},
	methods: {
		previewImg(index){
			ImagePreview({
				images: this.imgList,
				startPosition: index,
				// showIndex: false,
				// onChange: async ()=> {
				// 	this.imgIndex = index++;
				// 	let current = this.imgIndex+2;
				// 	this.params.pageNum = current++;
				// 	const index1 = this.imgIndex+1; 
				// 	await this.getNewsList();
				// 	this.previewImg(index1)
				// }
			})
		},
		async getNewsList() {
            selectMoments({
				pageSize: 10000,
				pageNo: this.params.pageNum
			}).then(res=>{
				this.total = res.total;
				this.list = res.data
                // //this.firstNew = res.data[0];
                // this.list = this.list.concat(res.data);
				// this.newList = res.data.slice(1);
				this.getImgList();
				// console.log(this.imgList)
            })
		},
		async getSelectMomentsNews() {
            selectMomentsNews({
				pageSize: this.params.pageSize,
				pageNo: this.params.pageNum
			}).then(res=>{
                this.firstNew = res.data[0];
				//console.log(res)
            })
		},
		getImgList() {
			this.imgList = [];
			for(var i = 0; i < this.list.length; i++) {
				this.imgList.push(this.list[i].logoFile)
			}
		},
		onChange(index) {
			this.imgIndex = index;
			let current = index+1;
			this.params.pageNum = current++;
			this.getNewsList();
		}
	}
};
</script>
<style lang="stylus">
.summit
	main
		.banner
			img 
				width 686px
				height 214px
			p
				line-height 44px
		.partBox
			.title
				p
					font-size 32px
					font-family Arial
					font-weight bold
					height 48px
					line-height 48px
					color rgba(51,51,51,1)
					.icon
						float left
						width 28px
						height 28px
						margin-top 7px
						box-shadow 0px 2px 4px 0px rgba(0,0,0,0.31)
						border 3px solid rgba(5,107,225,1)
						border-radius 100%
						margin-right 10px
					.more
						font-size 24px;
						font-family ArialMT
						color rgba(153,153,153,1)
						background url('../../image/summit/more.png') right center no-repeat
						text-align right
						padding-right 34px
						font-weight normal
			.newsBox
				width 686px
				height 450px
				.new
					.p_out
						overflow: hidden;    
						text-overflow: ellipsis;      //超出部分以省略号显示
						white-space: nowrap;
					img 
						width 100%
						height 404px
					p
						height 80px
						bottom 0
						line-height 80px
						background rgba(0,0,0,0.5)
			.timeBox
				background rgba(5,107,225,1)
				box-shadow 0px 2px 6px 0px rgba(217,217,217,0.5)
				padding 20px
				ul
					.line
						width 4px
						background linear-gradient(180deg,rgba(251,251,251,1) 0%,rgba(246,246,246,0) 100%)
						left 24px
						top 0.75em
						height 720px
					li
						padding-left 60px
						margin-bottom 40px
						.icon
							width 56px
							height 56px
							background url('../../image/summit/white-point.png') no-repeat
							top 0
							left 0
						.yellowIcon
							background url('../../image/summit/yellow-point.png') no-repeat
						.time
							width 200px
							line-height 56px
						.info
							width 340px
							line-height 56px
			.whiteBox
				box-shadow 0px 1px 2px 0px rgba(0,0,0,0.05)
				border 2px solid rgba(5,107,225,1)
				padding-bottom 40px
				li
					padding 40px 10px 0 20px
					.label
						width 220px
						font-size 28px
						font-family PingFangSC
						font-weight 600
						color rgba(51,51,51,1)
					.text
						width 420px
			.videoBox
				width 686px
				height 450px
				.video
					.videoPop
						width 100%
						height 410px
						background url('../../image/summit/newImg.png') no-repeat
						background-size cover
					video
						width 100%
						height 410px
			.imgBox
				width 686px
				height 450px
				.van-swipe
					width 100%
					height 410px
					img
						width 100%
						height 410px
					.imgNoBox
						background rgba(0,0,0,0.44)
						right 20px
						bottom 20px
						

</style>

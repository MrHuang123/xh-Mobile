<template>
  <div class='w-per-100 h-per-100 p-f-xl-yt f-column p-b-120 pos-t-100'>
    <header class='bg-keyword-header h-88 p-r d-f'>
      <div class='f-1 h-per-100 m-l-30 o-x-a o-y-h list-container '>

        <ul class='clearfix h-per-100' :style='{width:width}'>
          <li v-for='(item,index) in keyWordsHot' :key='index' @click='changeItem(item)' class=' f-l keyword-item h-per-100 f-c p-lr-5 m-r-40 p-r '>
            <span :class='item.name==keyWord?"c-333 white-1":"c-999 white-1"' class="f-w-600 ">
              {{item.name }}
            </span>
            <transition name='border'>
              <span v-if="item.name==keyWord" :title='keyWord' class='p-a-xl-yb h-4 w-per-100 bg-blue'></span>
            </transition>
          </li>
        </ul>

      </div>
      <p @click='stretchKeyWordsAll' class='h-per-100 w-88 shadow-menu bg-fff f-c'>
        <img src="../../../image/icon/icon_menu.png" class="h-36 scale-50-active " />
      </p>
    </header>
    <van-list
        class='f-1 p-lr-30  o-x-h' 
        :finished="finished"
        :offset='100'
        finished-text=""
        loading-text='loading...'
        @load="!!fetchUrl&&!fetchUrl.includes('index.json') && getList()"
        v-if='list.length'
    >
      <ul class="p-t-15 p-b-120">
        <li @click='goDetail(item)'  :to='{path:"../detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),query: {title:item.title}}' tag='li' v-for='(item,index) in list' :key='index' class='d-f m-t-25 '>
          <img @error='catchError' v-if='item.artUrl' :src="item.picLinks||picFormat" class='h-164 w-272 m-r-25 b-r-4' />
          <img @error='catchError' v-else-if='item.companyId||item.id' :src="item.coverUrl||picFormat" class='h-164 w-272 m-r-25 b-r-4' />
          <img @error='catchError' v-else :src="item.logoFile||picFormat" class='h-164 w-272 m-r-25 b-r-4' />
          <div class='f-1'>
            <h3 class='l-h-36 f-s-28 c-333 f-w-600 w-o-3 h-108'>{{item.title}}</h3>
            <!-- <p v-if='!!item.source' class='white-1' >
              <Icon type='icon-user4' class='f-s-24 c-999' />
              <span class='f-s-24 c-999 m-l-5'>{{item.source}}</span>
            </p> -->
            <p class="m-t-25">
              <span class='f-s-24 c-999 m-l-5' v-if='item.artUrl'>{{item.pubTime | convertUTC}}</span>
              <span class='f-s-24 c-999 m-l-5' v-else-if='item.companyId||item.id'>{{item.auditTime | enTime}}</span>
              <span class='f-s-24 c-999 m-l-5' v-else>{{item.publishDate | enTime}}</span>
            </p>
          </div>
        </li>
      </ul>
    </van-list>
    <NoData v-else />
    <transition name='slide-left' v-if='isToggle'>
      <div @click.prevent.stop='setFalseToggle' class="left-box ease-400 p-f-xl-yt z-10000 w-per-100 h-per-100 d-f p-r-160" style='background:rgba(0,0,0,.3)'>
        <article @click.prevent.stop='setTrueToggle' class="ease-400 bg-color-fff f-1 d-f f-column p-tb-65 p-lr-30">
          <header class="f-s-c h-35">
            <span class="bg-color-blue h-22 w-4 b-r-4"></span>
            <span class="c-333 f-s-28 m-l-10 l-h-30">Classification</span>
          </header>
          <main class="f-1 b-app b-no-lr b-w-1 m-t-20">
            <ul>
              <li v-for="(item,index) in keyWordsAllRepay" :key='index' class="h-88 f-b-c tab-item ease-400 m-lr--30 p-lr-30" @click='toggleSelected(item)'>
                <span class="f-s-28 f-w-600" :class="item.selected?'c-blue':'c-333'">{{item.name}}</span>
                <transition name='border'>
                  <Icon v-if='item.selected' type='icon-pass' class="c-blue f-w-600 f-s-36" />
                </transition>
              </li>
            </ul>
          </main>
          <footer class="m-t-40 f-b-c">
            <button @click.prevent.stop='setFalseToggle' class="o-active-50 ease-400 h-88 w-240 f-c b-r-44 b-blue-2"><span class="f-s-32 c-blue f-w-600">Cancel</span></button>
            <button @click.prevent.stop='closeKeyWords' class="o-active-50 ease-400 h-88 w-240 f-c b-r-44 bg-linear-header"><span class="f-s-32 c-fff f-w-600">Submit</span></button>
          </footer>
        </article>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import { Popup,List } from 'vant';
import { requestSelectAllColumn,getChinaBrandsColumn,getChinaProjectColumn,getCompanyColumn,getColumnList,getReleaseList } from '../../../request/axios.credit'


Vue.use(Popup).use(List);


export default {
  name:'creditInforList',
  data(){
    return{
      isToggle:false,
      keyWord:'ALL',//请求的新闻类目

      fetchUrl:'',//獲取列表JSON
      pageTotal:0,

      width:"100%",

      isReload:false,

      first:true,

      picFormat:require('../../../image/icon/icon_format_pic.png'),
      

      keyWordsAll:[
      ],

      keyWordsAllRepay:[],


      list:[
      ],
      ChinaBrands:{},
      ChinaProject:{},
      Company:{},
      enterprisePublish:[],
      creditDemonstration:[],
    }
  },
  computed:{
    // ...mapState('creditInfo',['isToggle']),
    keyWordsHot(){
      let list = [];
      this.keyWordsAll.forEach(item=>{
        // item.forEach(unit=>{
          item.selected && list.push(item)
        // })
      })
      return list.sort((a,b)=>b.timeStamp-a.timeStamp) ;
    },
    finished(){
      return this.list.length >= this.pageTotal && this.pageTotal>0 ;
    },
  },
  beforeRouteEnter(to, from, next){
    if(from.path=='/credit/infor/index'){
      sessionStorage.removeItem('keyWordsAll')
    }
    next(vm => {
  
    })
  },
  mounted(){
    this.calContainerWidth();
    this.getSelectAllColumn();
  },
  methods:{
    ...mapMutations(['changeKey']),
    ...mapMutations('creditInfo',{
      changeKeyInfo:'changeKey'
    }),

    initPageInfo(){
      this.pageTotal = 0;
      this.fetchUrl = '';
    },
    //详情
    goDetail(item){
      //:to='{path:"../detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),query: {title:item.title}}'
      if(!!item.id&&!item.artUrl){
        this.$router.push({
          path:"/credit/infor/enterpriseCreditDetail/"+item.id,
          query:{
            title:item.title
          }
        })
      }else{
        this.$router.push({
          path:"/credit/infor/detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),
          query:{
            title:item.title
          }
        })
      }
    },
    changeItem(item){
      this.$router.replace(`./${item.name}`);
      this.initPageInfo();
      this.keyWord=item.name;
      if(item.name == 'Xinhua Enterprise Information'){
        this.fetchUrl = '';
        this.list = this.enterprisePublish
      }else if(item.name == 'Credit Demonstration'){
        this.fetchUrl = '';
        this.list = this.creditDemonstration
      }else{
        this.fetchUrl=item.columnContent;
        this.getList()
      }
      // this.keyWord=item.name;
      // this.fetchUrl=item.columnContent;
      // console.log(item)
      // this.getList()
    },

    // 获取类别+列表
    async getSelectAllColumn(){
      await getChinaBrandsColumn({
        pageNo:1,
        pageSize:1000000
      }).then(res=>{
        this.ChinaBrands = {
          columnName:'China Brands',
          columnContent:res.data,
        }
      })
      await getCompanyColumn({
        pageNo:1,
        pageSize:1000000
      }).then(res=>{
        this.Company = {
          columnName:'Company',
          columnContent:res.data,
        }
      })
      await getChinaProjectColumn({
        pageNo:1,
        pageSize:1000000
      }).then(res=>{
        this.ChinaProject = {
          columnName:'Project',
          columnContent:res.data,
        }
      })
      await getReleaseList({
         type:0,
         currentPage:1,
         pageSize:100000
      }).then(res=>{
        this.enterprisePublish = !!res.data&&!!res.data.pageData?res.data.pageData.list[0]:[]
      })
      await getReleaseList({
         type:2,
         currentPage:1,
         pageSize:100000
      }).then(res=>{
        this.creditDemonstration = !!res.data&&!!res.data.pageData?res.data.pageData.list[0]:[]
      })
      await requestSelectAllColumn()
        .then(res=>{
          let keyWordsAll = [];
          let keyWordsAllObj = {};
          let i=1;
          let $i = 0;
          let dataList = res.data;
          dataList.push(this.ChinaBrands)
          dataList.push(this.Company)
          dataList.push(this.ChinaProject)
          dataList.push({columnName:'Xinhua Enterprise Information',path:''});
          dataList.push({columnName:'Credit Demonstration',path:''});
          dataList.forEach((item,index)=>{
            // const timeStamp = new Date().getTime();
            const obj = {
              name:item.columnName,
              selected:i<10,
              columnContent:item.columnContent,
              timeStamp:res.data.length?res.data.length-index:'',
            };

            if(item.columnName == this.$route.params.type){
              this.initPageInfo();
              
              this.keyWord=item.columnName;
              this.fetchUrl=item.columnContent; 
              $i = index
              // $i>0 && document.querySelector('.list-container').scrollTo(document.querySelectorAll('.keyword-item')[$i].offsetLeft-20,0)
            }
            
            keyWordsAll.push(obj)
          })
          if(sessionStorage.keyWordsAll){
            this.keyWordsAll = JSON.parse(sessionStorage.keyWordsAll)
          }else{
            this.keyWordsAll = keyWordsAll;
          }
          this.$nextTick(()=>{
          this.calContainerWidth();
          // console.log(this.$route.params.type)
          const type = this.$route.params.type
          if(type == 'Xinhua Enterprise Information'){
            this.fetchUrl = '';
            this.list = this.enterprisePublish
          }else if(type == 'Credit Demonstration'){
            this.fetchUrl = '';
            this.list = this.creditDemonstration
          }else{
            this.getList()
          }
          // this.getList();

            setTimeout(()=>{
              
              this.calContainerWidth();
              $i>0 && document.querySelector('.list-container').scrollTo(document.querySelectorAll('.keyword-item')[$i].offsetLeft-20,0)

            },200)
            setTimeout(()=>{
              
              $i>0 && document.querySelector('.list-container').scrollTo(document.querySelectorAll('.keyword-item')[$i].offsetLeft-20,0)

            },300)
          })

        
        })
    },

    // 獲取應用子列表
    async getList(){

      if(this.finished) return false;

      if(this.isLoading) return false;

      if(this.fetchUrl=='') return false;

      this.isLoading = true;

      this.isReload = false;

      this._loading();

     
      
      await getColumnList({
        url:this.fetchUrl,
      })
      .then(res=>{
        this.pageTotal = res.pageTotal?res.pageTotal:res.total;
        var list = res.list?res.list:res.data
        this.list = !res.nextPageUrl || res.nextPageUrl.includes('_2.json') ? list  : this.list.concat(list) ;
        const host = this.fetchUrl.split('/').slice(0,-1).join('/')
        this.fetchUrl = `${host}/${res.nextPageUrl||''}` ;
        setTimeout(()=>{
          this.isLoading = false;
        },500)
      })
      .catch(err=>{
        setTimeout(()=>{
          this.isLoading = false;
          this.list=[];
        })
      })

      this.calContainerWidth()

    },

    selectKeyword(unit){
       if(this.keyWordsHot.length>=11&&!unit.selected){
          this._fail('Up to 11')
          return false ;
       }

       this.isReload = true;

       unit.timeStamp = new Date().getTime();

       unit.selected=!unit.selected

    },

    toggleSelected(item){
      let len = 0;
      for(let i=0;i<this.keyWordsAllRepay.length;i++){
        this.keyWordsAllRepay[i].selected && len ++
      }
      if(len<=1&&item.selected){
        this.$notify('Please choose at least one.')
        return ;
      }
      item.selected = !item.selected;
      item.timeStamp = new Date().getTime();
    },

    closeKeyWords(){
      this.setFalseToggle()
      this.keyWordsAll = undefined;
      this.keyWordsAll = JSON.parse(JSON.stringify(this.keyWordsAllRepay));
      
      sessionStorage.setItem('keyWordsAll',JSON.stringify(this.keyWordsAllRepay))
      this.initPageInfo();

      this.$nextTick(()=>{

        document.querySelector('.keyword-item').click();
      })

      this.$nextTick(()=>{
        this.calContainerWidth();
        this.getList()

        setTimeout(()=>{
          
          this.calContainerWidth();
          document.querySelector('.list-container').scrollTo(0,0)


        },300)
      })

    },
    stretchKeyWordsAll(){
      // if(this.keyWordsAllRepay.length==0) {
        this.keyWordsAllRepay=undefined;
        this.keyWordsAllRepay=JSON.parse(JSON.stringify(this.keyWordsAll))
      // }
      this.setTrueToggle()
    },

    setFalseToggle(){
      this.isToggle = false;
      setTimeout(()=>{
        this.changeKeyInfo({isToggle:false})
      },600)
    },

    setTrueToggle(){
      this.changeKeyInfo({isToggle:true})
      this.isToggle = true;
    },

    catchError(e){
      e.target.setAttribute('src',this.picFormat)
    },

    // 计算ul宽度
    calContainerWidth(){
        let  width = 0;
        const dpi = document.querySelector('html').style.fontSize.split('px')[0]/100 ;

        document.querySelectorAll('.keyword-item').forEach(item=>{
          width += item.offsetWidth + parseInt(70*dpi);
        })
        this.width=width+20+"px";
    },
  }
}
</script>
<style lang="stylus">
.bg-keyword-header
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 8px 0px rgba(0,0,0,0.1);
.shadow-menu
  box-shadow -2px 0px 4px 0px rgba(0,0,0,0.1);
.tab-item
  &:active
    background rgba(#ccc,.5)
.w-o-3
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    word-wrap: break-word; 
</style>

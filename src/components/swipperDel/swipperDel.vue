<template>
  <div class="container">
    <ul>
      <li class="list-item" v-for="(item,index) in bCardList " :key="index" data-type="0">
        <div
          class="list-box"
          @touchstart.capture="touchStart"
          @touchend.capture="touchEnd"
          @click="skip"
        >
           <div class="p-lr-32 h-144 w-per-100">
                <router-link tag='div' :to='"/notificationCenter/detail/"+item.id+"/"+type' class="f-s-c  border h-144 w-per-100">
                      <img v-if="item.logo" class="h-80 w-80 b-r-circle m-r-24"  :src="item.logo">
                      <div v-else class="h-80 w-80 bg-linear-ellipse f-c b-r-circle m-r-24 m-b-2 p-r">
                        <span v-if='item.state==2' class="p-a-xr-yt span_possion w-16 h-16 b-r-circle bg-color-C63639"></span>
                        <div class="h-32 w-32 ">
                            <Icon type="icon-enterprise" class="c-1C71B7 f-s-32 "/>
                        </div>
                    </div>
                    <div class="w-582">
                        <p   class="f-s-24 c-333 f-f-ArialMT l-h-32 white-2 m-b-12">{{item.companyName}}</p>
                        <p class="c-999 f-s-22 f-f-ArialMT l-h-24">{{item.date|enTime}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="f-s-28   bg-color-C63639 c-fff f-c delete" @click.stop="deleteItem(item.id)" >Delete</div>
      </li>
    </ul>
  </div>
</template>
<script>
// Vue.prototype.globalClick = function (callback) {
//   document.getElementsByTagName('body')[0].onclick = function () {
//       callback();
//   };
// };
export default {
  props:['bCardList','type'],
  data() {
    return {
    
      startX: 0,
      endX: 0,
      imgUrl:[]
    };
  },
  mounted(){
    var that = this
     document.body.addEventListener('click',function( event ){
        that.restSlide();
    })
  },
  methods: {
    //跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
       
      }
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem(id) {
      this.$emit('delItem',id)
    }
  }
};
</script>
<style lang="stylus">
.list-item{
  position: relative;
  height: 144px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type="0"]{
  transform: translate3d(0,0,0);
}
.list-item[data-type="1"]{
  transform: translate3d(-1.2rem,0,0);
}

.list-box{
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}


.list-item .delete{
  width: 1.2rem;
  height: 144px;
  color: #fff;
  text-align: center;
  position: absolute;
  top:0;
  right: -1.21rem;
}
</style>

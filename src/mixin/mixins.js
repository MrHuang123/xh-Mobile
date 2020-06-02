import {Toast} from 'vant'
import {mapMutations,mapActions} from 'vuex'

Vue.mixin({
  methods: {
    ...mapMutations(["updateWxShareTitle"]),
    ...mapActions(['setWxShare']),
    labekKeyWord: function (v,keyWord) {
      // let newV = v ;

      // keyWord.split('')
      //   .forEach(item=>{
      //     !!item && newV[newV.indexOf(item)-1]!='<' && newV[newV.indexOf(item)+1]!='>' && (newV = newV.replace(new RegExp(item, "g"), `<i>${item}</i>`) )
      //   })
      if(!v||String(v)=='null'||String(v)=='undefined'){
        return ''
      }
      keyWord = '('+keyWord.replace(/([\+\(\)\.\*\|\?\-\(\[\^\$])/g,'\\$1' ).replace(/\s+/g,'|')+')';//把匹配关键字中的正则符转义
      var patt=new RegExp(keyWord ,'igm');
      return v.replace(patt,"<span class='c-blue'>$1</span>");

      // let newV = '';
      // v.split('')
      //     .forEach(item=>{
      //       newV+= (!!item && keyWord.toLowerCase().includes(item.toLowerCase())) ? `<i class='c-red'>${item}</i>` : item;
      //     })
      // return newV ;
      // if (this.keyWord == '') return v;
      // return v.replace(new RegExp(this.keyWord, "g"), `<span class="c-1C71B7">${this.keyWord}</span>`);
    },
    _toast(message='toast'){
      Toast({
        message,
        duration:2500,
      })
    },
    _loading(message='loading...'){
      Toast.loading({
        message,
        duration:0,
        mask:true,
        forbidClick:false,
      })
    },
    _Verifying(message='Verifying...'){
      Toast.loading({
        message,
        duration:0,
        mask:false,
        forbidClick:false,
      })
    },
    _success(message='Success'){
      Toast.success({
        message,
        duration:3000,
        mask:false,
        forbidClick:false,
      })
    },
    _fail(message="Error"){
      Toast.fail({
        message,
        duration:3000,
        mask:false,
        forbidClick:false,
      })
    },
    _clear(){
      let timer = setTimeout(()=>{
        clearTimeout(timer);
        Toast.clear()
      },400)
    },
    encodeURIComponent(url){
      return encodeURIComponent(url)
    },
    replaceFormatImg(e){
      console.log(e)
      // e.target.src = require('../image/format.png')
    }
  }
})
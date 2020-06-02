<template>
  <form ref='form' class='w-per-100 h-per-100 p-a-xl-yt d-f   f-c'>
    <img src="../../image//userCenter/upload.png"  />
    <input type="file" :multiple='length>1'  @change='upload' :accept="accept" class='o-0 p-a w-per-100 h-per-100' />
  </form>
</template>
<script>
import { mapState } from 'vuex'
import { localUpload,getDownUrl } from '*/request/axios.common'


export default {
  props:{
    accept:{
      default:'image/*',
      type:String
    },
    length:{
      default:1,
      type:Number
    }
  },
  computed:{
    ...mapState(['appId','userId'])
  },
  methods:{
    upload(e){
      if(e.target.files.length===0) return false;

      const files = [...new Set(e.target.files)].splice(0,this.length);
    
      files.forEach(file=>
      {
        const name = file.name ;
        // console.log(this.accept.includes(name.split('.').reverse()[0]))
        // if(!this.accept.includes(name.split('.').reverse()[0])){
        //   this.$notify('Picture format only')
        //   return ;
        // }

        const fd = new FormData();

        fd.append('appId',this.appId);
        fd.append('userId',this.userId);
        fd.append('fileName',name);
        fd.append('file',file);

        this.$nextTick(()=>{
          this.$refs.form.reset()
        })

        localUpload(fd)
          .then(res=>{

            // getDownUrl({fileId:res.data.fileId})
            //   .then(data=>{
                
            //     this.$emit('cb',Object.assign({},res.data,{
            //       // url:window.config.download+res.data.fileId
            //       url:data.data.url
            //     }))
              
            //   })
            this.$emit('cb',{
              icon:"image."+res.data.fileType,
              name:res.data.fileName,
              uploadDate:Date.now(),
              url:window.config.download+res.data.fileId
            })

          })
      })

    }
  }
}
</script>

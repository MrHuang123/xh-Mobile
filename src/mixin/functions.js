Vue.component('Icon',{
  render(){
    return <i onClick={()=>{
      this.$emit('click')
    }} class={"iconfont "+this.type}></i>
  },
  props:{
    type:{
      type:String,
      isRequired:true,
    }
  }
})


Vue.component('NoData',{
  render(){
    return <p   class='p-f-c f-column f-c m-t-122'>
      <img  src={require("../image/icon/icon_no_data.png")} class='w-100' />
      <span class='f-s-26 c-999 t-c m-t-10'>NO DATA</span>
    </p>
  },
  mounted(){

  },
})
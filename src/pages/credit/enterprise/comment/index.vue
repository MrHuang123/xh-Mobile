<template>
  
  <div class='m-t-15 p-lr-30'>
    <ul>
      <router-link v-for='(item,index) in list' :key='index' tag='li' :to='item.path' class='h-90 f-s-c'>
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 break-word white-1'>
          {{item.title}}
          </span>
          <span class='f-c'>
            <!-- <span class='f-s-28 c-666 m-r-15'>{{item.num}}</span> -->
            <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
          </span>
        </p>
      </router-link>
    </ul>
  </div>

</template>
<script>
export default {
  data(){
    return {
      list:[
        {icon:'icon-data',path:'grade',title:'Credit Scoring Model',num:''},
        {icon:'icon-graph',path:'noFinancial',title:'Non-financial Evaluation Model',num:''},
        {icon:'icon-trend',path:'dynamicModel',title:'Dynamic Financial Warning Model',num:''},
        {icon:'icon-compare',path:'competitive',title:'Competitive Advantage Model',num:''},
      ]
    }
  }
}
</script>

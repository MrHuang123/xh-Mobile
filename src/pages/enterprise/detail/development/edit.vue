<template>
  <div class='p-t-100'>
    <xHeader title='Increase' />
    <main class='p-t-15 p-lr-30'>
      
      <section class='h-90 p-r'>
        <p class='w-per-100 h-per-100 f-s-c f-s-28 c-333 f-w-600' >
          <span>
          2019/09/02
          </span>
        </p>
        <p class='p-a-xl-yb h-2 w-per-100 bg-color-1C71B7'></p>
      </section>      
      
      <section class='m-t-25'>
        <textarea class='l-h-40 h-300 w-per-100 f-s-28 f-w-600 c-333'>
          Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </textarea>
      </section>

    </main>
    <footer>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :item-height='88'
        confirm-button-text='OK'
        cancel-button-text='Cancel'
        class='p-f-xl-yb w-per-100 '

      />

      <button class='p-f-xc-yb m-b-80 b-r-32 b-1-ccc b-w-1 h-65 w-180' >
        <Icon type='icon-trash' class='c-C63639 f-s-28'/>
        <span>&nbsp;Delete</span>
      </button>

    </footer>
  </div>
</template>
<script>
import xHeader from '@/layout/header'
import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);

export default {
  components:{
    xHeader
  },
  data(){
    return{
      currentDate: new Date()
    }
  }
}
</script>

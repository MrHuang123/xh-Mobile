Vue.filter('convertYYYYMMDDhhmmss',timeS=>{
  const time = Number(timeS)
  const YYYY = new Date(time).getFullYear();
  const MM = toFixed2(new Date(time).getMonth()+1);
  const DD = toFixed2(new Date(time).getDate());
  const hh = toFixed2(new Date(time).getHours());
  const mm = toFixed2(new Date(time).getMinutes());
  const ss = toFixed2(new Date(time).getSeconds());
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
})

Vue.filter('convertUTC',(time)=>{
  const TIME = Number(time);

  const M = new Date(TIME).toDateString().split(' ')[1];
  const D = `0${new Date(TIME).getDate()}`.slice(-2);
  const Y = new Date(TIME).getFullYear();
  const h = `0${new Date(TIME).getHours()}`.slice(-2);
  const m = `0${new Date(TIME).getMinutes()}`.slice(-2);
  return `${M} ${D},${Y} ${h}:${m}`
})
Vue.filter('enTime',(time)=>{
  // console.log(time.replace(/-/g, "/"))
  if(time){
    const replaceTime = time.replace(/-/g, "/")
    const TIME = Number(new Date(replaceTime).getTime());
    const M = new Date(TIME).toDateString().split(' ')[1];
    const D = `0${new Date(TIME).getDate()}`.slice(-2);
    const Y = new Date(TIME).getFullYear();
    const h = `0${new Date(TIME).getHours()}`.slice(-2);
    const m = `0${new Date(TIME).getMinutes()}`.slice(-2);
    const ss = `0${new Date(TIME).getSeconds()}`.slice(-2);
    return `${M} ${D},${Y} ${h}:${m}:${ss}`
  }else{
    return
  }
})
Vue.filter('convertDate',date=>{
  return String(date) == 'undefined' || String(date) == 'null' ? '' : String(date).trim().split(' ')[0]
})
const toFixed2 = v => `0${v}`.slice(-2)
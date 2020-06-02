export default {
  areas(state){
    let province_list = {};
    let city_list = {};

    state.provinces&&state.provinces.forEach(item=>{
      province_list[item.provinceCode] = item.provinceEn
    })

    state.citys&&state.citys.forEach(item=>{
      city_list[item.cityCode] = item.cityEn
    })


    return {
      province_list,
      city_list,
    }

  },
  bankList(state){
    let province_list = {};
    // let code = 10;
    // const strs = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v']
    // state.banks.forEach((item,index)=>{
    //   console.log(code)
    //   const id = (String(code) + String(new Date().getTime())).slice(0,6)
    //   // const id = (index+''+index+''+item.bankId).slice(-6)
    //   province_list[id] = item.bankName;
    //   code = Number(code) + 1;
    // })
    // console.log(province_list)

    return {
      province_list
    }

  }
}
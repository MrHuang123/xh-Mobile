Vue.directive('focusInput',{
  bind(el){
    el.className+=' ease-400 ';
    el.style.borderColor = '#eee'
  },
  inserted:(el,binding)=>{
    el.onfocus=()=>{
      el.style.borderColor='#1C71B7';
    }
    el.onblur=()=>{
      el.style.borderColor=binding.value||'#eee'
    }
    el.focus();
  }
})

Vue.directive('focusInputBottom',{
  bind(el){
    el.className+=' ease-400 b-app b-no-lr b-no-t ';
    el.style.borderColor = '#eee'
  },
  inserted:(el,binding)=>{
    el.onfocus=()=>{
      el.style.borderColor='#1C71B7';
    }
    el.onblur=()=>{
      el.style.borderColor=binding.value||'#eee'
    }
    el.focus()
  }
})

Vue.directive('focusVant',{
  bind(el){
    el.querySelector('.van-search__content').className+=' ease-400 ';
    el.querySelector('.van-search__content').style.borderColor = '#eee'
  },
  inserted:(el,binding)=>{
    el.querySelector('input').onfocus=()=>{
      el.querySelector('.van-search__content').style.borderColor='#1C71B7';
    }
    el.querySelector('input').onblur=()=>{
      el.querySelector('.van-search__content').style.borderColor=binding.value||'#eee'
    }
  }
})


Vue.directive('number',{
  inserted:el=>{
    el.oninput = ()=>{
      
      el.value = el.value.replace(/[^\d]/ig,"")
    
    };
    el.onkeyup = () => {
      
      el.value = el.value.replace(/[^\d]/ig,"")

    }
  }
})

Vue.directive('focusInputSectionBottom',{
  inserted:(el,binding)=>{
    el.parentNode.className+=' ease-400  b-no-lr b-no-t ';
    el.parentNode.style.borderColor = '#eee'
    // console.log(el.parentNode)
    el.onfocus=()=>{
      el.parentNode.style.borderColor='#1C71B7';
    }
    el.onblur=()=>{
      el.parentNode.style.borderColor='#eee'
    }
  }
})
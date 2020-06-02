// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {},
    "postcss-plugin-px2rem": {
      remUnit: 100,
      mediaQuery: true,
      exclude:"/node_modules/i",
      selectorBlackList: ['html', 'mint-', 'mt-', 'mpvue-', 'calendar', 'iconfont'], //在rem.js全局作用下   排除指定的文件的影响
      propBlackList: ['border']
    }
  },
  'globals': {
        "Swiper": true
    } //这个地方是新加入的   全局注入
}

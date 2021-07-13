// postcss.config.js
// postcss是基于Node.js运行的一个处理CSS的工具
// postcss配置文件需要导出一个对象
module.exports = {
// 配置要使用的相关插件
  plugins: {
    // Vuecli已经内部默认配置autoprefixer（.browserslistrc），不需要再进行配置
    'postcss-pxtorem': {
      // 正常情况按照设计稿
      // 750宽的设计稿，750 / 10 =75
      // Vant组件库基于逻辑像素375写的，设计稿基于物理像素750写的，所以设计时为测量数据/2
      rootValue: 37.5,

      // 需要转换的CSS属性，*是代表所有属性都要转换
      propList: ['*']
    }
  }
}

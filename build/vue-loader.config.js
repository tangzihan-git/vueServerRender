module.exports=(isDev)=>{
    return  {
        preserveWhitepace: true, //清除文本换行等情况空格
        extractCSS: isDev ? false : true, // 把vue的css提取到单独的文件，默认
        cssModules: {   localIdentName: '[path]-[name]', camcelcase: true  }, // 用法：<style module> 将icon-text转换 iconText
        hotReload: true, // 热更新，默认会自动判断是否开发环境自动开启关闭，其实关闭  n 后也会刷新页面更新
    } 
}
/**
 * 
 * npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node  -
 * D
 * eslint-plugin-html 
 */
/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-05-04 18:13:32
 * @LastEditors: lxw
 * @LastEditTime: 2020-05-04 21:08:55
 */
// 加￥符号是为了尽量避免全局污染
const $appStorageData = {
    version: '1.0',
    userinfo: '暂无',
    theme: 'blue',
    userPlaninfo: {
        key1: 'fsdfjslfs',
        key2: 'fsfdsf'
    }
}
// localStorage的配置参数,long配置缓存字段更新后缓存的有效时间，比如今天更新内容，单位毫秒记住单位是毫秒毫秒，比如设置120秒就是120000 同时更新资源，120秒后缓存失效，提供回调函数监听，做出对应的处理 
const $localOpt = {
    long:30000 // 30秒
}
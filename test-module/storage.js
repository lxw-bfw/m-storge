/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-05-03 20:27:13
 * @LastEditors: lxw
 * @LastEditTime: 2020-05-04 21:28:20
 */
import Storage from '../lib/mStorage';


// 建立一个存放需要持久化(即缓存的信息字段)字段的封装对象
const appStorageData = {
    version:'1.0',
    userinfo:'暂无',
    theme:'blue',
    userPlaninfo:{
        key1:'fsdfjslfs',
        key2:'fsfdsf'
    }
}

// localStorage的配置参数,long配置缓存字段更新后缓存的有效时间，比如今天更新内容，单位毫秒记住单位是毫秒毫秒，比如设置120秒就是120000 同时更新资源，120秒后缓存失效，提供回调函数监听，做出对应的处理 
let localStorageConfiguration = {long:120000}

 // 传入封装持久化字段的对象初始
 // 会对传入的对象参数的每一个属性注册监听get与set，
 // 主要此时不会被执行持久化操作，需要某个字段内容被持久化，需要手动设置属性值。比如 appStorageData.version = xxx 才会触发持久化操作
let storage = new Storage(appStorageData,localStorageConfiguration)

// 为字段配置缓存说明,默认为无，可以根据需要配置
 // 添加缓存说明，比如userPlaninfo缓存的是用户个人计划
// 第一个参数kye要与对应缓存字段key一致
storage.addReason('userinfo','缓存用户个人信息')
storage.addReason('userPlaninfo','缓存用户个人计划')


// 设置
appStorageData.userinfo = '我叫xxxx'
// 可以直接传递对象类型进行缓存
appStorageData.userinfo = {
    name:'lxw',
    age:23,
    hobbies:['篮球','编程','小说','游戏',],
    introduce:'乘风破浪会有时，直挂云帆济沧海'
}




export { cachData, storage}




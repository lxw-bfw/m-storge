/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-05-03 16:04:30
 * @LastEditors: lxw
 * @LastEditTime: 2020-05-03 17:18:07
 */
/**
 * 
 * 集中式的持久数据管理，通过cacheData对象传入所有需要用到的缓存字段
 * 
 * 类，属性响应式更新、自动持久与获取，每次都从缓存中进行获取
 * 
 * 提供一个注册缓存属性，比如我需要缓存用户信息，就传入一个userInfo什么的字段，内部方法提供设置字段方法设置后自动更新
 * 
 * 单例模式，整个应用只有这一个对象实例
 * 
 */

class Storage {
    /**
     * @name: 
     * @description: 
     * @msg: 
     * @param {Object} cacheData
     * cacheData : 任何需要持久化的字段
     * @return: 
     */
    constructor(cacheData, storageOpt) {
        if (typeof cacheData !== 'object') {
            throw TypeError('构造函数参数必须是一个对象类型')
        }
        this.reasonObj = {} // 缓存原有说明，比如userinfo用于缓存用户信息等说
        this.init(cacheData)
    }
    init(cacheData) {
        // 监听属性的设置和获取
        if (typeof cacheData !== 'object') {
            return
        }
        for (const key in cacheData) {
            if (cacheData.hasOwnProperty(key)) {
                localStorage.setItem(key,cacheData[key])
                this.watcher(cacheData, key, cacheData[key])

            }
        }
    }
    watcher(cacheData, key, val) {
         
        Object.defineProperty(cacheData, key, {
            get: () => {
                return localStorage.getItem(key)
            },
            set: (value) => {
                console.log(this)
                console.log(`本页面使用了本地缓存，缓存字段为${key},缓存目的说明${this.reasonObj[key]? this.reasonObj[key]:'无'}`)
                localStorage.setItem(key, value)
            },
            configurable: false,
            enumerable: false
        })


    }
    addCacheData(proper, value,reason) {
        this.cacheData[proper] = value
    }

    addReason(key,reason){
        this.reasonObj[key] = reason
    }



}
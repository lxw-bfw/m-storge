/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-05-03 16:04:30
 * @LastEditors: lxw
 * @LastEditTime: 2020-05-04 21:54:48
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
        if (typeof cacheData !== 'object' || typeof storageOpt !== 'object') {
            throw TypeError('构造函数参数必须是一个对象类型')
        }
        if (typeof storageOpt.long !== 'number') {
            throw TypeError('storageOpt属性long必须为整数类型')
        }
        this.reasonObj = {} // 缓存原有说明，比如userinfo用于缓存用户信息等说
        this.storageOpt = { long: 30 * 24 * 3600 * 1000 } // 默认整个所有字段的缓存有效时间是30天默认单位是毫秒，默认有效时间是30天也
        this.storageOpt = Object.assign(this.storageOpt, storageOpt)
        console.log(this.storageOpt)
        this.expireCb = null // 过期触发
        this.errorCb = null  // 异常错误触发
        this.init(cacheData)
    }
    init(cacheData) {
        // 监听属性的设置和获取
        for (const key in cacheData) {
            if (cacheData.hasOwnProperty(key)) {
                this.watcher(cacheData, key, cacheData[key])

            }
        }
    }
    watcher(cacheData, key, val) {

        //  由于是值的缓存，cacheData实例属性监听即可，如果属性本身也是一个对象无需对这个对象的属性进行监听，所以不用递归

        Object.defineProperty(cacheData, key, {
            get: () => {
                return this.getItem(key)
            },
            set: (value) => {
                console.log(`本页面使用了本地缓存，缓存字段为${key},缓存原因说明：${this.reasonObj[key] ? this.reasonObj[key] : '无'}`)
                //异常捕获
                try {
                    this.setItem(key, value)
                } catch (error) {
                    if (typeof this.errorCb !== 'function') {
                    } else {
                        this.errorCb(error)
                    }

                    // if(error.name == 'QuotaExceededError'){
                    //     console.log('已经超出本地存储限定大小！');
                    // // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
                    // // 这里触发回调函数暴露给用户处理，用户如果没有监听此异常捕获的回调函数就自行默认不处理

                    // }
                }

            },
            configurable: false,
            enumerable: false
        })


    }
    // 封装本地缓存setItem方法，优化了对象类型的存储
    // 记录当前缓存创建的时间，方便获取的时候判断缓存是否失效。
    setItem(key, val) {
        if (typeof val === 'object') {
            val = JSON.stringify(val)
            // 标记类型
            localStorage.setItem(`${key}-type`, 'object')
        }
        localStorage.setItem(key, val)
        // 缓存创建的时间,每更新一个值就缓存当前创建的时间
        localStorage.setItem(`${key}-date`, new Date().getTime())
    }
    // 封装本地缓存getItem方法，根据如果key对应原本的数据类型是对象类型，返回加入JSONparse进行转换为对象类型
    // 判断缓存的否过期
    getItem(key) {
        let createTme = parseInt(localStorage.getItem(`${key}-date`))
        let alredyTime = new Date().getTime() - createTme
        if (alredyTime >= this.storageOpt.long) {
            console.log('缓存已经当前缓存已经过期，请重新设置')
            // 触发回调函数
            if (typeof this.expireCb !== 'function') {
                throw TypeError('当前字段缓存已经失效了，请调用实例方法expTime注册监听缓存失效函数')
            }
            this.expireCb(key)
        }

        if (localStorage.getItem(`${key}-type`) === 'object') {
            return JSON.parse(localStorage.getItem(key))
        }
        return localStorage.getItem(key)
    }

    addReason(key, reason) {
        this.reasonObj[key] = reason
    }

    //监听缓存是否失效,如果缓存失效了触发这里的回调函数
    then(isExp, errorBack) {
        this.expireCb = (key) => {
            isExp(key)
        }
        this.errorCb = (err) => {
            errorBack(err)
        }
    }

}

// export default Storage
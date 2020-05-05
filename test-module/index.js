import { cachData, storage } from "./storage.js"

// 提示：在获取缓存内容的时候需要先显示判断注册回调函数监听缓存是否过期，否则会报错,第一个参数
// 第二个参数可选：监听异常错误，如果缓存出现了异常错误，比如缓存已经满了
storage.then((key) => {
    // 缓存失效处理
    alert(`监听到缓存字段${key}已经失效了`)
    // 重新获取和设置key内容
}, (err) => {
    if (err.name == 'QuotaExceededError') {
        console.log('已经超出本地存储限定大小！');
        // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
        // localStorage.clear();
        // localStorage.setItem(key,value);
    }
})

// 获取需要字段的缓存内容,同一个字段建议一次性取了，否则会重复触发缓存字段
let userInfo = appStorageData.userinfo



// 获取
// 获取操作是直接通过我们封装缓存字段的对象来实现的
// 设置后可以在其他页面，导入封装对象，使用对象语法来直接获取
console.log(userInfo);
console.log(userInfo.introduce)
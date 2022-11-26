// 重写push和replace方法
import VueRouter from 'vue-router'
/**
 * @param {跳转位置} location 
 * @param {成功回调} resolve 
 * @param {失败回调} reject 
 */
// 重写push
 let myPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location,resolve,reject) {
  if (resolve && reject) {
    // call,apply的区别
    // 相同点:都可以调用函数一次，都可改函数上下文一波
    // 不同点:call和apply传递参数用逗号隔开，apply方执行，传递数组
     myPush.call(this,location,resolve,reject)
  } else {
     myPush.call(this, location, () => {},()=>{})
  }
}
// 重写replace
let myReplace = VueRouter.prototype.push;
VueRouter.prototype.myReplace = function (location,resolve,reject) {
  if (resolve && reject) {
    myReplace.call(this,location,resolve,reject)
  } else {
    myReplace.call(this, location, () => {},()=>{})
  }
}


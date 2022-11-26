// 封装的中间件函数
export const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      // 指令所在van-search组件
      // 组件标签是div,input在内部，要继续往下找,实现自动聚焦，Vue.use会调用inserted方法，指令时必须使用该方法
      inserted (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus() // 如果绑定的对象是输入框直接获取
        } else {
          setTimeout(() => {
             // 如果绑定的对象不是输入框，则往里面找
            const theInput = el.querySelector('input')
            theInput.focus()
          })
        }
      },
      update (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus() // 如果绑定的对象是输入框直接获取
        } else {
          setTimeout(() => {
             // 如果绑定的对象不是输入框，则往里面找
            const theInput = el.querySelector('input')
            theInput.focus()
          }, 500)
        }
      }
    })
  }
}

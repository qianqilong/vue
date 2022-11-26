import type { App } from 'vue'
import defaultImg from '@/assets/images/200.png'

export const defineDirective = (app: App) => {
  app.directive('lazyload', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        // // isIntersecting 是否进入可视区域，true是进入 false是移出
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observer.unobserve(el)
            // 发生错误
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0.01,
        },
      )
      //   观察指令挂载的dom
      observer.observe(el)
    },
  })
}

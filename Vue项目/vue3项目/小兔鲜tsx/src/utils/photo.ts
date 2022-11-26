import defaultImg from '@/assets/images/200.png'
export const photo = [
  'https://yanxuan-item.nosdn.127.net/30959f7fcf980de2be0a6e1937938d45.png?quality=95&thumbnail=610x610&imageView',
  'https://yanxuan-item.nosdn.127.net/0d7d091a10faf1c22027046f517511cf.png?quality=95&thumbnail=610x610&imageView',
  'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/home_goods_cover.jpg',
  'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/kitchen_goods_cover.jpg'
]
// 指令
export const defineDirective = (app:any) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el:any, binding:any) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}

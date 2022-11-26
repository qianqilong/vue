import { defineComponent, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import './xtx-carousel.less'
export default defineComponent({
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props:any) {
    const index = ref(0)
    // 自动播放
    let timer:any = null
    // 播放的定时器
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 有数据&开启自动播放，才调用自动播放函数
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    return () => (
   <div class='xtx-carousel'>
    <ul class="carousel-body" >
    {
      props.sliders
        ? props.sliders.map((item:any, i:number) => {
          return (
            item.hrefUrl
              ? <li key={i} class={`carousel-item ${index.value === i ? 'fade' : ''}`}>
                 <RouterLink to="/">
                   <img v-lazyload={item.imgUrl} alt=""/>
                 </RouterLink>
                </li>
              : <li key={i} class={`slider carousel-item ${index.value === i ? 'fade' : ''}`}>
                {
                  item.map((goods:any) => {
                    return (
                    <RouterLink to="/" key={goods.id}>
                    <img src={goods.picture} alt=""/>
                    <p class="name ellipsis">{goods.name}</p>
                    <p class="price">&yen;{goods.price}</p>
                    </RouterLink>
                    )
                  })
                }
                </li>
          )
        })
        : ''
    }
</ul>
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left" onClick={() => { index.value-- }}></i></a>
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right" onClick={() => { index.value++ }}></i></a>
    <div class="carousel-indicator">
    {
      props.sliders
        ? props.sliders.map((item:any, i:number) => {
          return (
            <span class={index.value === i ? 'active' : ''} key={i} onClick={() => { index.value = i }}></span>
          )
        })
        : ''
    }
    </div>
  </div>
    )
  }
})

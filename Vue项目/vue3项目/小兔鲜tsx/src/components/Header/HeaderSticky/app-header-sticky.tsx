import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import './app-header-sticky.less'
import HeaderItem from '../HeaderItem/app-header-item'
export default defineComponent({
  name: 'HeaderSticky',
  setup () {
    const styleObj = {
      display: 'none'
    }
    // const Y = ref(0)
    // // 滚动时更新
    // onMounted(() => {
    //   window.onscroll = () => {
    //     const scrollTop = document.documentElement.scrollTop
    //     Y.value = scrollTop
    //   }
    // })
    const { y } = useWindowScroll()
    return () => (
    <div class={`app-header-sticky ${y.value >= 78 ? 'show' : ''}`}>
    <div class="container">
      <RouterLink class="logo" to="/" />
      <HeaderItem style={y.value <= 78 ? styleObj : ''}/>
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
    )
  }
})

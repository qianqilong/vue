import { defineComponent, ref } from 'vue'
import XtxCarousel from '../xtx-carousel/xtx-carousel'
import { findbBannerAPI } from '@/api'
import './home-banner.less'
export default defineComponent({
  name: 'Homebanner',
  setup () {
    const sliders = ref([])
    findbBannerAPI().then((data:any) => {
      sliders.value = data.result
    })
    return () => (
        <div class="home-banner">
        <XtxCarousel sliders={sliders.value} autoPlay={true}/>
      </div>
    )
  }
})

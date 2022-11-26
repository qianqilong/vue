import { defineComponent } from 'vue'
import HomeCategory from '@/components/Homecategory/home-category'
import HomeBanner from '@/components/home-banner/home-banner'
import HomeNew from '@/components/HomeNew/HomeNew'
import HomeHot from '@/components/HomeHot/HomeHot'
import HomeBrand from '@/components/home-brand/home-brand'
import HomeNavs from '@/components/home-navs/home-navs'
import HomeSpecial from '@/components/home-special/home-special'
export default defineComponent({
  name: 'Home',
  setup () {
    return () => (
      <div class="page-home">
      <div class="home-entry">
        <div class="container">
          {/* <!-- 左侧分类 --> */}
          <HomeCategory/>
          {/* 轮播图 */}
          <HomeBanner />
          <HomeNew/>
          <HomeHot/>
          <HomeBrand/>
          <HomeNavs/>
          <HomeSpecial/>
        </div>
      </div>
    </div>
    )
  }

})

import { defineComponent } from 'vue'

import header from '@/components/Header/app-header.module.less'
import HeaderItem from './HeaderItem/app-header-item'
import { RouterLink } from 'vue-router'
import AppHeaderCart from '../app-header-cart/app-header-cart'
export default defineComponent({
  name: 'Header',
  setup () {
    // 获取用户的登录信息

    return () => (
        <header class={header['app-header']}>
        <div class="container" style={{ display: 'flex', alignItems: ' center' }}>
          <h1 class={header.logo}><RouterLink to="/">小兔鲜</RouterLink></h1>
          <HeaderItem/>
          <div class={header.search}>
            <i class='icon-search iconfont'></i>
            <input type="text" placeholder="搜一搜"/>
          </div>
          {/* <div class={header.cart}>
            <a class={header.curr} href="#">
              <i class='icon-cart iconfont' style={{ fontSize: '22px' }}></i><em>2</em>
            </a>
          </div> */}
           <AppHeaderCart />
        </div>
      </header>
    )
  }
})

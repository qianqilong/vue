import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './login-header.less'
export default defineComponent({
  name: 'Loginheader',
  setup () {
    return () => (
       <header class="login-header">
        <div class="container">
          <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
          <h3 class="sub"><slot /></h3>
          <RouterLink class="entry" to="/">
            进入网站首页
            <i class="iconfont icon-angle-right"></i>
            <i class="iconfont icon-angle-right"></i>
          </RouterLink>
        </div>
      </header>
    )
  }
})

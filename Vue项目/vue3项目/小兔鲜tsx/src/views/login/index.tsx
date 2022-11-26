import { defineComponent, ref } from 'vue'
import LoginHeader from '@/components/login-header/login-header'
import LoginFooter from '@/components/login-footer/login-footer'
import LoginForm from '@/components/login-form/login-form'
import './index.less'
export default defineComponent({
  name: 'Login',
  setup () {
    const activeName = ref('account')
    return () => (
        <div class="page-login">
        <LoginHeader/>
  <section class="login-section">
  <div class="wrapper">
      <nav>
        <a href="javascript:;" onClick={() => (activeName.value = 'account')} class={`${activeName.value === 'account' ? 'active' : ''}`}>账户登录</a>
        <a href="javascript:;" onClick={() => (activeName.value = 'qrcode')} class={`${activeName.value === 'qrcode' ? 'active' : ''}`}>扫码登录</a>
      </nav>
      {
        activeName.value === 'account'
          ? <div class="account-box">
            <LoginForm/>
          </div>
          : <div class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt=""/>
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
      }
    </div>
  </section>
        <LoginFooter/>
      </div>
    )
  }

})

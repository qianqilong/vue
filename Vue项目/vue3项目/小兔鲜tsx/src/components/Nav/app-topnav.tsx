import { defineComponent } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Message from '@/utils/Message'
import nav from '@/components/Nav/app-topnav.module.less'

export default defineComponent({
  name: 'Nav',
  setup () {
    // 获取用户的登录信息
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const quitFn = () => {
    //  清除token
      store.commit('user/setUser', {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      })
      // 进入登录界面
      router.push('/login')
      Message({ type: 'success', text: '退出登录成功' })
    }
    const profile = store.state.user.profile
    return () => (
    <nav class={nav['app-topnav']}>
    <div class='container'>
      <ul>
{
       profile.token
         ? <li><a href="javascript:;"><i class="iconfont icon-user"></i>{profile.nickname}</a></li>
         : <li><RouterLink to={`/login?redirectUrl=${route.path}`}>请先登录</RouterLink></li>
}
{
       profile.token
         ? <li><a href="javascript:;" onClick={quitFn}>退出登录</a></li>
         : <li><a href="javascript:;">免费注册</a></li>

}
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
    )
  }
})

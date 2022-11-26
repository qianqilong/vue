import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import Nav from '@/components/Nav/app-topnav'
import Header from '@/components/Header/app-header'
import Footer from '@/components/Footer/app-footer'
import HeaderSticky from '@/components/Header/HeaderSticky/app-header-sticky'
export default defineComponent({
  name: 'LayOut',
  setup () {
    const store = useStore()
    // 派发action获取分类
    store.dispatch('category/getAllList')
    return () => (
        <div>
         {/* 顶部组件 */}
         <Nav></Nav>
         {/* 头部组件 */}
         <HeaderSticky/>
         <Header></Header>

         {/* 内容组件 */}
         <div class="main" style={{ }}>
            {/* 二级路由挂载点 */}
            <RouterView/>
         </div>
         {/* 尾部组件 */}
         <Footer></Footer>
        </div>
    )
  }
})

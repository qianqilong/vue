import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import './app-header-item.less'
import router from '@/router'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'HeaderItem',
  setup () {
    // 获取分类列表
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    // 显示二级
    const show = (id:string) => {
      store.commit('category/show', id)
    }
    // 关闭二级
    const hide = (id:string) => {
      store.commit('category/hide', id)
    }
    // 跳转一级
    const gocategory = (id:string) => {
      router.push(`/category/${id}`)
      hide(id)
    }
    // 跳转二级
    const gosub = (id:string, tid:string) => {
      router.push(`/category/sub/${id}`)
      hide(tid)
    }
    return () => (
      <ul class="app-header-nav">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      {
        list.value.map((item:any) => {
          return (
            <li key={item.id} onMouseenter={() => show(item.id)} onMouseleave={() => hide(item.id)}>
        <a onClick={() => gocategory(item.id)} >{item.name}</a>
        {
          item.children
            ? <div class={`layer ${item.open ? 'open' : ''}`}>
            <ul>
             {
              item.children.map((sub:any) => {
                return <li key={sub.id}>
                <a onClick={() => gosub(sub.id, item.id)}>
                  <img src={sub.picture} alt=""/>
                  <p>{sub.name}</p>
                </a>
              </li>
              })
            }
          </ul>
        </div>
            : <div class="layer"></div>
        }
      </li>
          )
        })
      }
    </ul>

    )
  }
})

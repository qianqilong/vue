import { useRoute } from 'vue-router'
import { computed, defineComponent, Transition } from 'vue'
import { useStore } from 'vuex'
import XtxBread from '../xtx-bread/xtx-bread'
import XtxBreadItem from '../xtx-bread/xtx-bread-item/xtx-bread-item'
export default defineComponent({
  name: 'Categroy',
  setup () {
    const store = useStore()
    const route = useRoute()
    // 获取一级二级目录
    const category = computed(() => {
      const obj:any = {}
      store.state.category.list.forEach((top:any) => {
        top.children && top.children.forEach((sub:any) => {
          if (sub.id === route.params.id) {
            obj.sub = { id: sub.id, name: sub.name }
            obj.top = { id: top.id, name: top.name }
          }
        })
        if (top.id === route.params.id) {
          obj.top = { id: top.id, name: top.name }
        }
      })
      return obj
    })
    return () => (
        <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        {
           JSON.stringify(category.value) !== '{}'
             ? <Transition name="fade-right" mode="out-in">
              <XtxBreadItem to={'/category/' + category.value.top.id} key={category.value.top.id}>{category.value.top.name}</XtxBreadItem>
             </Transition>
             : ''
         }
         {
            JSON.stringify(category.value) !== '{}'
              ? <Transition name="fade-right" mode="out-in">
            <XtxBreadItem to={route.path} key={category.value.sub.id}>{category.value.sub.name}</XtxBreadItem>
            </Transition>
              : ''
         }

        </XtxBread>
    )
  }
})

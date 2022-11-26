import { defineComponent } from 'vue'
import { useVModel } from '@/hooks'
import './tab.less'

export default defineComponent({
  name: 'Globaltab',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['tab-click', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const activeName = useVModel(props, 'modelValue', emit)

    //    tab的点击事件
    const tabClick = (name: string, index: number) => {
      activeName.value = name
      // 触发一个点击自定义事件
      emit('tab-click', { name, index })
    }
    // 获取插槽的值
    const panels = slots.default?.()
    const dynamicPanels: any[] = []
    if (panels && panels?.length > 0) {
      panels?.forEach((item) => {
        if (item.type?.__name === 'global-tab-panel') {
          dynamicPanels.push(item)
        } else {
          item.children?.forEach((com: any) => {
            dynamicPanels.push(com)
          })
        }
      })
    }
    return () => (
      <div class="xtx-tabs">
        <nav>
          {dynamicPanels?.map((item, i) => (
            <a href="javascript:;" onClick={() => tabClick(item.props.name, i)}>
              {item.props?.label}
            </a>
          ))}
        </nav>
      </div>
    )
  },
})

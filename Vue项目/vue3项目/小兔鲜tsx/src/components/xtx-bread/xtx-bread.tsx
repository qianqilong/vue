import { defineComponent, h } from 'vue'
import './xtx-bread.less'
export default defineComponent({
  name: 'XtxBread',
  render () {
    const slots:any = this.$slots
    const items = slots.default()
    const dymanicItems:any = []
    items?.forEach((item:any, i:any) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
})

<script lang="ts">
import { h } from 'vue'

export default {
  name: 'XtxBread',
  render<T extends { $slots: { default: Function } }>(this: T) {
    // 插槽中的值
    const items = this.$slots.default()
    // v-if的模块也会加入>,去掉图标
    items.forEach(() => {
      if (items.some((item: any) => item.children === 'v-if')) {
        items.pop()
      }
    })

    const dymanicItems = [] as any[]
    items.forEach((item: any, i: number) => {
      let length = items.length
      // 导入原来的插槽文件
      dymanicItems.push(item)
      //   更据插槽中的值渲染 图标
      if (i < length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  },
}
</script>

<style lang="less">
// 去除 scoped 属性，目的：然样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>

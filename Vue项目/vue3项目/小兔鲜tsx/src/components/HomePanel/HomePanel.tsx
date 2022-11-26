import { defineComponent } from 'vue'
import './HomePanel.less'
export default defineComponent({
  name: 'HomePanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  setup (props, { slots }) {
    return () => (
        <div class="home-panel">
        <div class="container">
          <div class="head">
            <h3>{ props.title }<small>{ props.subTitle }</small></h3>
            {/* 具名插槽站位 */}
            {slots.right?.()}
          </div>
           {/* 默认插槽站位 */}
          {slots.default?.()}
        </div>
        </div>
    )
  }
})

import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'XtxBread',
  props: {
    to: {
      type: String
    }
  },
  setup (props:any, { slots }) {
    return () => (
       <div class="xtx-bread-item">
           <RouterLink to={props.to}>
          {slots.default?.()}
          </RouterLink>
       </div>
    )
  }
})

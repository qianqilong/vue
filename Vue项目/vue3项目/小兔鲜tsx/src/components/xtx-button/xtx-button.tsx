import { defineComponent } from 'vue'
import './xtx-button.less'
export default defineComponent({
  name: 'XtxButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  emits: ['Click'],
  setup (props:any, { slots, emit }) {
    const clickFn = () => {
      emit('Click')
    }
    return () => (
        <button onClick={clickFn} class={`carousel-item ${props.size} ${props.type}`}>
        {slots.default?.()}
        </button>
    )
  }
})

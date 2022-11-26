import { defineComponent } from 'vue'
import './xtx-skeleton.less'
export default defineComponent({
  name: 'XtxSkeleton',
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    return () => (
        <div class={`xtx-skeleton ${props.animated ? 'shan' : ''}`} style={{ height: props.height, width: props.width }}>
        <div class="block" style={{ backgroundColor: props.bg }}></div>
      </div>
    )
  }
})

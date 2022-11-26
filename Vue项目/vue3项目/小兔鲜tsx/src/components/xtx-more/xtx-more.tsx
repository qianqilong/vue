import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './xtx-more.less'
export default defineComponent({
  name: 'XtxSkeleton',
  props: {
    path: {
      type: String,
      default: '/'
    }
  },
  setup (props) {
    return () => (
        <RouterLink to={props.path} class="xtx-more">
        <span>查看全部</span>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    )
  }
})

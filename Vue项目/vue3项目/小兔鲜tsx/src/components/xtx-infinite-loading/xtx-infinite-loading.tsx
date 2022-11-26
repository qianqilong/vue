import { defineComponent, ref } from 'vue'
import './xtx-infinite-loading.less'
import { useIntersectionObserver } from '@vueuse/core'
export default defineComponent({
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  emits: ['Infinite'],
  setup (props, { emit }) {
    const container = ref(null)
    useIntersectionObserver(
      container,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          if (props.loading === false && props.finished === false) {
            emit('Infinite')
          }
        }
      },
      {
        threshold: 0
      }
    )
    return () => (
        <div class="xtx-infinite-loading" ref={container}>
            {
                props.loading === true
                  ? <div class="loading">
                <span class="img"></span>
                <span class="text">正在加载...</span>
              </div>
                  : <div class="none">
                <span class="img"></span>
                <span class="text">亲，没有更多了</span>
              </div>
            }

        </div>
    )
  }
})

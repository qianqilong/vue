import { defineComponent, ref } from 'vue'
import './xtx-checkbox.less'
export default defineComponent({
  name: 'xtx-checkbox',
  props: ['checked'],
  emits: ['update:checked'],
  setup (props, { slots, emit }) {
    const checked = ref(props.checked)
    const changeChecked = () => {
      checked.value = !props.checked
      emit('update:checked', checked.value)
    }
    return () => (
        <div class="xtx-checkbox" onClick={changeChecked}>
        {
          checked.value
            ? <i class="iconfont icon-checked"></i>
            : <i class="iconfont icon-unchecked"></i>
        }
        <span >{slots.default?.()}</span>
      </div>
    )
  }
})

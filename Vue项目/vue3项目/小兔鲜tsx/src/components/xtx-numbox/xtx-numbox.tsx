import { defineComponent, ref } from 'vue'
import './xtx-numbox.less'
export default defineComponent({
  name: 'XtxNumbox',
  props: {
    number: {
      type: Number,
      default: 1
    },
    text: {
      type: String,
      default: '数量'
    }
  },
  emits: ['update:number'],
  setup (props, { emit }) {
    const number = ref(props.number)
    // 加
    const addNum = () => {
      if (number.value <= 0)number.value = 0
      number.value++
      emit('update:number', number.value)
    }
    // 减
    const reduceNum = () => {
      if (number.value <= 0) return
      number.value--
      emit('update:number', number.value)
    }
    return () => (
        <div class="xtx-numbox">
        <div class="label">{props.text}</div>
        <div class="numbox">
          <a href="javascript:;" onClick={reduceNum}>-</a>
          <input type="text" readonly v-model={props.number} />
          <a href="javascript:;" onClick={addNum}>+</a>
        </div>
      </div>
    )
  }
})

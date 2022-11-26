import { defineComponent } from 'vue'
import './xtx-message.less'
export default defineComponent({
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'error'
    }
  },
  setup (props:any) {
    console.log(props.text)
    const style = {
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    const type = props.type === 'error' ? 'error' : 'success'
    const warn = style[type]
    return () => (
    <div class='xtx-message1' style={warn} >
        <i class={`iconfont ${warn.icon}`} ></i>
        {
            props.text
              ? <span class="text">{props.text}</span>
              : ''
        }

      </div>
    )
  }

})

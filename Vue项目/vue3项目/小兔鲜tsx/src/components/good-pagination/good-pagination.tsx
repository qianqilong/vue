import { computed, defineComponent } from 'vue'
import './good-pagination.less'
export default defineComponent({
  name: 'GoodPagination',
  props: {
    pageNo: {
      type: Number,
      default: 1 // 第几页
    },
    pageSize: {
      type: Number,
      default: 3 // 一页多少数据
    },
    total: {
      type: Number,
      default: 30 // 总页数
    },
    continues: {
      type: Number,
      default: 5 // 展示页数
    }
  },
  emits: ['GetPageNo'],
  setup (props:any, { emit }) {
    const arr:any = []
    // 总的页码数
    const totalpage = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    // 计算起始数据和结束数据
    const startNumAndEndNum = computed(() => {
      let start = 0; let end = 0
      // 页码不够时，如只要5页
      if (props.continues > totalpage.value) {
        start = 1
        end = totalpage.value
      } else { // 正常现象
        start = props.pageNo - parseInt((props.continues / 2).toString())
        end = props.pageNo + parseInt((props.continues / 2).toString())
        //  start出现不正常现象
        if (start < 1) {
          start = 1
          end = parseInt(props.continues)
        } else if (end > totalpage.value) {
          start = totalpage.value - props.continues + 1
          end = totalpage.value
        }
      }
      return { start, end }
    })
    // 要循环的数据
    for (let n = 0; n < startNumAndEndNum.value.end; n++) {
      arr[n] = n + 1
    }

    return () => (
<div class="pagination">
<button disabled={props.pageNo === 1} onClick={() => emit('GetPageNo', props.pageNo - 1)}>上一页</button>
{
    startNumAndEndNum.value.end !== 0
      ? <button style={{ display: (startNumAndEndNum.value.start >= 2 ? '' : 'none') }} onClick={() => emit('GetPageNo', 1)}>1</button>
      : ''
}
{
    startNumAndEndNum.value.end !== 0
      ? <button style={{ display: (startNumAndEndNum.value.start > 2 ? '' : 'none') }}>···</button>
      : ''
}
{
  startNumAndEndNum.value.end !== 0
    ? arr.map((item:any) => {
      return <button style={{ display: (item >= startNumAndEndNum.value.start ? '' : 'none') }} class={`${item === props.pageNo ? 'active' : ''}`} onClick={() => emit('GetPageNo', item)}>{item}</button>
    })
    : ''
}
{
   startNumAndEndNum.value.end !== 0
     ? <button style={{ display: (startNumAndEndNum.value.end < totalpage.value - 1 ? '' : 'none') }} >···</button>
     : ''
}
{
    startNumAndEndNum.value.end !== 0
      ? <button style={{ display: (startNumAndEndNum.value.end < totalpage.value ? '' : 'none') }} onClick={() => emit('GetPageNo', totalpage.value)}>{ totalpage.value }</button>
      : ''
}
<button disabled={props.pageNo === totalpage.value} onClick={() => emit('GetPageNo', props.pageNo + 1)}>下一页</button>
<button style="margin-left: 30px">共 { props.total } 条</button>
</div>
    )
  }
})

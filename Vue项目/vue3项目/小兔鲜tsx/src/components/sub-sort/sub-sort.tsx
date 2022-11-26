import { defineComponent, reactive } from 'vue'
import XtxCheckbox from '../xtx-checkbox/xtx-checkbox'
import './sub-sort.less'
export default defineComponent({
  name: 'Subfilter',
  setup () {
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: '',
      sortMethod: ''
    })
    const changeSort = (sortField:any) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === '') {
          // 第一次点击，默认是降序
          sortParams.sortMethod = 'desc'
        } else {
          // 其他情况根据当前排序取反
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果排序未改变停止逻辑
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = ''
      }
    }
    return () => (
        <div class='sub-sort'>
        <div class="sort">
          <a onClick={() => changeSort('')} href="javascript:;" class={`${sortParams.sortField === '' ? 'active' : ''}`}>默认排序</a>
          <a onClick={() => changeSort('publishTime')} href="javascript:;" class={`${sortParams.sortField === 'publishTime' ? 'active' : ''}`}>最新商品</a>
          <a onClick={() => changeSort('orderNum')} href="javascript:;" class={`${sortParams.sortField === 'orderNum' ? 'active' : ''}`}>最高人气</a>
          <a onClick={() => changeSort('evaluateNum')} href="javascript:;" class={`${sortParams.sortField === 'evaluateNum' ? 'active' : ''}`}>评论最多</a>
          <a href="javascript:;" onClick={() => changeSort('price')}>
            价格排序
            <i class={`arrow up ${sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' ? 'active' : ''}`} />
            <i class={`arrow down ${sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' ? 'active' : ''}`} />
          </a>
        </div>
        <div class="check">
          <XtxCheckbox v-slots={{
            default: () => (
              '仅显示有货商品'
            )
          }}></XtxCheckbox>
          <XtxCheckbox v-slots={{
            default: () => (
              '仅显示特惠商品'
            )
          }}></XtxCheckbox>
        </div>
      </div>
    )
  }
})

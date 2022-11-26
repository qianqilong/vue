import { defineComponent } from 'vue'
import './goods-sku.less'
export default defineComponent({
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  emits: ['SetIndex'],
  setup (props:any, { emit }) {
    const IndexArr: any = []
    // 选择规格
    const clickSpecs = (item:any, val:any, i:any, index:any) => {
      IndexArr[i] = index
      emit('SetIndex', IndexArr)
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((bv:any) => { bv.selected = false })
        val.selected = true
      }
    }
    return () => (
     <div>
          <div class="goods-sku">
            {
              props.goods.specs.length !== 0
                ? props.goods.specs.map((item:any, i:any) => {
                  return (<dl key={item.id}>
                    <dt>{item.name}</dt>
                    <dd>
                      {
                      item.values
                        ? item.values.map((val:any, index:any) => {
                          return (
                            val.picture// 有图片显示图片
                              ? <img class={{ selected: val.selected }} onClick={() => clickSpecs(item, val, i, index)} src={val.picture} alt=""/>
                              : ''
                          )
                        })
                        : ''
                      }
                      {
                      item.values
                        ? item.values.map((val:any, index:any) => {
                          return (
                            val.picture // 没图片显示文字
                              ? ''
                              : <span class={{ selected: val.selected }} onClick={() => clickSpecs(item, val, i, index)}>{val.name}</span>
                          )
                        })
                        : ''
                      }
                    </dd>
                  </dl>)
                })

                : ''
            }
  </div>
     </div>
    )
  }
})

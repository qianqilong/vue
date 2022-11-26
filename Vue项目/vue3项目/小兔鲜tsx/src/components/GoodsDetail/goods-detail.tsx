import { defineComponent, inject } from 'vue'
import './goods-detail.less'
export default defineComponent({
  name: 'Gooddetail',
  setup () {
    const goods:any = inject('goods')
    return () => (
        <div class="goods-detail">
        <ul class="attrs">
            {
                goods.value.details
                  ? goods.value.details.properties.map((item:any) => {
                    return <li>
                    <span class="dt">{item.name}</span>
                    <span class="dd">{item.value}</span>
                  </li>
                  })
                  : ''
            }
        </ul>
        {
            goods.value.details
              ? goods.value.details.pictures.map((item:any) => {
                return <img key={item} src={item}/>
              })
              : ''
        }
      </div>
    )
  }
})

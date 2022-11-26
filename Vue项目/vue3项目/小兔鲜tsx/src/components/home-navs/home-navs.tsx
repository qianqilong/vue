import { defineComponent, ref } from 'vue'
import { findGoodsAPI } from '@/api'
import HomeProduct from '../home-product/home-product'
import { photo } from '@/utils/photo'
export default defineComponent({
  name: 'HomeProduct',
  setup () {
    const obj = ref([])
    findGoodsAPI().then((res:any) => {
      obj.value = res.result.map((item:any, index:number) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 5),
          goods: item.goods,
          photo: photo[index]
        }
      })
    })
    return () => (
        <div>
            {
                obj.value.length !== 0
                  ? obj.value.map((item) => {
                    return (
                        <HomeProduct good={item}/>
                    )
                  })
                  : ''
            }
        </div>

    )
  }
})

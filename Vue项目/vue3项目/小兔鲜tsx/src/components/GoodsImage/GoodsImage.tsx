import { defineComponent, ref } from 'vue'
import { usePreviewImg } from '@/hooks'
import './GoodsImage.less'
export default defineComponent({
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props:any) {
    const currIndex = ref(0)
    const { position, bgPosition, show, target } = usePreviewImg()
    return () => (
        <div class="goods-image">
          {/* 放大镜 bgPosition */}
        {
          show.value
            ? <div class="large" style={{ backgroundImage: `url(${props.images[currIndex.value]})`, ...bgPosition }} ></div>
            : ''
        }

        <div class="middle" ref={target}>
          <img src={props.images[currIndex.value]} alt="" />
          {
          show.value
            ? <div class="layer1" style={{ ...position }}></div>
            : ''
        }

        </div>
        <ul class="small">
          {/* v-for="(img,i) in images" key="img" class="{active:i===currIndex}" */}
          {
            props.images.map((item:any, index:number) => {
              return <li key={item} class={`${currIndex.value === index ? 'active' : ''}`}>
                 <img src={item} alt="" onMouseenter={() => (currIndex.value = index)}/>
                     </li>
            })

          }

        </ul>
      </div>
    )
  }
})

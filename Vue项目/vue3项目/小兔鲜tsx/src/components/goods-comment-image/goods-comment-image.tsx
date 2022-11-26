import { defineComponent } from 'vue'
import './goods-comment-image.less'
export default defineComponent({
  name: 'GoodscommentImg',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  setup (props:any) {
    return () => (
      <div class="goods-comment-image">
            <div class="list">
            {
              props.pictures.map((item:any) => {
                return <a>
                <img src={item} alt=""/>
              </a>
              })
            }
        </div>
        <div class="preview"></div>
      </div>
    )
  }
})

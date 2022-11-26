import { defineComponent } from 'vue'
import GoodsCommentImage from '../goods-comment-image/goods-comment-image'
import './goods-list.less'
export default defineComponent({
  name: 'GoodsList',
  props: {
    goodslist: {
      type: Object
    }
  },
  setup (props:any) {
    return () => (
        <div class="list">
      <div class="item">
        <div class="user">
          <img src={props.goodslist.member.avatar} alt=""/>
          <span>{props.goodslist.member.nickname}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx01"></i>
            <i class="iconfont icon-wjx02"></i>
            {
              props.goodslist.orderInfo.specs.map((item:any) => {
                return <span class="attr">{item.name}:{item.nameValue}</span>
              })
            }
          </div>
        <div class="text">{props.goodslist.content}</div>
        {
          props.goodslist.pictures.length !== 0
            ? <GoodsCommentImage pictures={props.goodslist.pictures}/>
            : ''
        }
          <div class="time">
            <span>{props.goodslist.createTime}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{props.goodslist.praiseCount}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
})

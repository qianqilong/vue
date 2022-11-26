import { findCommentInfoByGoodListsAPI, findCommentInfoByGoodsAPI } from '@/api'
import { defineComponent, reactive, ref } from 'vue'
import GoodsList from '../goods-list/goods-list'
import GoodPagination from '@/components/good-pagination/good-pagination'
import { useRoute } from 'vue-router'
import './GoodsComment.less'
export default defineComponent({
  name: 'Goodcomment',
  setup () {
    // 筛选条件准备
    const reqParams = reactive({ page: 1, pageSize: 10, counts: 0 })
    const route = useRoute()
    const commentInfo:any = ref(null) // 存储评论信息
    const commentList:any = ref({})
    const i = ref(0)
    // 获取评论数据个数
    findCommentInfoByGoodsAPI(route.params.id).then((res:any) => {
      res.result.tags.unshift({ type: 'img', title: '有图', tagCount: res.result.hasPictureCount })
      res.result.tags.unshift({ type: 'all', title: '全部评价', tagCount: res.result.evaluateCount })
      commentInfo.value = res.result
    })
    // 获取评论列表
    findCommentInfoByGoodListsAPI(route.params.id, reqParams.page, reqParams.pageSize).then((res:any) => {
      reqParams.counts = res.result.counts
      commentList.value = res.result.items
    })
    //
    const GetPageNo = (val:any) => {
      reqParams.page = val
      findCommentInfoByGoodListsAPI(route.params.id, val, reqParams.pageSize).then((res:any) => {
        reqParams.counts = res.result.counts
        commentList.value = res.result.items
      })
    }
    return () => (
      <div class="goods-comment">
      <div class="head">
      {
            commentInfo.value
              ? <div class="data">
                 <p><span>{commentInfo.value.salesCount}</span><span>人购买</span></p>
                 <p><span>{commentInfo.value.praisePercent}</span><span>好评率</span></p>
                </div>
              : ''
      }

        <div class="tags">
          <div class="dt">大家都在说：</div>
          <div class="dd">
            {
              commentInfo.value
                ? commentInfo.value.tags.map((item:any, index:number) => {
                  return <a href="javascript:;" onClick={() => (i.value = index)} class={`${index === i.value ? 'active' : ''}`}>{item.title}（{item.tagCount}）</a>
                })
                : ''
            }
          </div>
        </div>
      </div>
      <div class="sort">
        <span>排序：</span>
        <a href="javascript:;" class="active">默认</a>
        <a href="javascript:;">最新</a>
        <a href="javascript:;">最热</a>
      </div>
      {
      JSON.stringify(commentList.value) !== '{}'
        ? commentList.value.map((item:any) => {
          return <GoodsList goodslist={item} />
        })
        : ''
      }
      {
        reqParams.counts !== 0
          ? <GoodPagination onGetPageNo={GetPageNo} pageNo={reqParams.page} pageSize={reqParams.pageSize} total={ reqParams.counts} continues={5}/>
          : ''
      }
    </div>
    )
  }
})

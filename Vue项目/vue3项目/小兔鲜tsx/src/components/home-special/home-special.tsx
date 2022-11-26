import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { findSpecialAPI } from '@/api'
import HomePanel from '../HomePanel/HomePanel'
import XtxMore from '../xtx-more/xtx-more'
import './home-special.less'
export default defineComponent({
  name: 'HomeProduct',
  setup () {
    const special = ref([])
    findSpecialAPI().then((item:any) => {
      special.value = item.result
    })
    return () => (
        <HomePanel title="最新专题" v-slots={{
          right: () => (
            <XtxMore />
          ),
          default: () => (
            <div class="special-list" ref="homeSpecial">
              {
                special.value
                  ? special.value.map((item:any) => {
                    return (
                        <div class="special-item" >
                        <RouterLink to="/">
                          <img v-lazyload={item.cover} alt="" />
                          <div class="meta">
                            <p class="title">
                              <span class="top ellipsis">{item.title}</span>
                              <span class="sub ellipsis">{item.summary}</span>
                            </p>
                            <span class="price">&yen;{item.lowestPrice}</span>
                          </div>
                        </RouterLink>
                        <div class="foot">
                          <span class="like"><i class="iconfont icon-hart1"></i>{item.collectNum}</span>
                          <span class="view"><i class="iconfont icon-see"></i>{item.viewNum}</span>
                          <span class="reply"><i class="iconfont icon-message"></i>{item.replyNum}</span>
                        </div>
                      </div>
                    )
                  })
                  : ''
              }
          </div>
          )
        }}>
    </HomePanel>
    )
  }
})

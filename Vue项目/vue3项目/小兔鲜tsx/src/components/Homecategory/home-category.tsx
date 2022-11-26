import { computed, defineComponent, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { findBrandAPI } from '@/api'
import { useStore } from 'vuex'
import './home-category.less'
import XtxSkeleton from '../xtx-skeleton/xtx-skeleton'
export default defineComponent({
  name: 'HomeCategory',
  setup () {
    const store = useStore()

    let resu:any = {}
    // 获取了品牌的信息
    findBrandAPI(6).then((res) => {
      resu = res
    })
    // 9个分类加一个品牌
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }]
    })
    // 展示侧边栏的数组
    const menuList = computed(() => {
      const list = store.state.category.list.map((item:any) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 筛选后数据存在这里
    const categoryId = ref('1005000')
    // 鼠标移动上去筛选数组
    const getcategoryId = (id:string) => {
      categoryId.value = id
    }
    // 获取的数据
    const currCategory = computed(() => {
      return menuList.value.find((item:any) => item.id === categoryId.value)
    })
    return () => (
   <div class='home-category'>
        <ul class="menu">
            {
              menuList.value.map((item:any) => {
                return (
                  <li onMouseenter={() => getcategoryId(item.id)} key={item.id}>
                  <RouterLink to="/">{item.name}</RouterLink>
                  {
                    item.children
                      ? item.children.map((sub:any) => {
                        return (
                         <RouterLink to="/" key={sub.id}>{sub.name}</RouterLink>
                        )
                      })
                      : <span>
                              <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
                              <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
                        </span>
                  }
                  </li>
                )
              })
            }
        </ul>
        {/* <!-- 弹层 --> */}
    <div class="layer1">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      { categoryId.value !== 'brand'
        ? <ul>
        {
       currCategory.value
         ? currCategory.value.goods.map((item:any) => {
           return (
            <li key={item.id}>
            <RouterLink to="/">
              <img v-lazyload={item.picture} alt=""/>
              <div class="info">
                <p class="name ellipsis-2">{item.name}</p>
                <p class="desc ellipsis">{item.desc}</p>
                <p class="price"><i>¥</i>{item.price}</p>
              </div>
            </RouterLink>
             </li>
           )
         })
         : ''
        }

      </ul>
        : <ul>
          {
            resu
              ? resu.result.map((item:any) => {
                return (
                  <li class="brand" key={item.id}>
                  <RouterLink to="/">
                    <img v-lazyload={item.logo} alt=""/>
                    <div class="info">
                      <p class="place"><i class="iconfont icon-dingwei"></i>{item.place}</p>
                      <p class="name ellipsis">{item.nameEn}</p>
                      <p class="desc ellipsis-2">{item.name}</p>
                    </div>
                  </RouterLink>
                </li>
                )
              })
              : ''
          }

      </ul>
    }
    </div>
</div>
    )
  }
})

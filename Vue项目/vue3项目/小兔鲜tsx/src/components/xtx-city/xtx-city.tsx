import { computed, defineComponent, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import './xtx-city.less'
import { getCityDataAPI } from '@/api'
export default defineComponent({
  name: 'XtxBread',
  props: {
    fullLocation: {
      type: String
    }
  },
  setup (props:any) {
    const loading = ref(false)// 是否在加载
    const cityData = ref([])// 存储全部城市的数组
    const visible = ref(false)// 控制弹窗显示隐藏
    const target = ref(null)// 控制dom
    const active = ref(true)// 控制配送地址显示
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '', // 省份
      cityCode: '',
      cityName: '', // 市份
      countyCode: '',
      countyName: '' // 区份
    })
    // 控制展开
    const openDialog = () => {
      open()
      visible.value = true
      active.value = false
    }
    // 控制收起
    const closeDialog = () => {
      visible.value = false
    }
    // 点击其他位置隐藏
    onClickOutside(target, () => {
      closeDialog()
    })
    // 选择省份
    const changeItem = (item:any) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
        cityData.value = item.areaList
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
        cityData.value = item.areaList
      }
      // 关闭
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        visible.value = false
      }
    }
    // 打开时获取数据
    const open = () => {
      visible.value = true
      loading.value = true
      // 获取数据
      getCityDataAPI().then((data:any) => {
        cityData.value = data
        loading.value = false
      })
    }
    // 计算属性
    const currList = computed(() => {
      return changeResult.provinceName + ' ' + changeResult.cityName + ' ' + changeResult.countyName
    })
    return () => (
        <div class="xtx-city" ref={target}>
        <div class={'select1,active'} >
            {
               active.value
                 ? <span class="placeholder">请选择配送地址</span>
                 : ''
            }

          <span class="value" onClick={openDialog}>{currList.value}</span>
          <i class="iconfont icon-angle-down" onClick={openDialog}></i>
        </div>
        {
         visible.value
           ? <div class="option">
           {/* 弹窗内容 */}
           {
            cityData.value.length !== 0
              ? cityData.value.map((item:any) => {
                return (
                    <span class="ellipsis" onClick={() => changeItem(item)} >{item.name}</span>
                )
              })
              : ''
           }
             </div>
           : ''
        }

      </div>
    )
  }
})

import { useIntersectionObserver, type MaybeElement, type MaybeElementRef } from '@vueuse/core'
import { onMounted, reactive, ref, type Ref } from 'vue'

// 读取滚动距离
export const windscrollTop = () => {
  const y = ref(0)
  onMounted(() => {
    // 监听滚动事件
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop
      y.value = scrollTop
    }
  })
  return { y }
}

// 数据懒加载
/**
 * @param target 观察的dom
 * @param callback 获取数据的回调函数
 * @T 传递的数据的泛型
 * @returns 获取的数据列表
 */
export function useLazyData<T>(target: MaybeElementRef<MaybeElement>, callback: Function) {
  const List = ref() as Ref<T>
  const { stop } = useIntersectionObserver(
    // 观察的目标dom容器
    target,
    // isIntersecting 是否进入可视区域
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        List.value = await callback()
      }
    },
  )
  return { List }
}

/**
 * @returns
 * @position 遮罩容器的定位
 * @bgPosition 大背景的定位
 * @show 是否显示预览大图
 * @move 控制移动遮罩层移动的函数
 * @leave 鼠标离开的函数
 */
export const usePreviewImg = () => {
  // 控制遮罩层的定位
  const position: { left: string | number; top: string | number } = reactive({ left: 0 + 'px', top: 0 + 'px' })
  // 控制大图片的定位
  const bgPosition = reactive({ backgroundPositionX: 0 + 'px', backgroundPositionY: 0 + 'px' })
  // 控制遮罩层的显示隐藏
  const show = ref(false)
  // 控制移动遮罩层移动的函数
  const move = (el: MouseEvent) => {
    show.value = true
    if (el.offsetX < 100) position.left = 0
    else if (el.offsetX > 300) position.left = 200
    else position.left = el.offsetX - 100

    if (el.offsetY < 100) position.top = 0
    else if (el.offsetY > 300) position.top = 200
    else position.top = el.offsetY - 100

    bgPosition.backgroundPositionX = -position.left * 2 + 'px'
    bgPosition.backgroundPositionY = -position.top * 2 + 'px'

    position.left = position.left + 'px'
    position.top = position.top + 'px'
  }
  // 鼠标离开的函数
  const leave = () => {
    show.value = false
  }

  return { position, move, bgPosition, leave, show }
}

// 实现[useVModel]
export const useVModel = (props: any, keyword: any, emit: any) => {
  return computed({
    get() {
      return props[keyword]
    },
    set(value) {
      emit(`update:${keyword}`, value)
    },
  })
}

// 计时器
export const useTime = (timeInter: number) => {
  const time = reactive([30, 0])
  time[0] = Math.floor(timeInter / 60)
  time[1] = timeInter % 60

  // 定时函数
  const start = () => {
    time[1]--
    if (time[1] < 0) {
      time[1] = 60
      time[0] = time[0] - 1
    }
  }
  const timer = setInterval(() => {
    if (time[0] === 0 && time[1] === 0) {
      clearInterval(timer)
    }
    start()
  }, 1000)
  // 组件销毁时清除定时器
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
  return time
}

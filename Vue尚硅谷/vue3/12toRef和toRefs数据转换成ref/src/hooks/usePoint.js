import { reactive, onMounted,onBeforeUnmount } from 'vue'
function usePoint() {
  // 实现鼠标打点的数据
  let point = reactive({
    x: 0,
    y: 0
  })
  // 鼠标打点方法
  function savepoint(event) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(event.pageX, event.pageY)
  }
  onMounted(() => {
    window.addEventListener('click', savepoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click',savepoint)
  })
  return point
}
export default usePoint;
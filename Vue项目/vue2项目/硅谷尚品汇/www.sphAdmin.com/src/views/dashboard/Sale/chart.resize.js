import echarts from 'echarts'
import Vue from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'

export var version = '0.0.1'
var compatible = (/^2\./).test(Vue.version)
if (!compatible) {
    Vue.util.warn('vue echarts resize directive ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version)
}
const HANDLER = '_vue_echarts_resize_handler'

function bind(el) {
    unbind(el)
    el[HANDLER] = function() {
        const chart = echarts.getInstanceByDom(el)
        if (!chart) {
            return
        }
        chart.resize()
    }
    // 监听window窗体变化，更新echarts大小
    // window.addEventListener("resize", el[HANDLER])
    // 监听绑定的div大小变化，更新echarts大小
    elementResizeDetectorMaker().listenTo(el, el[HANDLER])
}
function unbind(el) {
    // window.removeEventListener("resize", el[HANDLER]);
    elementResizeDetectorMaker().removeListener(el, el[HANDLER])
    delete el[HANDLER]
}
var directive = {
    bind: bind,
    unbind: unbind
}
Vue.directive('on-echart-resize', directive)

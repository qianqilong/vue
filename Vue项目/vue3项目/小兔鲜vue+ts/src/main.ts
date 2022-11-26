import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './utils/pinia-persistence'
import 'normalize.css'
import './mock'
import './assets/styles/common.less'
import Globalskeleton from './components/global/global-skeleton.vue'
import Globalcarousel from './components/global/global-carousel.vue'
import Globalmove from './components/global/home/global-more.vue'
import { defineDirective } from './directive'
import GlobalbreadItem from './components/global/home/category/components/global-bread-item.vue'
import Globalbread from './components/global/home/category/global-bread.vue'
import Globalloading from './components/global/home/category/global-loading.vue'
import GlobalCity from './components/global/home/goodDetail/global-city.vue'
import GlobalNumbox from './components/global/home/goodDetail/global-numbox.vue'
import GlobalButton from './components/global/home/goodDetail/global-button.vue'
import GlobalPagination from './components/global/global-pagination.vue'
import Message from '@/plugin'
import GlobalDialog from './components/global/pay/global-dialog.vue'
import GlobalTab from './components/global/order/global-tab'
import GlobalTabPanel from './components/global/order/global-tab-panel.vue'
import GlobalStep from './components/global/order/global-step'
import GlobalStepItem from './components/global/order/global-step-item.vue'

const app = createApp(App)

app

  .use(router)
  .component('Globalskeleton', Globalskeleton)
  .component('Globalcarousel', Globalcarousel)
  .component('Globalmove', Globalmove)
  .component('Globalbread', Globalbread)
  .component('GlobalbreadItem', GlobalbreadItem)
  .component('Globalloading', Globalloading)
  .component('GlobalCity', GlobalCity)
  .component('GlobalNumbox', GlobalNumbox)
  .component('GlobalButton', GlobalButton)
  .component('GlobalPagination', GlobalPagination)
  .component('GlobalDialog', GlobalDialog)
  .component('GlobalTab', GlobalTab)
  .component('GlobalTabPanel', GlobalTabPanel)
  .component('GlobalStep', GlobalStep)
  .component('GlobalStepItem', GlobalStepItem)
  .use(Message)
  .use(store)
defineDirective(app)

//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $Message: (message: { type: string; text: string }) => void
    $Confirm: (confirm: { title?: string; text: string; cancel?: Function; confirm: Function }) => void
  }
}

app.mount('#app')

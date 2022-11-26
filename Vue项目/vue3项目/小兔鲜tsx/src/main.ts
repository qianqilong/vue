import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
import Ui from '@/utils/index'
createApp(App).use(store).use(router).use(Ui).mount('#app')

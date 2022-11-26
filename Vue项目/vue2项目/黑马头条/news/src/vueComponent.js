import Vue from 'vue'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, ShareSheet, CellGroup, Tag, Dialog, DatetimePicker, Loading, Lazyload } from 'vant'

// 全局注册
Vue.use(Lazyload, {
  preLoad: 0.8,
  error: 'https://picx.zhimg.com/v2-6b4b7364b2b2839caa15496d0f600323_1440w.jpg?source=172ae18b'
  // 懒加载时发生错误时显示的，这是指令
})
Vue.use(Loading)
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(ShareSheet)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

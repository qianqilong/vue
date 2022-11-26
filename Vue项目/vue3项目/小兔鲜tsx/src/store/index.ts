import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'
interface profileInterface{
  id: string,
  avatar: string,
  nickname: string,
  account: string,
  mobile: string,
  token: string,
}
interface userInterface{
  profile:profileInterface
}
interface TypeRootState {
  user:userInterface
}
export default createStore<TypeRootState>({
  modules: {
    cart, user, category
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})

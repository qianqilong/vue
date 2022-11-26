import { useUserStore } from './module/user'
import store from '../utils/pinia-persistence'
import { useCategoryStore } from './module/category'
import { useCartStore } from './module/cart'

const useStore = () => ({
  user: useUserStore(store),
  category: useCategoryStore(store),
  cart: useCartStore(store),
})

export default useStore

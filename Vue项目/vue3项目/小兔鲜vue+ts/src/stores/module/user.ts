import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: { account: '', nickname: '', avatar: '', token: '', mobile: '' },

      redirectUrl: '/',
    }
  },
  getters: {},
  actions: {
    setState(data: { account: string; nickname: string; avatar: string; token: string; mobile: string }) {
      this.user = data
    },
    cleatState() {
      this.$reset()
    },
  },
})

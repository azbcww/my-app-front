import { defineStore } from "pinia";

export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => ({
    userName: ''
  }),
  getters: {
    getName: (state) => state.userName
  },
  actions: {
    setUserName(name: string) {
      this.userName = name
    }
  },
  persist: true
})
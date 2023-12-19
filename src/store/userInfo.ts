import { defineStore } from "pinia"

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
      sessionStorage.setItem('user', name)
    },
    getNameFromSession() {
      const name = sessionStorage.getItem('user')
      if (name == undefined){
        return ''
      }
      this.userName = name
      return name as string
    }
  }
})
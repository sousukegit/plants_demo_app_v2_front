import { defineStore } from 'pinia'


/** counterストア */
export const useUserStore = defineStore('user', {
  state: () => ({
    //ユーザー情報を持ってくる    
      user:{
        id: null,
        user: null,
        email: null
      }   
  
  }),
  getters: {


  },
  actions: {

  },
})
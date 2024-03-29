import { defineStore } from 'pinia'
import {jwtDecode} from 'jwt-decode'

/** Loginメソッド */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    count:1,
    user: {
        id: null,
        name: "",
        sub: null

      },
    auth: {
      token: null,
      expires: 0,
      payload: {}
    },
    toast:{
      msg: null,
      color: 'error',
      timeout: 4000
    }
  }),
  getters: {
    // 有効期限内にtrueを返す
    isAuthenticated ():boolean {
      return new Date().getTime() < this.auth.expires
    },

    // ユーザーが存在している場合はtrueを返す

    isExistUser ():boolean {
      return this.user.sub !==null 
      && this.auth.payload.sub !== null 
      && this.user.sub === this.auth.payload.sub
    },

    // ユーザーが存在し、かつ有効期限切れの場合にtrueを返す
    isExistUserAndExpired ():boolean {
      return this.isExistUser && !this.isAuthenticated
    },

    // ユーザーが存在し、かつ有効期限内の場合にtrueを返す
    loggedIn ():boolean {
      return this.isExistUser && this.isAuthenticated
    }

  },
  actions: {
    setAuth (response) {      

       this.user.id = (response.user.id)? response.user.id : null
       this.user.name = (response.user.name)? response.user.name : ""
       this.user.sub = (response.user.name)? response.user.sub : null
       
       this.auth.token = (response.token) ? response.token : null 
       this.auth.expires = (response.expires)? response.expires * 1000 : 0
       this.auth.payload = (response.token) ? jwtDecode(response.token) : {}
       console.log("setAuth user:"+this.user.name )
       console.log("setAuth token:"+this.auth.token )
    },
    resetPinia(){
      this.user.id = null
      this.user.name = ""
      this.user.sub = null

      this.auth.token =  null
      this.auth.expires = 0
      this.auth.payload =  {}

      localStorage.clear()
    }
  }
  // ,
  // persist: {
  //   storage: persistedState.localStorage,

  // }, 
})
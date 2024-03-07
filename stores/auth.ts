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
    }
  }),
  getters: {
    // 有効期限内にtrueを返す
    isAuthenticated ():boolean {
      return new Date().getTime() < this.auth.expires
    },

    // ユーザーが存在している場合はtrueを返す
    isExistUser ():boolean {
      return this.auth.user.sub && this.auth.payload.sub && this.user.sub === this.payload.sub
    },

    // ユーザーが存在し、かつ有効期限切れの場合にtrueを返す
    isExistUserAndExpired ():boolean {
      return this.isExistUser() && !this.isAuthenticated()
    },

    // ユーザーが存在し、かつ有効期限内の場合にtrueを返す
    loggedIn ():boolean {
      return this.isExistUser() && this.isAuthenticated()
    }

  },
  actions: {
namechange()  {
  console.log(this.auth.token)
  console.log(this.auth.expires)
  console.log(this.auth.payload)
  console.log(this.user.current)
  // this.user.current+"manabe";
},

    setAuth (response) {
       this.auth.token = (response.token) ? response.token : null 
       this.auth.expires = (response.expires)? response.expires * 1000 : 0
       this.auth.payload = (response.token) ? jwtDecode(response.token) : {}
       this.user.id = (response.user.id)? response.user.id : null
       this.user.name = (response.user.name)? response.user.name : ""
       this.user.sub = (response.user.name)? response.user.sub : null
       console.log("setAuth user:"+this.user.name )
       console.log("setAuth token:"+this.auth.token )
    },
    resetPinia(){
      this.setAuth(null, 0, null)
    }
   

  },
})
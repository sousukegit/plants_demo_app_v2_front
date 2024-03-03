import { defineStore } from 'pinia'
import {jwtDecode} from 'jwt-decode'

/** counterストア */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    count:1,
    user: {
        current: 'unknown'
      },
    auth: {
      token: null,
      expires: 0,
      payload: {}
    }
  }),
  getters: {
    // /** countを2倍 */
    // double: (state) => state.count * 2,
    // setAuth: (response) =>{
    //     user=
    //   }

  },
  actions: {
namechange()  {
  console.log(this.auth.token)
  console.log(this.auth.expires)
  console.log(this.auth.payload)
  console.log(this.user.current)
  // this.user.current+"manabe";
},

    setAuth (token, expires, user ) {
       this.auth.token = (token) ? token : null 
       this.auth.expires = (expires)? expires * 1000 : 0
       this.auth.payload = (token) ? jwtDecode(token) : {}
       this.user.current = (user)? user : "unknown"
    },
    resetPinia(){
      this.setAuth(null, 0, null)
    }
   

  },
})
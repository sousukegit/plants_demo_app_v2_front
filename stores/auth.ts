import { defineStore } from 'pinia'

/** counterストア */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    count:1,
    user: {
        current: 'sousuke'
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
  console.log(this.user.current)
  // this.user.current+"manabe";
},
changename(name){
  this.user.current = name
  console.log(this.user.current)
},



    setAuth (token, expires, user) {
       this.auth.token = token 
       this.auth.expires = expires * 1000
       this.user.current = user
        // const jwtPayload = (token) ? jwtDecode(token) : {}
    }

  },
})
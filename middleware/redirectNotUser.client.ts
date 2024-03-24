//このメソッドはグローバルメソッドとする
import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
export default defineNuxtRouteMiddleware( (to,from) =>{
    // const config = useRuntimeConfig()
    // const auth = useAuthStore(); 
   
    // //ユーザーが存在しているかを確認する
    // //遷移しないディレクトリ
    // const notRedirectPaths = ["/","/login","/signup","/signupAfter"]
    // if (!auth.isExistUser){
    //   //特定のディレクトリならリダイレクトしない
    //   if(notRedirectPaths.includes(to.path)){
    //     return
    //   }
    //   //ホームにリダイレクトする
    //   const msg = 'まずはログインしてください'
    //   console.log(msg)

    //   return navigateTo({path:'/'})
    // }
})
//このメソッドはグローバルメソッドとする
import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
export default defineNuxtRouteMiddleware( (to,from) =>{
    console.log(to)
    console.log(from)
})
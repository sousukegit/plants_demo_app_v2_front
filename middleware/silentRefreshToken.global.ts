
//このメソッドはグローバルメソッドとする
import { useAuthStore } from '~~/stores/auth';
//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
export default defineNuxtRouteMiddleware( (to,from) =>{
    console.log("global silent")
    const config = useRuntimeConfig()
    const auth = useAuthStore(); 
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    };
    //リロードしたときの対応としてクライアントサイドのみでこの処理は行いたい
    //ストアが初期化されたときはサーバー側でもこの処理が実行される
    //永続化はしているので
    //https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs

    if (process.server) return
    //ユーザーが存在するが、アクセストークンが期限切れ
    if (auth.isExistUserAndExpired) {
        console.log('Execute silent refresh!!')

        const refresh = async() => {
            try {
            const response = await usePost('/api/v1/auth_token/refresh',customHeaders);
            // 成功時の処理
            auth.setAuth(response)
            console.log(response)
            } catch (error) {
            // 期限切れ　不正なリフレッシュトークンの場合
            console.error(error);
            const msg = 'セッションの有効期限が切れました。' +
                        'もう一度ログインしてください'
            //トースター出力
            alert(msg)
            // 初期化
            auth.resetPinia()
            }
        }
        async function refreshFunc(){
           await refresh()
        }
        refreshFunc()
      }
    //ユーザーが存在しているかを確認する
    //遷移しないディレクトリ
    const notRedirectPaths = ["/","/login","/signup","/signupAfter"]
    if (!auth.isExistUser){
      //特定のディレクトリならリダイレクトしない
      if(notRedirectPaths.includes(to.path)){
        return
      }
      //ホームにリダイレクトする
      const msg = 'まずはログインしてください'
      console.log(msg)
      alert(msg)
      return navigateTo({path:'/'})
    }
})
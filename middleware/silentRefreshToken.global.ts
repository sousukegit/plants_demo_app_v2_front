
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
            // TODO アクセスルート記憶

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

    // //リロードしたときはストア情報が消えるのでログイン状態の維持
    // if(to.path==from.path){
    //     reload.value = true
    //     console.log("reload!")
    //     refresh() 
    // }



//①まず、ログイン状態を保持するために、ストアのデータが存在するか確認する。真鍋　
//その後確認処理をする処理

//↑これはPINIAのリロード時の永続化対応してトークン保持すればよいだけでは？
//これで実際にストアのデータが残るので、わざわざapiにログインデータを取りに行かなくてもいい
//↑PINIAの永続化はセッションストレージに保存している
//これはデコードしたアクセストークンを設置することになるのでセキュリティ的に⚠

//Vue History State Pluginを使えばリロードしたことを検知できる
//グローバルのミドルウェアでリロードしたタイミングだけリフレッシュトークンを見に行くようにすれば
//ストアデータがが保持できるのでログインしたままの実装を行うことができる


//リロードしたタイミングで取得したら正確な期限ではなくなるというのもある

//ユーザーが存在するかつ、アクセストークンの期限が切れた時

//APIにリフレッシュでpostし、
//リフレッシュトークンと検証して判定して新しいアクセストークンを持ってくる

//リフレッシュトークンの期限が切れていたらログイン画面にリダイレクト
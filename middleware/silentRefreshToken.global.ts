
//このメソッドはグローバルメソッドとする
import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
export default defineNuxtPlugin( () =>{
    console.log("global silent")
    const config = useRuntimeConfig()
    const auth = useAuthStore(); 
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    }; 

    if (auth.isExistUserAndExpired) {        
        console.log('Execute silent refresh!!')

        const refresh = async() => {
            try {
            const response = await useApi('/api/v1/auth_token/refresh',customHeaders);
            // 成功時の処理
            auth.setAuth(response)
            console.log(response)
            } catch (error) {
                // エラー時の処理
            console.error(error);
            const msg = 'セッションの有効期限が切れました。' +
                        'もう一度ログインしてください'
            // TODO test
            console.log(msg)
            // TODO トースター出力
            // store.dispatch('getToast', { msg })
            // TODO アクセスルート記憶
            // store.dispatch('getRememberPath', route)
            // Vuexの初期化(セッションはサーバで削除済み)

            }  
        }
        async function refreshFunc(){
           await refresh()
        }
        refreshFunc()

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

//このメソッドはグローバルメソッドとする
//
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("global middlewara")
    const config = useRuntimeConfig()
    const reload = ref(false)
    const auth = useAuthStore();   
    const refresh = async() =>{
      const response = await $fetch(
        config.public.apiOrigin+'/api/v1/auth_token/refresh',
        {
            method:"POST",
            credentials: 'include', 
            body:{},                             
            headers:{
                'X-Requested-With': 'XMLHttpRequest', 
                'Authorization': `Bearer ${auth.auth.token}`,
                                                                  
            },                
        }
        ).then(response =>{
          auth.setAuth(response)
        }).catch(error=>{
            console.log(error)
        })    
    }

    // //リロードしたときはストア情報が消えるのでログイン状態の維持
    // if(to.path==from.path){
    //     reload.value = true
    //     console.log("reload!")
    //     refresh() 
    // }
  })


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
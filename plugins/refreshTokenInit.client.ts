import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
//セッション情報が改ざんされた場合、Rails側でセッション情報はさくじょ
export default defineNuxtPlugin( async () =>{
    console.log("plugins refreshTokenInit")
    const config = useRuntimeConfig()
    console.log("fin runtimeconfig")
    const auth = useAuthStore();
    console.log("fin useAuthStore");
     const refresh = async() =>{
        console.log("start $fetch");
        await $fetch(
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
            console.log("fin $fetch");
            auth.setAuth(response)
            console.log(auth.user)
            //ログイン状態であればログイントップにリダイレクト
            navigateTo('/main')
          }).catch(error=>{

          })
    }

    async function initFunc(){
        console.log("start initFunc");
        const response = await refresh()
    }

    await refresh()
    console.log("fin Public");
})

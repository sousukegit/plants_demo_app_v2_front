import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
//セッション情報が改ざんされた場合、Rails側でセッション情報はさくじょ
export default defineNuxtPlugin( async () =>{
    console.log("plugins refreshTokenInit")
    const config = useRuntimeConfig()
    const auth = useAuthStore(); 
     const refresh = async() =>{
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
            auth.setAuth(response)
            console.log(response)
            //ログイン状態であればログイントップにリダイレクト
            navigateTo('/main')
          }).catch(error=>{
             
          })    
    }    

    async function initFunc(){
        const response = await refresh()
    }

    await initFunc()
     
})
    

  
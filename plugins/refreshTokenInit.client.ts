import { useAuthStore } from '~~/stores/auth';

//リロード時や初期アクセス時にリフレッシュトークンを持っていたらログイン状態にする
//セッション情報が改ざんされた場合、Rails側でセッション情報はさくじょ
export default defineNuxtPlugin( async () =>{
    const auth = useAuthStore();
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    };
    const refresh = async() =>{
        try {
            const response = await usePost('/api/v1/auth_token/refresh',{},customHeaders);
            auth.setAuth(response);
            navigateTo('/main');
        } catch (error) {
            console.log(error);
        }

    }
    
    refresh();
})

import { type loginResponse } from "~~/types/loginResponse";

export const useAuthSuccessful= () =>  {
    const authSuccessful = (response:loginResponse) =>{
        // ①ログイン処理
        //ユーザー情報をストアへ
console.log("loginsuccess")
        const auth = useAuthStore();
        auth.setAuth(response)
        //　②記憶ルートにリダイレクト
        navigateTo('/main')
    }
    return {authSuccessful};
}



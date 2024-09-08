import { type errorResponse } from "~~/types/errorResponse";

export const useAuthFailure = () => {
    const authFailure = (response:errorResponse) => {
        if(response && response.status === 404){
            //トースタ出力
            console.log("ログイン失敗")
        }
        //エラー処理
        console.log('authFailure',response)
    };
    return {authFailure};
}
<script setup lang="ts">
import { type User } from "~~/types/user";
import { useAuthStore } from '~~/stores/auth';
const auth = useAuthStore();



//環境変数を取得
const config = useRuntimeConfig()

interface login{
    email:String|null,
    password:String|null,
}

const User = reactive<login>({
    email:"user0@example.com",
    password:"password"
    // email:"",
    // password:""
})

const userData = reactive({
  auth:User
})

const login = async() => {
    try {
    const response = await usePost('/api/v1/auth_token',userData);
    // 成功時の処理
    authSuccessful(response)
    } catch (error) {
        // エラー時の処理
    console.error(error);
    authFailure(error)
    }
}
async function loginFunc(){
   await login()
}

const authSuccessful = (response) =>{
    console.log('authSuccessful',response)
    // ①ログイン処理
    //ユーザー情報をストアへ
    auth.setAuth(response)

    //　②記憶ルートにリダイレクト
    navigateTo('/main')

}
const authFailure = (response) => {
    if(response && response.status === 404){
        //トースタ出力
        console.log("ログイン失敗")
    }
    //エラー処理
    console.log('authFailure',response)
}


</script>
<template>
    <TheContainer>
        <WhiteContainer>
            <AppH2>ログイン</AppH2>
            <label>メールアドレス</label>
                <inputText v-model="User.email" :max="60" ></inputText>

            <div class="flex justify-between">
                <label>パスワード</label>
                <NuxtLink class="text-sm text-accent-600 underline dark:text-cream" to="#">パスワードを忘れた？</NuxtLink>
            </div>
                <InputPassword v-model="User.password" :min="8"></InputPassword> 
            <div class="mx-auto my-2">
                <ButtonPrimary :on-click="loginFunc" >ログイン</ButtonPrimary>
            </div>
        </WhiteContainer>
    </TheContainer>
</template>

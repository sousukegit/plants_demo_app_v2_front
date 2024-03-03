<template>    
    <TheContainer> 
        <AppH2>ログイン</AppH2>
        <label>メールアドレス</label>
            <inputText v-model="User.email" :max="60" ></inputText> 
        
        <div class="flex justify-between">
            <label>パスワード</label>
            <NuxtLink class="text-sm text-accent-600 underline" to="#">パスワードを忘れた？</NuxtLink>
        </div>        
            <InputPassword v-model="User.password" :max="8"></InputPassword> 
        <div class="mx-auto my-2">
            <ButtonPrimary :on-click="submit" >ログイン</ButtonPrimary>        
        </div>
        <div>{{ userData }}</div> 
             <br> <button @click="auth.namechange()">log</button>          
    </TheContainer>
</template>

<script setup lang="ts">
import { type User } from "~~/types/entities";
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
})

const userData = reactive({
  auth:User
})

const submit = async() =>{
        const response = await $fetch(
            config.public.apiOrigin+'/api/v1/auth_token',
            {
                method:"POST",
                body:JSON.stringify({
                    auth: User,
                    }),                             
                headers:{
                    'X-Requested-With': 'XMLHttpRequest',                                       
                },                
            }
        ).then(response =>{
            authSuccessful(response)
        }).catch(error=>{
            authFailure(error)
        })    
    }

const authSuccessful = (response) =>{
    console.log('authSuccessful',response)
    // ①ログイン処理
    //ユーザー情報をストアへ
    auth.setAuth(response.token,response.expires,response.user)
    

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

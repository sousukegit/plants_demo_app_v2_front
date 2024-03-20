<template> 
    <TheContainer> 
        <WhiteContainer>
            <AppH2>アカウント作成</AppH2>
            <label>ニックネーム
                <inputText v-model="User.name" :max="30"></inputText> 
                    
            </label>
            <label>メールアドレス
                <inputText v-model="User.email" :max="60" ></inputText> 
            </label>
            <label>パスワード
                <InputPassword v-model="User.password" :min="8"></InputPassword> 
            </label>
            <ButtonPrimary :on-click="signupFunc" >登録する</ButtonPrimary>
        </WhiteContainer>           
    </TheContainer>
</template>

<script setup lang="ts">

import { type User } from "~~/types/entities";

const User = reactive<User>({
    name:"",
    email:"",
    password:""
})
const userData = reactive<T>({
    user:User
})

const signup = async() => {
    try {
    const response = await usePost('/api/v1/users',userData);
    // 成功時の処理
    console.log(response)
    navigateTo("/signupAfter")
    } catch (error) {
        // エラー時の処理
    console.error(error);
    }  
}
async function signupFunc(){
    await signup()
}




</script>

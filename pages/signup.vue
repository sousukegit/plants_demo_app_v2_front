<script setup lang="ts">

import { type User } from "~~/types/user";

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const user = {
    name:name.value,
    email:email.value,
    password:password.value
}
const userData = computed(() => {
 return {user: user} 
});

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
<template> 
    <TheContainer> 
        <WhiteContainer>
            <AppH2>アカウント作成</AppH2>
            <label>ニックネーム
                <inputText v-model="user.name" :max="30"></inputText> 
                    
            </label>
            <label>メールアドレス
                <inputText v-model="user.email" :max="60" ></inputText> 
            </label>
            <label>パスワード
                <InputPassword v-model="user.password" :min="8"></InputPassword> 
            </label>
            <div>{{ userData }}</div>
            <ButtonPrimary :on-click="signupFunc" >登録する</ButtonPrimary>
        </WhiteContainer>           
    </TheContainer>
</template>

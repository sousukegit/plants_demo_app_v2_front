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
    </TheContainer>
</template>

<script setup lang="ts">

import type { NuxtLink } from "#build/components";
import { type User } from "~~/types/entities";

const User = reactive<User>({
name:"",
email:"",
password:""
})

const userData = reactive({
  user:User
})
const submit = () =>{
console.log(userData)

}


</script>

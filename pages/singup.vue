<template>    
    <div>
        <AppH1>Green</AppH1>       
    </div>
    <TheContainer> 
        <AppH2>アカウント作成</AppH2>
        <label>ニックネーム
            <inputText v-model="User.name" :max="30"></inputText> 
                 
        </label>
        <label>メールアドレス
            <inputText v-model="User.email" :max="60" ></inputText> 
        </label>
        <label>パスワード
            <InputPassword v-model="User.password" :max="8"></InputPassword> 
        </label>
        <ButtonPrimary @click="submit" >登録する</ButtonPrimary>
        
    </TheContainer>
    

</template>

<script setup lang="ts">
import { type User } from "~~/types/entities";

const User = reactive<User>({
    name:"",
    email:"",
    password:""
})
definePageMeta({
    layout:"BeforeLogin",
});





const userData = reactive<T>({
    user:{
        ...User
    }
})
const submit = () =>{
    console.log(userData)

}


</script>

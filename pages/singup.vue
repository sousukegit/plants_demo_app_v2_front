<template>    
    <div>
        singup        
    </div>
    <TheContainer> 
        <label>ニックネーム
            <inputText v-model="User.name"></inputText>        
        </label>
        <label>メールアドレス
            <inputText v-model="User.email"></inputText> 
        </label>
        <label>パスワード
            <inputText v-model="User.password"></inputText> 
        </label>
        <ButtonPrimary @click="submit" >登録する</ButtonPrimary>
        <div>{{userData}}</div>
    </TheContainer>
    

</template>

<script setup lang="ts">
import { type User } from "~~/types/entities";

definePageMeta({
    layout:"BeforeLogin",
});


const User = reactive<User>({
    name:"",
    email:"",
    password:""
})

const userData = reactive<T>({
    user:{
        ...User
    }
})
const submit = () =>{
    console.log(userData.user)

}


</script>

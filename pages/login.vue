<script setup lang="ts">
import { type loginForm } from "~~/types/loginForm";
import { type authLoginForm } from "~~/types/authLoginForm";

const {login} = useLogin();

const  { authSuccessful }  = useAuthSuccessful();
const  { authFailure }  = useAuthFailure();

const email = ref<string>("");
const password = ref<string>("");

const loginForm = computed<authLoginForm>(() => {
 return {auth: {
    email: email.value,
    password: password.value
  }} 
});



</script>

<template>
    <TheContainer>
        <WhiteContainer>
            <AppH2>ログイン</AppH2>
            <form>
                <label>メールアドレス</label>
                <InputEmail v-model="email" :max="60" ></InputEmail>
                <div class="flex justify-between">
                    <label>パスワード</label>
                    <NuxtLink class="text-sm text-accent-600 underline dark:text-cream" to="#">パスワードを忘れた？</NuxtLink>
                </div>
                <InputPassword v-model="password" :min="8"></InputPassword> 
                <div class="mx-auto my-2">
                    <ButtonPrimary :on-click="()=>login(loginForm,authSuccessful,authFailure)" >ログイン</ButtonPrimary>
                </div>
            </form>
        </WhiteContainer>
    </TheContainer>

</template>

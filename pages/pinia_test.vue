<template>
  <h1>Pinia入門</h1>
  <p>User:{{ auth.count}}</p>
  <ButtonSecondary :on-click="login">ログイン</ButtonSecondary>
  <button @click="auth.namechange()">log</button><br>
  <button @click="auth.changename(name)">manabe</button><br>
  <button @click="auth.changename(name1)">sousuke</button><br>
  <ButtonSecondary :on-click="auth.namechange">namechange</ButtonSecondary>

</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
const auth = useAuthStore();
const name = "manabe"
const name1 = "sousuke"
const login = () => {
    navigateTo(`/login`);
  }


</script>
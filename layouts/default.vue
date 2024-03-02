<template>
    <header>
        <div class ="flex justify-between bg-cream mx-2" >
        <div><AppH1>hello plants</AppH1></div>
        <div v-if="loginFlg==1">
            <ButtonSecondary :on-click="login">ログイン</ButtonSecondary>
            <ButtonSecondary :on-click="logout">ログアウト</ButtonSecondary>
            <ButtonSecondary :on-click="singup">ユーザー登録</ButtonSecondary>
            <ButtonSecondary :on-click="piniatest">pinia_test</ButtonSecondary>
        </div>
        <div v-else>            
            <button>ログイン</button>
            
        </div>      
    </div>
    </header>
   
    <div>
        <slot/>
    </div>
</template>
<script setup lang="ts">
 const loginFlg = ref<Number>(1)

 const logout = () => {
    navigateTo(`/`);
  }
  const login = () => {
    navigateTo(`/login`);
  }
  const singup = () => {
    navigateTo(`/singup`);
  }
  const piniatest = () => {
    navigateTo(`/pinia_test`);
  }
</script>
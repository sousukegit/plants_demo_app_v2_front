<template>
    <header>
        <div class ="flex justify-between bg-cream mx-2" >
        <div><AppH1>hello plants</AppH1></div>
        <div v-if="loginFlg==1">
            <ButtonSecondary @click="logout">ログアウト</ButtonSecondary>
            <ButtonSecondary>ユーザー情報編集</ButtonSecondary>
                    
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
    navigateTo(`/singup`);
  }
</script>
<template>
  <div>ようこそ<ClientOnly>{{ userName }}</ClientOnly>さん</div>
    
    <!-- <div>ようこそ{{ userEmail }}さん</div> -->
    <ButtonSecondary @click="log()">log</ButtonSecondary>

    
</template>
<script setup lang="ts">
  import { useAuthStore } from '~~/stores/auth';
  import { useUserStore } from '~~/stores/user';
  // definePageMeta({
  //   middleware: ['redirectNotUser']
  // })
  const auth = useAuthStore();
  const user = useUserStore();
  const userName = ref<string>("unknown")
  const userEmail = ref<string>("unknown")
  userEmail.value = user.user.email
  userName.value = auth.user.name
 
   
    console.log('middlewara/user')
    console.log(auth.auth.token)
  const log = () => {
    console.log(userEmail.value)
    alert("log")
  }

  // onMounted(() => {
    
  //   if(auth.auth.token == null ||auth.auth.token == "" ){   
  //     alert("アクセス権限がないのでログアウトします") 
  //     navigateTo("/login")
  // }
  // })
 

</script>
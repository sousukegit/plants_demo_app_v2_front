<template>
    <header>
        <div class ="flex justify-between bg-cream mx-2" >
        <div><AppH1>hello plants</AppH1></div>
        <div v-if="loginFlg">
        <ClientOnly>
          <ButtonSecondary :on-click="logout">ログアウト</ButtonSecondary>        
        </ClientOnly>    
           
        </div>
        <div v-else>
          <ClientOnly>
            <ButtonSecondary :on-click="login">ログイン</ButtonSecondary>
            <ButtonSecondary :on-click="singup">ユーザー登録</ButtonSecondary>  
          </ClientOnly> 
        </div>      
    </div>
    </header>
   
    <div>
        <slot/>
    </div>
</template>
<script setup lang="ts">

import { useAuthStore } from '~~/stores/auth';
 const loginFlg = ref<boolean>(false) 
 const auth = useAuthStore();
 const config = useRuntimeConfig()
 if(auth.loggedIn){
    loginFlg.value = true
 }

 async function tokenDelete(){
  try {
    console.log(auth.auth.token)
      //先にユーザーを用意
  const  res  = await $fetch(config.public.apiOrigin+'/api/v1/auth_token',
          {       
          method:"DELETE",
          credentials: 'include',
          headers:{
          'X-Requested-With': 'XMLHttpRequest', 
          // 'Authorization': `Bearer ${auth.auth.token}`
          }  
       }                    
      )
      .then(res=>{
          console.log(res)          
      })                
  }
   catch (error) {      
    console.log(error)     
  }
}

 const logout = () => {
    tokenDelete()
    navigateTo(`/`)
    loginFlg.value = false
  }
  const login = () => {

    

    navigateTo(`/login`);
  }
  const singup = () => {
    navigateTo(`/signup`);
  }
  const piniatest = () => {
    navigateTo(`/pinia_test`);
  }
</script>
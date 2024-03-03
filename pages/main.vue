<template>
    <div>ようこそ{{ userName }}さん</div>
    
</template>
<script setup lang="ts">
  import { useAuthStore } from '~~/stores/auth';
  definePageMeta({
    middleware: ['user']
  })
  const auth = useAuthStore();
  const userName = ref<string>("unknown")
  userName.value = auth.user.current.name


  const config = useRuntimeConfig()    
   
    console.log('middlewara/user')
    console.log(auth.auth.token)

    // async function getHello(){
    //     try {
    //         //先にユーザーを用意
    //     const { data } = await $fetch(config.public.apiOrigin+'/api/v1/users',{
    //         headers:{
    //             'X-Requested-With': 'XMLHttpRequest', 
    //             'Authorization': `Bearer ${auth.token}`
    //             }  
    //          }                    
    //         )
    //         console.log(data)            
    //     } catch (error) {
            
    //     }
        
    // } 
    // await getHello()

</script>
<template>
  <TheContainer>
  <div>ようこそ<ClientOnly>{{ userName }}</ClientOnly>さん</div>

  <AppLink  :href="`/place`">場所から探す</AppLink>

  </TheContainer> 
</template>
<script setup lang="ts">
  import AppLink from '~/components/AppLink.vue';
import ButtonSecondary from '~/components/ButtonSecondary.vue';
import { useAuthStore } from '~~/stores/auth';
  import { useUserStore } from '~~/stores/user';
  // definePageMeta({
  //   middleware: ['redirectNotUser']
  // })
  const auth = useAuthStore();
  const user = useUserStore();
  const userName = ref<string>("unknown")
  const userEmail = ref<string>("unknown")
  const customHeaders = {
      'Authorization': `Bearer ${auth.auth.token}`
  }; 

  userEmail.value = user.user.email
  userName.value = auth.user.name 

  const places = ref<string[]>("")
  // onMounted(() => {
  //   const getPlaces = async() => {
  //           try {
  //           const response = await useGet('/api/v1/places',customHeaders);
  //           // 成功時の処理
  //           console.log(response)
  //           places.value = response
  //           console.log(places.value)
  //           } catch (error) {
  //           console.log(error)          
  //           }  
  //       }
  //       async function getPlacesFunc(){
  //          await getPlaces()
  //       }
  //       getPlacesFunc()
  // })
 

</script>
<template>
    <TheContainer>
        <!-- ここにはgooglemap載せる -->
    <AppH1>MAP</AppH1>
 
    <div v-if="places.length">
      <div v-for="(place,i) in places"
          :key="place.id"   
        >
        <AppLink :href="`/place/${place.id}`">{{ place.name }}</AppLink> 
  
      </div>
    </div>  
      <!-- <div>ようこそ{{ userEmail }}さん</div> -->
      <ButtonSecondary @click="getReviewAverageFunc()">ave</ButtonSecondary>   
    </TheContainer> 
  </template>
  <script setup lang="ts">
    import { useAuthStore } from '~~/stores/auth';
    import { useUserStore } from '~~/stores/user';
    import { useTagsStore } from '~~/stores/tags';
    import { useHistoryState } from 'vue-history-state'

    const tag = useTagsStore();
    const historyState = useHistoryState()
      if (historyState.action === 'back') {
        //tag情報をリセット
        tag.resetPlaceTag()
        }

    const auth = useAuthStore();
    const userName = ref<string>("unknown")
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    }; 

    userName.value = auth.user.name 
  
    const places = ref<string[]>("")
    onMounted(() => {
      const getPlaces = async() => {
              try {
              const response = await useGet('/api/v1/places',customHeaders);
              // 成功時の処理
              console.log(response)
              places.value = response
              console.log(places.value)
              } catch (error) {
              console.log(error)
              }  
          }
          async function getPlacesFunc(){
             await getPlaces()
          }
          getPlacesFunc()
      const getReviewAverage = async() => {
              try {
              const response = await useGet(`/api/v1/reviews/average`,customHeaders);
              //TODO 成功時の処理
              console.log(response)
              } catch (error) {
              console.log(error)          
              }  
        }
        async function getReviewAverageFunc(){
            await getReviewAverage()
        }
        getReviewAverageFunc()

    })


   
  
  </script>
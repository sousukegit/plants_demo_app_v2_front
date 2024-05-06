<script setup lang="ts">

import { useAuthStore } from '~~/stores/auth';
import { useUserStore } from '~~/stores/user';
import { register } from 'swiper/element/bundle';
register();
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

  userEmail.value = user.user.emaiz
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
<template>
  <swiper-container
            navigation="true"
            pagination="true"
            scrollbar="true"
            >
              <!-- <swiper-slide
              v-if="srcs.length > 0"
              v-for="(src, i) in srcs" :key="i" eager
              >
                  <div>
                  <a href="#" target="_blank">
                    <img class="object-cover h-80 lg:h-96 mx-auto w-full xl:max-w-screen-lg" :src="src" />
                  </a>
                  </div>
              </swiper-slide> -->
              <swiper-slide
              >
              <div>
                  <a href="#" target="_blank">
                    <img class="object-cover h-80 lg:h-96 mx-auto w-full xl:max-w-screen-lg" src="/assets/images/plantimage.jpg" />
                  </a>
                  </div>
              </swiper-slide>
    </swiper-container>
  <TheContainer>

  <WhiteContainer

    <AppLink  :href="`/place`">場所から探す</AppLink>
    <AppLink  :href="`/species`">種類から探す</AppLink>
  </WhiteContainer>

  </TheContainer>
</template>
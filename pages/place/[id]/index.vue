<template>
  <TheContainer>
    <div class="border-2 border-coffee rounded-t-lg">
      <div id="tab" class="grid grid-cols-3  bg-cream rounded-t-lg">
      <div  @click="isSelect('1')" class="w-full text-center">TOP</div>
      <div  @click="isSelect('2')" class="w-full border-x-2 border-coffee  text-center">写真</div>
      <div  @click="isSelect('3')" class="w-full text-center ">口コミ</div>
    </div>
   <div class="w-full bg-cream">
    <!-- 店舗情報TOP -->
        <div v-if="isActive === '1'"
        class="p-2"
        >
            <!-- トップは店舗情報、口コミ、写真、地図を表示する -->
          <div v-if="place">
              <AppH2>{{ place.name }}</AppH2>
              <div>{{ place.google_place_id }}</div>
          </div>
      <!-- 口コミの詳細と、口コミを書く画面に遷移するようにする -->
        </div>
    <!-- 口コミ写真一覧 -->
        <div v-else-if="isActive === '2'">Tab News
        
        </div>
    <!-- 口コミ情報一覧（最新） -->
        <div v-else-if="isActive === '3'">Tab Event
          <div v-for="(review,i) in reviews" 
          :key="review.id" 
          class="border">
            <div>{{ review.user_id }}</div>
            <div>{{ review.comment }}</div>
            <AppLink :href="`/place/${placeID}/${review.id}`">口コミをみる</AppLink>
          </div>
        </div>
    </div>

    </div>
    <div>aa</div>
    <AppLink :href="`/place/${place.id}/post-review`">タップしてレビュー</AppLink>

  </TheContainer>
 
  
  </template>
  <script setup lang="ts">

import { useAuthStore } from '~~/stores/auth';
// https://github.com/fengyuanchen/compressorjs　画像加工モジュール
//import  Compressor  from 'compressorjs';


    const auth = useAuthStore();
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    }; 

  //タブ切り替え
  const isActive = ref("1")
  const isSelect = (num:string) => {
    isActive.value = num
  }

  //ルートIDをURLより取得
  const route = useRoute()
  const placeID =route.params.id 
  
  //店舗情報取得
  const place = ref<string>("")
  const reviews = ref([])

  onMounted(() => {
    const getPlaces = async() => {
            try {
            const response = await useGet(`/api/v1/places/${placeID}`,customHeaders);
            //TODO 成功時の処理
            console.log(response)
            
            google_place_id.value = response.google_place_id
  
            place.value = response
            reviews.value = response.reviews
            console.log(place.value)
            } catch (error) {
            console.log(error)          
            }  
        }
        async function getPlacesFunc(){
            await getPlaces()
        }
        getPlacesFunc()
  })

  
  //GoogleAPI
  
  //口コミのポスト
  
  //ポストデータ
  const place_id = ref<Number>(placeID);
  const google_place_id = ref<String>("");
  const user_id = ref<Number>(auth.user.id);
  
  // onMounted(() => {
  //   const toReview = () =>{
  //   navigateTo(`/place/${place.id}/review`)
  // }
  // })
  
  </script>
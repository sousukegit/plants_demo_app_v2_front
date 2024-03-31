<template>
  <TheContainer>
    <div class="border-2 border-coffee rounded-t-lg">
      <div id="tab" class="grid grid-cols-3  bg-cream rounded-t-lg">
      <div  @click="isSelect('#top')" class="w-full text-center">TOP</div>
      <div  @click="isSelect('#photo-list')" class="w-full border-x-2 border-coffee  text-center">写真</div>
      <div  @click="isSelect('#review-list')" class="w-full text-center ">口コミ</div>
    </div>
   <div class="w-full bg-cream">
    <!-- 店舗情報TOP -->
        <div v-show="isActive === '#top'"
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
        <div v-show="isActive === '#photo-list'"
        class="p-2"
        >
          <div >
            <AppH2>写真一覧</AppH2>
            <!-- //gridで正方形にならぶ -->
            <div>aaaa</div>
          </div>
        </div>
    <!-- 口コミ情報一覧（最新） -->
        <div v-show="isActive === '#review-list'"
        class="p-2"
        >
          <AppH2>口コミ一覧</AppH2>
          <div v-for="(review,i) in reviews"
          :key="review.id"
          class="border"
          >
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
import { useTagsStore } from '~~/stores/tags';


  const auth = useAuthStore();
  //ブラウザバックタグ記憶用
  const tag = useTagsStore();
  const customHeaders = {
      'Authorization': `Bearer ${auth.auth.token}`
  };

  //ルートIDをURLより取得
  const route = useRoute()
  const placeID =route.params.id

  //タグクリックを検知
  const tagClick = ref<boolean>(false)

 //タブ切り替え
 const isActive = ref(tag.placeTag)
  const isSelect = (hash:string) => {
    isActive.value = hash
    tag.placeTag = hash
  }


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
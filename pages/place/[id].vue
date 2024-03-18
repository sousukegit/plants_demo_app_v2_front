<template>
<TheContainer>
<!-- トップは店舗情報、口コミ、写真、地図を表示する -->
<div v-if="place">
    <div>{{ place.name }}</div>
</div>
<!-- 口コミの詳細と、口コミを書く画面に遷移するようにする -->
<!-- タブで口コミ一覧と情報を切りわけ -->
<ButtonSecondary :on-click="reviewFunc">レビュー送信</ButtonSecondary>
</TheContainer>


</template>
<script setup lang="ts">
import ButtonSecondary from '~/components/ButtonSecondary.vue';
import { useAuthStore } from '~~/stores/auth';
  const auth = useAuthStore();
  const customHeaders = {
      'Authorization': `Bearer ${auth.auth.token}`
  }; 

//ルートIDをURLより取得
const route = useRoute()
const placeID =route.params.id 

//店舗情報取得
const place = ref<string>("")
onMounted(() => {
  const getPlaces = async() => {
          try {
          const response = await useGet(`/api/v1/places/${placeID}`,customHeaders);
          //TODO 成功時の処理
          console.log(response)
          
          google_place_id.value = response.google_place_id

          place.value = response
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
const comment = ref<String>("");
const price_point = ref<Number>(null);
const mania_point = ref<Number>(null);
const health_point = ref<Number>(null);
const user_id = ref<Number>(auth.user.id);

//testデータ
price_point.value = 5
mania_point.value = 5
health_point.value = 5
comment.value = `${auth.user.name}は最高と感じました（テスト）`  

//オブジェクトにする
const reviewData = reactive({
  review:{
    place_id: place_id.value,
    google_place_id: google_place_id,
    comment: comment.value,
    price_point: price_point.value,
    mania_point: mania_point.value,
    health_point: health_point.value,
    user_id: user_id.value
  }
})


const review = async() => {
  try {
  const response = await usePost('/api/v1/reviews',reviewData);
  // 成功時の処理
  console.log(response)
  } catch (error) {
      // エラー時の処理
  console.error(error);
  }  
}
async function reviewFunc(){
  await review()
}



</script>
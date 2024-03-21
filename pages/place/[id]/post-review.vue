<template>
     <!-- タブで口コミ一覧と情報を切りわけ -->
     <TheContainer>
        <WhiteContainer>
            <AppH2>{{ place.name }}のレビュー</AppH2>
            <AppH3>総合満足度</AppH3>
            <!-- todo railsにカラム追加 -->
            <div class="ml-0 w-40">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'32px'"
                :rating-value="4"
                @rating-selected="setRating" />
            </div>            
            <AppH3>植物部門別</AppH3>
            <div>管理状態</div>
            <div class="ml-0 w-40">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setHealthPoint" />
            </div>                
            <div>価格帯</div>
            <div class="ml-0 w-40">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setPricePoint" />
            </div>            
            <div>マニア度</div>
            <div class="ml-0 w-40">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setManiaPoint" />
            </div>            
            <AppH3>店舗にいた種類</AppH3>
            <!-- 　TODO　ハッシュタグをつける -->

            <AppH3>写真</AppH3>
              <!-- 　TODO　アップロード機能 -->
            <AppH3>コメント</AppH3>           
                <inputTextarea v-model="comment"></inputTextarea>
            <ButtonPrimary :on-click="reviewFunc">レビューを送信する</ButtonPrimary>
        </WhiteContainer>
        <div>{{ reviewData }}</div>
     </TheContainer>
  
</template>
<script setup lang="ts">

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


  //口コミのポスト
  
  //ポストデータ
  const place_id = ref<Number>(placeID);
  const google_place_id = ref<String>("");
  const comment = ref<String>("");
  const rating = ref<Number>(4);
  const price_point = ref<Number>(4);
  const mania_point = ref<Number>(4);
  const health_point = ref<Number>(4);
  const user_id = ref<Number>(auth.user.id);
  
  //データをセット
  const setRating = (event: number) =>{
    rating.value = event
  }
  const setHealthPoint = (event: number) =>{
    mania_point.value = event
  }
  const setPricePoint= (event: number) =>{
    price_point.value = event
  }
  const setManiaPoint= (event: number) =>{
    mania_point.value = event
  }

  comment.value = `${auth.user.name}は最高と感じました（テスト）` 
  
  const reviewData = reactive({
    place_id: place_id,
    google_place_id: google_place_id,
    comment: comment,
    rating: rating,
    price_point: price_point,
    mania_point: mania_point,
    health_point: health_point,
    user_id: user_id
});
  
  //オブジェクトにする
  const reviewSend = reactive({
    review:reviewData
  })
  
  
  const review = async() => {
    try {
    console.log(reviewData)
    const response = await usePost('/api/v1/reviews',reviewSend);
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
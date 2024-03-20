<template>
     <!-- タブで口コミ一覧と情報を切りわけ -->
     <TheContainer>
        <WhiteContainer>
            <AppH2>{{ place.name }}のレビュー</AppH2>
            <AppH3>総合満足度</AppH3>
            <NuxtRating
            :read-only="false"
            :rating-count="5.0"
            :rating-size="'32px'"
            :rating-value="4"
            @rating-selected="setRating" />
            <AppH3>植物部門別</AppH3>
                <div>管理状態</div>
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'28px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setHealthPoint" />
                <div>価格帯</div>
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'28px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setPricePoint" />
                <div>マニア度</div>
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'28px'"
                :rating-value="4"
                rating-content="🌱"
                @rating-selected="setManiaPoint" />
            <AppH3>店舗にいた種類</AppH3>
            <!-- 　TODO　ハッシュタグをつける -->

            <AppH3>写真</AppH3>
              <!-- 　TODO　アップロード機能 -->
            <AppH3>コメント</AppH3>           
                <inputTextarea v-model="comment"></inputTextarea>
            <ButtonPrimary :on-click="reviewFunc">レビューを送信する</ButtonPrimary>
        </WhiteContainer>
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
  const price_point = ref<Number>(null);
  const mania_point = ref<Number>(null);
  const health_point = ref<Number>(null);
  const user_id = ref<Number>(auth.user.id);
  
  //データをセット
  const setRating = (event: number) =>{
    console.log(event);
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
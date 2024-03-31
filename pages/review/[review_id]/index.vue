<template>
    <!-- レビュー確認ん -->
    <TheContainer>
        <WhiteContainer>
            <AppH2>{{ place.name }}の口コミ編集</AppH2>
            <AppH3>総合評価</AppH3>
            <div class="flex gap-2">
                <div class="ml-0 w-38" v-if="review.rating !== null && review.rating !== undefined">
                    <NuxtRating
                    :read-only="false"
                    :rating-count="5.0"
                    :rating-size="'32px'"
                    :rating-value="review.rating"
                    />
                </div>
                <div class= "ml-40">{{ review.rating }}</div>
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
            <AppH3>コメント</AppH3>
            <div>{{ review.comment }}</div>
            <AppH3  v-if="srcs !== null">写真</AppH3>
            <div class="grid sm:grid-cols-5 grid-cols-3 gap-1 ">
                <div
                v-if="srcs !== null"
                v-for="(src,i) in srcs"
                :key="i"
                >
                    <img  :src="src" class="h-32 w-32 sm:h-40 sm:w-40 object-cover ">
                </div>
            </div>
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
  const reviewID =route.params.review_id

  const review = ref("");
  const place = ref("");
  const user = ref("");
  const rating = ref(null);
  const srcs = ref<string[]>(null);

   onMounted(() => {
    const getReview = async() => {
            try {
            const response = await useGet(`/api/v1/reviews/${reviewID}`,customHeaders);
            //TODO 成功時の処理

            review.value = response            
            place.value = response.place
            user.value = response.user
            rating.value = response.rating
            srcs.value = response.image_url
            console.log(review.value)
            } catch (error) {
            console.log(error)          
            }  
        }
        async function getReviewFunc(){
            await getReview()
        }
        getReviewFunc()
  })

  //ポストデータ
// const place_id = ref<Number>(placeID);
// const google_place_id = ref<String>("");
// const comment = ref<String>("");
// //const rating = ref<Number>(4);
// const price_point = ref<Number>(4);
// const mania_point = ref<Number>(4);
// const health_point = ref<Number>(4);
// const user_id = ref<Number>(auth.user.id);

//データをセット
// const setRating = (event: number) =>{
//   rating.value = event
// }
// const setHealthPoint = (event: number) =>{
//   mania_point.value = event
// }
// const setPricePoint= (event: number) =>{
//   price_point.value = event
// }
// const setManiaPoint= (event: number) =>{
//   mania_point.value = event
// }


  const editReview = ():void => {
    navigateTo(`/review/${reviewID}`)
  }

 
</script>
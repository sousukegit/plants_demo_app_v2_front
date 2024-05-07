<script setup lang="ts">

import AppH3 from '~/components/AppH3.vue';
import { useAuthStore } from '~~/stores/auth';
   const auth = useAuthStore();
   const customHeaders = {
       'Authorization': `Bearer ${auth.auth.token}`
   };

  //ルートIDをURLより取得
  const route = useRoute()
  const placeID =route.params.id
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

  const editReview = ():void => {
    navigateTo(`/review/${reviewID}`)
  }
  const deleteReview = ():void => {
    //TODO　消しますか？　アラート
    if(window.confirm('このレビューを削除しますか？')){
        const deleteReview = async() => {
            try {
            const response = await useDelete(`/api/v1/reviews/${reviewID}`,customHeaders);
            //TODO 成功時の処理
            alert("レビューを削除しました。")
            navigateTo(`/place/${placeID}`)
            } catch (error) {
            console.log(error)
            }
        }
        async function deleteReviewFunc(){
            await deleteReview()
        }
        deleteReviewFunc()
    }
}

</script>
<template>
    <!-- レビュー確認ん -->
    <TheContainer>
        <WhiteContainer>
            <AppH2>{{ place.name }}の口コミ</AppH2>
            <div v-if="auth.user.id === review.user_id" class="flex gap-2 justify-end">
                <ButtonPrimary :on-click="editReview">編集する</ButtonPrimary>
                <ButtonDanger :on-click="deleteReview">削除する</ButtonDanger>
            </div>
            <AppH3><span>〇</span>{{user.name}}</AppH3>
            <AppH3>総合評価</AppH3>
            <div class="flex gap-2">
                <div class="ml-0 w-38" v-if="review.rating !== null && review.rating !== undefined">
                    <NuxtRating
                    :read-only="true"
                    :rating-count="5.0"
                    :rating-size="'32px'"
                    :rating-value="review.rating"
                    />
                </div>
                <div class= "ml-40">{{ review.rating }}</div>
            </div>

            <AppH3>植物レーダー</AppH3>
            <div>
            <Chart  v-if="review.rating !== null && review.rating !== undefined"
            :health_point = "review.health_point"
            :mania_point = "review.mania_point"
            :price_point = "review.price_point"
             />
            </div>
            <AppH3>コメント</AppH3>
            <div>{{ review.comment }}</div>
            <AppH3 >写真</AppH3>
            <div class="grid sm:grid-cols-5 grid-cols-3 gap-1 "
            v-if="srcs !== null"
            >
                <div
                v-if="srcs !== null"
                v-for="(src,i) in srcs"
                :key="i"
                >
                    <img  :src="src" class="h-32 w-full sm:h-40  object-cover ">
                </div>
            </div>
            <div v-else>写真はありません</div>
        </WhiteContainer>
    </TheContainer>
</template>
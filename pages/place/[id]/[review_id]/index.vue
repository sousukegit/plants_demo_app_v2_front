<template>
    <!-- レビュー確認ん -->
    <TheContainer>
        <WhiteContainer>
             <div>{{ review.id }}</div>
             <div>{{ review.user.name }}</div>
             <div>{{ review.comment }}</div>
             <img :src="review.image_url">
             <div>{{ review.image_url }}</div>
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

   onMounted(() => {
    const getReview = async() => {
            try {
            const response = await useGet(`/api/v1/reviews/${reviewID}`,customHeaders);
            //TODO 成功時の処理
            console.log(response)
            review.value = response
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
 
</script>
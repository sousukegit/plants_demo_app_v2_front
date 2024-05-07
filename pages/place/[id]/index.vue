<script setup lang="ts">

  import { useAuthStore } from '~~/stores/auth';
  import { useTagsStore } from '~~/stores/tags';
  import { register } from 'swiper/element/bundle';
  register();
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
  const users = ref([])
  const srcs = ref([])

  onMounted(() => {
    const getPlaces = async() => {
            try {
            const response = await useGet(`/api/v1/places/${placeID}`,customHeaders);
            //TODO 成功時の処理
            console.log(response)
            google_place_id.value = response.google_place_id
            place.value = response
            reviews.value = response.reviews
            for (let i = 0; i < response.reviews.length; i++) {
              srcs.value= srcs.value.concat(response.reviews[i].image_url) 
              users.value= users.value.concat(response.reviews[i].user)
            }
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
<template>
  <TheContainer>
    <div class="border-2 border-coffee rounded-t-lg px-2 bg-cream">
      <div id="tab" class="grid grid-cols-3 gap-2 bg-cream rounded-t-lg">
        <div  @click="isSelect('#top')" class="w-full text-center hover:bg-main-300 hover:text-cream transition-all duration-300"
          :class="{'border-b-main-500 border-b-4 font-bold ':isActive === '#top'}"
        >TOP</div>
        <div  @click="isSelect('#photo-list')" class="w-full  text-center hover:bg-main-300 hover:text-cream transition-all duration-300"
        :class="{'border-b-main-500 border-b-4 font-bold':isActive === '#photo-list'}"
        >写真</div>
        <div  @click="isSelect('#review-list')" class="w-full  text-center hover:bg-main-300 hover:text-cream transition-all duration-300"
        :class="{'border-b-main-500 border-b-4 font-bold':isActive === '#review-list'}"
        >口コミ</div>
    </div>
   <div class="w-full bg-cream">
    <!-- 店舗情報TOP -->
        <div v-show="isActive === '#top'" class="p-2">
            <!-- トップは店舗情報、口コミ、写真、地図を表示する -->
          <div v-if="place">
              <AppH2>{{ place.name }}</AppH2>
            <!-- todo 写真のスライダー -->
            <swiper-container
            navigation="true"
            pagination="true"
            scrollbar="true"
            >
              <swiper-slide
              v-if="srcs.length > 0"
              v-for="(src, i) in srcs" :key="i" eager
              >
                  <div>
                    <img class="object-cover h-80 lg:h-96 mx-auto w-full xl:max-w-screen-lg" :src="src" />
                  </div>
              </swiper-slide>
              <swiper-slide
              v-else>
                <div>
                  <img class="object-cover h-80 lg:h-96 mx-auto w-full xl:max-w-screen-lg" src="/assets/images/plantimage.jpg" />
                </div>
              </swiper-slide>
            </swiper-container>
            <!-- 現在の総合評価 　押したら口コミ一覧へ遷移-->
            <AppH3>評価</AppH3>

            <div class="flex gap-2"
            v-if="place.avg_reviews !== null && place.avg_reviews !== undefined">
                <div class= "ml-0 w-38">{{place.avg_reviews.rating }}</div>
                <NuxtRating
                  :read-only="true"
                  :rating-count="5.0"
                  :rating-size="'24px'"
                  :rating-value="parseFloat(place.avg_reviews.rating)"
                  />
            </div>
            <!-- <div>タップして評価の★</div> -->
            <!-- レーダー -->
            <AppH3>植物別評価</AppH3>
            <Chart  v-if="place.avg_reviews !== null && place.avg_reviews !== undefined"
            :health_point = "parseFloat(place.avg_reviews.health_point)"
            :mania_point = "parseFloat(place.avg_reviews.mania_point)"
            :price_point = "parseFloat(place.avg_reviews.price_point)"
             />
            <div v-else>まだ評価はありません</div>
            <!-- 口コミ 押したら詳細に遷移-->
            <AppH3>口コミ</AppH3>
            <div
              v-if="reviews.length > 0"
              v-for="(review,i) in reviews"
              :key="review.id"
              class="border rounded-md bg-cream dark:bg-coffee my-2 p-4 shadow-md
              hover:bg-accent-300 transition-all duration-300"
            >
              <a :href="`/place/${placeID}/${review.id}`">
                <div class="text-xl">{{ users[i].name }}</div>
                <!-- ★ -->
                <div v-if="review.rating !== null && review.rating !== undefined" class="flex gap-2 py-1" >
                    <div class= "ml-0 w-38">{{review.rating }}.0</div>
                    <NuxtRating
                      :read-only="true"
                      :rating-count="5.0"
                      :rating-size="'24px'"
                      :rating-value="parseFloat(review.rating)"
                      />
                </div>
                <!-- 写真 -->
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-1">
                  <div
                  v-for="(scr,i) in review.image_url"
                  :key="i">
                      <img :src="scr"
                      class="h-32 w-full sm:h-40  object-cover ">
                  </div>
                </div>
                <div>{{ review.comment }}</div>
              </a>
            </div>
            <div v-else>
              口コミはまだありません。
            </div>
          </div>
        </div>
    <!-- 口コミ写真一覧 -->
        <div v-show="isActive === '#photo-list'"
        class="p-2"
        >
            <AppH2>写真一覧</AppH2>
            <!-- //gridで正方形にならぶ -->
            <div v-if="srcs.length > 0"
            class="grid grid-cols-3 gap-1">
              <div
              v-for="(src,i) in srcs"
              :key="i"
              >
                <div>
                  <img :src="src"
                  class="h-32 w-full sm:h-40  object-cover ">
                </div>
              </div>
            </div>
            <div v-else>
               写真はまだありません。
            </div>

        </div>
    <!-- 口コミ情報一覧（最新） -->
        <div v-show="isActive === '#review-list'"
        class="p-2"
        >
          <AppH2>口コミ一覧</AppH2>
          <div
          v-if="reviews.length > 0"
          v-for="(review,i) in reviews"
          :key="review.id"
          class="border rounded-md p-2"
          >
            <div class="text-xl">{{ users[i].name }}</div>
            <!-- ★ -->
            <div class="flex">
               <div class= "ml-0 w-38">{{ review.rating }}.0</div>
                <div class="ml-0 w-38" v-if="review.rating !== null && review.rating !== undefined">
                    <NuxtRating
                    :read-only="true"
                    :rating-count="5.0"
                    :rating-size="'24px'"
                    :rating-value="review.rating"
                    />
                </div>
                
            </div>
            <!-- 写真 -->
            <div class="grid  grid-cols-3 sm:grid-cols-5">
              <div
              v-for="(scr,i) in review.image_url"
              :key="i">
                  <img :src="scr"
                  class="h-32 w-full sm:h-40  object-cover ">
              </div>
            </div>

            <div>{{ review.comment }}</div>
            <AppLink :href="`/place/${placeID}/${review.id}`">口コミをみる</AppLink>
          </div>
          <div v-else>
              口コミはまだありません。
          </div>
        </div>
    </div>

    </div>
    <AppLink :href="`/place/${place.id}/post-review`">タップしてレビュー</AppLink>
  </TheContainer>
</template>
<template>
  <TheContainer>
    <div class="border-2 border-coffee rounded-t-lg px-2 bg-cream">
      <div id="tab" class="grid grid-cols-3 gap-2 bg-cream rounded-t-lg">
        <div  @click="isSelect('#top')" class="w-full text-center"
          :class="{'border-b-main-500 border-b-4 font-bold':isActive === '#top'}"
        >TOP</div>
        <div  @click="isSelect('#photo-list')" class="w-full  text-center"
        :class="{'border-b-main-500 border-b-4 font-bold':isActive === '#photo-list'}"
        >写真</div>
        <div  @click="isSelect('#review-list')" class="w-full  text-center"
        :class="{'border-b-main-500 border-b-4 font-bold':isActive === '#review-list'}"
        >口コミ</div>
    </div>
   <div class="w-full bg-cream">
    <!-- 店舗情報TOP -->
        <div v-show="isActive === '#top'"
        class="p-2"
        >
            <!-- トップは店舗情報、口コミ、写真、地図を表示する -->
          <div v-if="place">
              <AppH2>{{ place.name }}</AppH2>
            <!-- todo 写真のスライダー -->
            <!-- 現在の総合評価 　押したら口コミ一覧へ遷移-->
            <!-- タップして評価 　押したらレビューへ遷移-->
            <!-- レーダー -->
            <!-- 口コミ 押したら詳細に遷移-->
              <AppH3></AppH3>
              <div>{{ place.google_place_id }}</div>
          </div>
      <!-- 口コミの詳細と、口コミを書く画面に遷移するようにする -->
        </div>
    <!-- 口コミ写真一覧 -->
        <div v-show="isActive === '#photo-list'"
        class="p-2"
        >
            <AppH2>写真一覧</AppH2>
            <!-- //gridで正方形にならぶ -->
            <div v-if="reviews.length > 0"
            class="grid grid-cols-3 gap-1">
              <div
              v-for="(scr,i) in scrs"
              :key="i"
              >
                <div>
                  <img :src="scr"
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
            <div class="flex ">
                <div class="ml-0 w-38" v-if="review.rating !== null && review.rating !== undefined">
                    <NuxtRating
                    :read-only="true"
                    :rating-count="5.0"
                    :rating-size="'24px'"
                    :rating-value="review.rating"
                    />
                </div>
                <div class= "ml-40">{{ review.rating }}</div>
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
  <script setup lang="ts">
import AppH3 from '~/components/AppH3.vue';
import { useAuthStore } from '~~/stores/auth';
import { useTagsStore } from '~~/stores/tags';
import Index from '../index.vue';


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
  const scrs = ref([])

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
              scrs.value= scrs.value.concat(response.reviews[i].image_url) 
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
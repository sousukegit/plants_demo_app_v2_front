<template>
    <div id="map" class="w-full h-80 mx-auto">google map</div>
    <TheContainer>
    <div v-if="places.length">
      <div v-for="(place,i) in places"
          :key="place.id"
        >
        <a :href="`/place/${place.id}`">
          <div class="border rounded-md bg-cream dark:bg-coffee my-2 p-4 shadow-md
          ">
            <div>{{  place.name }}</div>
            <div class="flex gap-2">
                <div class= "">{{place.avg_reviews.rating }}</div>
                <div class="ml-0 w-38" v-if="place.avg_reviews.rating !== null && place.avg_reviews.rating !== undefined">
                    <NuxtRating
                    :read-only="true"
                    :rating-count="5.0"
                    :rating-size="'24px'"
                    :rating-value="parseFloat(place.avg_reviews.rating)"
                    />
                </div>
            </div>
          </div>
        </a>
      </div>
    </div>
      <!-- <div>ようこそ{{ userEmail }}さん</div> -->
      <ButtonSecondary @click="getReviewAverageFunc()">ave</ButtonSecondary>
    </TheContainer>
  </template>
  <script setup lang="ts">
    import { useAuthStore } from '~~/stores/auth';
    import { useTagsStore } from '~~/stores/tags';
    import { useHistoryState } from 'vue-history-state'

    const tag = useTagsStore();
    const historyState = useHistoryState()
      if (historyState.action === 'back') {
        //tag情報をリセット
        tag.resetPlaceTag()
        }

    const auth = useAuthStore();
    const userName = ref<string>("unknown")
    const customHeaders = {
        'Authorization': `Bearer ${auth.auth.token}`
    };

    userName.value = auth.user.name
    const average = ref([])

    const places = ref<string[]>("")
    onMounted(() => {
      const getPlaces = async() => {
              try {
              const response = await useGet('/api/v1/places',customHeaders);
              // 成功時の処理
              places.value = response
              checkFloat(places.value)
              } catch (error) {
              console.log(error)
              }
          }
          async function getPlacesFunc(){
             await getPlaces()
          }
          getPlacesFunc()

    })

    const checkFloat = (array) =>{
      array.forEach(e => {
          //小数点第一位の数字意外である、整数なら⓪を付ける
         e.avg_reviews.rating = Number.isInteger(e.avg_reviews.rating) ? String(e.avg_reviews.rating)+".0" : String(e.avg_reviews.rating)
        });
    }

    //spaで空のオブジェクトを宣言
 const plantMap = ref<google.maps.places.PlaceResult>({})

  onMounted(()=>{
      const loader = useGoogle()
      loader.load().then((google)=>{
                  //mapインスタンス作成 初期描画用
                  const map = new google.maps.Map(document.getElementById('map') ,{
                      //初期表示設定
                      //適当な値で表示
                      zoom:5,
                      center: new google.maps.LatLng(35.65832866308476, 139.74136906081668),
                      fullscreenControl:false,
                      mapTypeControl:false,
                      streetViewControl:true,
                      streetViewControlOptions:{
                          position:google.maps.ControlPosition.LEFT_BOTTOM
                      },
                      scaleControl:true
                  })
                  // const service = new google.maps.places.PlacesService(map)

                  //受け取ったパラメータを元にmap情報の詳細を検索
                  //getDetails（A,B）
                  //Aでリクエスト送る
                  //Bで戻ってきた関数の実行
                  // service.getDetails({
                  //     placeId:queryPlaceID
                  // },
                  //     (place,status)=>{
                  //         if(status === google.maps.places.PlacesServiceStatus.OK){
                  //             spa.value = place
                  //             useHead({title: spa.value.name})
                  //             //位置情報を取得
                  //             map.setCenter(
                  //                 new google.maps.LatLng(
                  //                 place.geometry.location.lat(),
                  //                 place.geometry.location.lng()
                  //                 )
                  //             )
                  //             //マーカーオブジェクトをつける
                  //             new google.maps.Marker({
                  //                 map,
                  //                 position: new google.maps.LatLng(
                  //                     place.geometry.location.lat(),
                  //                     place.geometry.location.lng()
                  //                 )
                  //             })
                  //         }
                  //     }
                  // )

              }
          )
          .catch(()=>{})
  })


  </script>
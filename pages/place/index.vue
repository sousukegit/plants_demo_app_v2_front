<template>
    <div id="map" class="w-full h-80 mx-auto">google map</div>
    <TheContainer>
      
    <div v-if="places.length">
      <div v-for="(place,i) in places"
          :key="place.id"
        >
        <a :href="`/place/${place.id}`">
          <div class="border rounded-md bg-cream dark:bg-coffee my-2 p-4 shadow-md
          hover:bg-main-100 transition-all duration-300">
            <div>{{  place.name }}</div>
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
            <div class="flex gap-2"
            v-else>
                <div class= "ml-0 w-38">0.0</div>
                  <NuxtRating
                    :read-only="true"
                    :rating-count="5.0"
                    :rating-size="'24px'"
                    :rating-value="0.0"
                    />
            </div>

          </div>
        </a>
      </div>
    </div>
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
  userName.value = auth.user.name
  const customHeaders = {
      'Authorization': `Bearer ${auth.auth.token}`
  };
  const places = ref<string[]>("")
  //map系
  const loader = useGoogle()
  let marker = ref([]);

  const checkFloat = (array) =>{
    array.forEach(e => {
        //小数点第一位の数字意外である、整数なら⓪を付ける
      // レビューが存在する場合はしょりする
      if(e.avg_reviews !== null && e.avg_reviews !== undefined)
        e.avg_reviews.rating = Number.isInteger(e.avg_reviews.rating) ? String(e.avg_reviews.rating)+".0" : String(e.avg_reviews.rating)
      });
  }

  const makeMap = (load:any) => {
    load.then((google)=>{
                //mapインスタンス作成 初期描画用

                 // 地図の作成
                var mapLatLng = new google.maps.LatLng({lat:35.65832, lng:139.74136 }); // 緯度経度のデータ作成
                const map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
                  center: mapLatLng, // 地図の中心を指定
                  zoom: 5, // 地図のズームを指定
                  fullscreenControl:false,
                  mapTypeControl:false,
                  streetViewControl:true,
                  streetViewControlOptions:{
                    position:google.maps.ControlPosition.LEFT_BOTTOM
                  },
                  scaleControl:true
                });
                for(var i=0; i < places.value.length; i++){
                  // alert(places.value[i].longitude)
                  //let markerLatLng = new google.maps.LatLng({lat: places.value[i].latitude, lng: places.value[i].longitude,}); // 緯度経度のデータ作成
                  let markerLatLng = new google.maps.LatLng({lat: places.value[i].latitude, lng: places.value[i].longitude}); // 緯度経度のデータ作成
                  marker[i] = new google.maps.Marker({ // マーカーの追加
                    //position:{lat: parseFloat(places.value[i].latitude), lng: parseFloat(places.value[i].longitude),},
                    position: markerLatLng, // マーカーを立てる位置を指定
                    map: map // マーカーを立てる地図を指定
                  });
                  markerEvent(i,places.value[i],map);
               }

            }
        )
        .catch(()=>{})
  }

  onMounted(() => {
    const getPlaces = async() => {
            try {
            const response = await useGet('/api/v1/places',customHeaders);
            // 成功時の処理
            console.log(response)
            places.value = response
            //小数点表記の確認
            checkFloat(places.value)
            makeMap(loader.load())
            //マップに表示する
            } catch (error) {
            console.log(error)
            }
        }
        async function getPlacesFunc(){
            await getPlaces()
        }
        getPlacesFunc()
    })


const markerEvent = (i:Number,place:any,map:any) => {
  marker[i].addListener('click', function() { // マーカーをクリックしたとき
    const placeInfo = place
    //クリックしたら中心に移動して、モーダルが上がる
    alert(marker[i].position)
    alert(placeInfo.name);// 吹き出しの表示
  });
}

</script>
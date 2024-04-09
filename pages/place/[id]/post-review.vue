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
            <input type="text"/>
            <AppH3>写真</AppH3>
             <!-- 　TODO　アップロード機能 -->
            <section class="py-2" id="picShow">
              <div class="grid sm:grid-cols-5 grid-cols-3 gap-1 ">
                <div
                  v-if="srcs.length>0"
                  v-for="(src,i) in srcs"
                  :key="i"
                  >
                  <img @click="showModal(i)" :src="src" class="h-32 w-full sm:h-40 object-cover rounded-md">
                  <button @click="removeImage(i)" class="-translate-y-32 sm:-translate-y-40 ml-1 my-1  border px-1 rounded-full bg-cream right-0">×</button>
                  <Teleport v-if="doesPicShowModal" to="#picShow">
                        <div  v-if="doesPicShowModal"
                            @click="(event)=>{
                                //子要素以外をクリックしたらモーダルウィンドウを閉じる
                                if(event.target === event.currentTarget){
                                    doesPicShowModal = false;
                                }
                            }"
                            class="fixed inset-0 h-screen w-screen items-center justify-center
                            bg-coffee bg-opacity-50 py-20 dark:bg-cream dark:bg-opacity-30"
                            >
                            <button
                            class="absolute top-0 text-5xl font-bold text-coffee hover:opacity-70 dark:text-cream"
                            @click="doesPicShowModal = false"
                            >×
                            </button>
                              <div class="flex items-center"><img :src="srcs[srcNum]" class="w-full"></div>
                            </div>
                    </Teleport>
                </div>
                <div class="my-4 mx-auto">
                  <label for="image" class="text-center p-6 border border-coffee rounded-md hover:bg-accent-100 bg-accent-300">
                  <font-awesome-icon :icon="['fas', 'camera-retro']" class="text-2xl"/>
                  <!-- MEMO @change 画像がアップロードされると発火する -->
                  <input
                    type="file"
                    id="image"
                    name=""
                    accept=" .png, .jpg, .jpeg"
                    multiple="true"
                    class="hidden"
                    @change="handleImageUploaded"
                    />
                  </label>
                </div>
              </div>
            </section>
            <AppH3>コメント</AppH3>
                <inputTextarea v-model="comment"></inputTextarea>
            <ButtonPrimary :on-click="reviewUpload ">レビューを送信する</ButtonPrimary>
          </WhiteContainer>
     </TheContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
//https://www.npmjs.com/package/browser-image-compression?activeTab=readme　画像加工モジュール
import imageCompression from "browser-image-compression";


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
          } catch (error) {
          console.log(error)
          }
      }
      async function getPlacesFunc(){
          await getPlaces()
      }
      getPlacesFunc()
})

//ポストデータ
const place_id = ref<Number>(placeID);
const google_place_id = ref<String>("");
const comment = ref<String>("");
const rating = ref<Number>(0);
const price_point = ref<Number>(0);
const mania_point = ref<Number>(0);
const health_point = ref<Number>(0);
const user_id = ref<Number>(auth.user.id);

//データをセット
//小数点第一位に変換した文字にして数値に戻す
const setRating = (event: number) =>{   
  rating.value = parseFloat(event.toFixed(1))
}
const setHealthPoint = (event: number) =>{
  health_point.value = parseFloat(event.toFixed(1))
}
const setPricePoint= (event: number) =>{
  price_point.value = parseFloat(event.toFixed(1))
}
const setManiaPoint= (event: number) =>{
  mania_point.value =parseFloat(event.toFixed(1))
}

// 画像アップロード-------------------

//プレビュー用のURL配列を定義
const srcs = ref<string[]>([])
//ファイルリスト
const fileList = ref<FileList>();
//Filelistから取り出したFileを格納する送付用の配列を定義
const files = ref<File[]>([])

//エラーチェック
const errorSize = ref(false);
const errorImage = ref(false);

//モーダルウィンドウの表示状態を管理
const doesPicShowModal = ref(false);
const srcNum = ref();
const showModal = (index:number):void => {
  doesPicShowModal.value = true;
  srcNum.value = index
};

//圧縮用の関数を定義
const fileCompresseer = async (file:File,i:number) =>{
      //実行されたらfalse
      compresseedFin.value = false
      const options ={
        //グーグルの理想基準に変更　https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight?utm_source=lighthouse&utm_medium=unknown&hl=変更変更
          maxSizeMB: 1.6,
          maxWidthOrHeight: 1000
        };
        try {
          const compresseedFile = await imageCompression(file, options);
          //圧縮したファイルを格納
          files.value.push(compresseedFile)
          //成功したらしたらTrue
          compresseedFin.value = true
        } catch (error) {
          console.log(error)
        }
      }


//画像を削除する処理
const removeImage = (index:number) => {
srcs.value.splice(index,1);
files.value.splice(index,1)
}

//画像圧縮処理を監視する
const compresseedFin = ref<Boolean>(false);


// ①画像をuploadすると、画像データがstateに入る
const handleImageUploaded = (e: Event) => {
  if (e.target instanceof HTMLInputElement && e.target.files) {
    console.log(srcs.value)
    fileList.value = e.target.files
    if(fileList.value.length > 0){
      //forで取り出して処理する（Foreach使えない）
      for(let i=0; i<fileList.value.length; i++){
        const file = fileList.value[i]
        //プレビュー処理
        //srcにファイル読み取り後値が動的に入るようコールバック関数をひきすうに
        const reader =  useFileReader((result) => { 
          srcs.value[i] = result
        } )
        reader.read(file)
        //バリデート処理
        let size = file.size
        let type = file.type
        // 2MBまで
        errorSize.value = size > 200000? true: false
        errorImage.value =  type != 'image/jpg' && type != 'image/jpeg' &&  type != 'image/png' ? true: false
        //圧縮
        fileCompresseer(file,i)
      }
    }
    else{
      //何も選択しなかった場合、写真を空にする
      srcs.value = []
    }
  }
}
//送信処理----------------
//バイナリーデータを含むのでFormData.appendで一つずついれて送る
const reviewUpload = () =>{
if(!errorImage.value&&!errorImage.value&&compresseedFin.value){
  const formData = new FormData();
  for(let i=0; i < files.value.length; i++){
    formData.append("images[]",files.value[i])
  }
  formData.append("place_id",place_id.value)
  formData.append("google_place_id",google_place_id.value)
  formData.append("comment",comment.value )
  formData.append("rating",rating.value )
  formData.append("price_point",price_point.value )
  formData.append("health_point",health_point.value )
  formData.append("mania_point",mania_point.value )
  formData.append("user_id",user_id.value )

  const review = async() => {
      try {
      const response = await usePost<FormData>('/api/v1/reviews',formData,customHeaders);
      alert("口コミ登録しました。")
      navigateTo(`/place/${placeID}`)
      } catch (error) {
          // エラー時の処理
      console.error(error);
      }
    }
    async function reviewFunc(){
      await review()
    }
    reviewFunc()
}
else{
  alert("登録できませんでした。")
}
}

</script>
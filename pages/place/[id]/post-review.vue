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
                  <img @click="showModal(i)" :src="src" class="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded-md">
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
            <section>
              <button type="submit" @click="upload" >upload</button>
            </section>

           

            <AppH3>コメント</AppH3>
                <inputTextarea v-model="comment"></inputTextarea>
            <ButtonPrimary :on-click="reviewUpload ">レビューを送信する</ButtonPrimary>
          </WhiteContainer>
     </TheContainer>
</template>
<script setup lang="ts">

import { useAuthStore } from '~~/stores/auth';
// import { Compressor } from 'compressorjs';


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



// 画像アップロード-------------------

//プレビュー用のURL配列を定義
const srcs = ref<string[]>([])
//Filelistから取り出したFileを格納する送付用の配列を定義
const files = ref<File[]>([])
interface State {
inputFileImg: File,
imagePath: string,
}
const errorSize = ref(false);
const errorImage = ref(false);


const state: State = reactive({
  inputFileImg: new File(['sample'], '', {
    type: '',
  }),
  imagePath: '',
})

const fileList = ref<FileList>();
//画像を削除する処理
const removeImage = (index:number) => {
srcs.value.splice(index,1);
}
//モーダルウィンドウの表示状態を管理
const doesPicShowModal = ref(false);
const srcNum = ref();
const showModal = (index:number):void => {
  doesPicShowModal.value = true;
  srcNum.value = index
};

// ①画像をuploadすると、画像データがstateに入る
const handleImageUploaded = (e: Event) => {
  if (e.target instanceof HTMLInputElement && e.target.files) {
    //state.inputFileImg = e.target.files[0]
    fileList.value = e.target.files

    if(fileList.value.length > 0){
      //forで取り出して処理する（Foreach使えない）
      for(let i=0; i<fileList.value.length; i++){
        const file = fileList.value[i]
        files.value.push(file)
        //プレビュー処理
        //srcにファイル読み取り後値が動的に入るようコールバック関数をひきすうに
        const reader =  useFileReader((result) => { srcs.value[i] = result} )
        reader.read(file)
        //バリデート処理
        let size = file.size
        let type = file.type
        // 2MBまで
        errorSize.value = size > 200000? true: false
        errorImage.value =  type != 'image/jpg' && type != 'image/jpeg' &&  type != 'image/png' ? true: false
console.log(files.value)
console.log( fileList.value)
console.log(state.inputFileImg)
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
if(!errorImage.value&&!errorImage.value ){
  const formData = new FormData();
  //formData.append("images",state.inputFileImg)
  //formData.append("images",fileList.value)
  formData.append("images",files.value)
  formData.append("place_id",place_id.value)
  formData.append("google_place_id",google_place_id.value)
  formData.append("comment",comment.value )
  formData.append("rating",rating.value )
  formData.append("price_point",price_point.value )
  formData.append("health_point",health_point.value )
  formData.append("mania_point",mania_point.value )
  formData.append("user_id",user_id.value )
  // 中身確認用
  for (let value of formData.entries()) {
    console.log(value);
  }

  const review = async() => {
      try {
      const response = await usePost('/api/v1/reviews',formData,customHeaders);
      // 成功時の処理
      //成功したら口コミ一覧にリダイレクト

      console.log(response)
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
  alert("画像がサイズを超えています")
}
}

</script>
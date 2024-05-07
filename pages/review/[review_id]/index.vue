<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
import imageCompression from "browser-image-compression";
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
  const comment = ref<String>("");
  const price_point = ref(null);
  const mania_point = ref(null);
  const health_point = ref(null);
  const srcs = ref<string[]>([]);
  //ファイルのみのリスト
  const fileList = ref<FileList>();
  //Filelistから取り出して圧縮したFileとURLを格納する送付用の配列を定義
  const files = ref<File[]|string>([])

   onMounted(() => {
    const getReview = async() => {
            try {
            const response = await useGet(`/api/v1/reviews/${reviewID}`,customHeaders);
            //TODO 成功時の処理

            review.value = response
            place.value = response.place
            user.value = response.user
            srcs.value = Array.from(response.image_url)
            files.value = Array.from(response.image_url)
            currentData(review.value)
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

//取得したデータを格納
const currentData = (review) :void=> {
    comment.value = review.comment
    rating.value = review.rating
    health_point.value = review.health_point
    price_point.value = review.price_point
    mania_point.value = review.mania_point
    console.log(mania_point.value)
}
// const user_id = ref<Number>(auth.user.id);

//データをセット
const setRating = (event: number) =>{
  rating.value = event
}
const setHealthPoint = (event: number) =>{
  health_point.value = event
}
const setPricePoint= (event: number) =>{
  price_point.value = event
}
const setManiaPoint= (event: number) =>{
  mania_point.value = event
}



//画像アップロードーーーー



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
srcs.value.splice(index,1)
files.value.splice(index,1)
}

//画像圧縮処理を監視する
const compresseedFin = ref<Boolean>(false);

//写真を編集
// ①画像をuploadすると、画像データがstateに入る
const handleImageUploaded = (e: Event) => {
  console.log(srcs.value)
    if (e.target instanceof HTMLInputElement && e.target.files) {
    fileList.value = e.target.files
    console.log(srcs.value)
    if(fileList.value.length > 0){
      //forで取り出して処理する（Foreach使えない）
      for(let i=0; i<fileList.value.length; i++){
        //プレビュー処理
        console.log(srcs.value)
        //srcにファイル読み取り後値が動的に入るようコールバック関数をひきすうに
        const reader =  useFileReader((result) => {
          srcs.value.push(result)
        })
        reader.read(fileList.value[i])
        const file = fileList.value[i]
        //バリデート処理
        let size = file.size
        let type = file.type
        // 2MBまで
        errorSize.value = size > 200000? true: false
        errorImage.value =  type != 'image/jpg' && type != 'image/jpeg' &&  type != 'image/png' ? true: false
        //圧縮して送付用の配列に格納
        fileCompresseer(file,i)
      }
    }
    else{
      //何も選択しなかった場合、にする
      srcs.value = []
    }
  }
}

const reviewEdit = ():void => {
    const formData = new FormData();
    for(let i=0; i < files.value.length; i++){
    formData.append("images[]",files.value[i])
  }
   formData.append("comment",comment.value )
   formData.append("rating",rating.value )
   formData.append("price_point",price_point.value )
   formData.append("health_point",health_point.value )
   formData.append("mania_point",mania_point.value )

//API投げる
    const review = async() => {
            try {
            const response = await usePatch(`/api/v1/reviews/${reviewID}`,formData,customHeaders);
            // 成功時の処理
            //成功したら口コミ一覧にリダイレクト

            console.log(response)
            } 
            catch (error) {
                // エラー時の処理
            console.error(error);
            }
        }
    async function reviewFunc(){
        await review()
    }
    reviewFunc()
}

</script>
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
                    @rating-selected="setRating"
                    />
                </div>
                <div class= "ml-40">{{ review.rating }}</div>
            </div>

            <AppH3>植物部門別</AppH3>
            <div>管理状態</div>
            <div class="ml-0 w-40" v-if="review.health_point !== null && review.health_point !== undefined">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="review.health_point"
                rating-content="🌱"
                @rating-selected="setHealthPoint" />
            </div>
            <div>価格帯</div>
            <div class="ml-0 w-40" v-if="review.price_point !== null && review.price_point !== undefined">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="review.price_point"
                rating-content="🌱"
                @rating-selected="setPricePoint" />
            </div>
            <div>マニア度</div>
            <div class="ml-0 w-40" v-if="review.mania_point !== null && review.mania_point !== undefined">
                <NuxtRating
                :read-only="false"
                :rating-count="5.0"
                :rating-size="'24px'"
                :rating-value="review.mania_point"
                rating-content="🌱"
                @rating-selected="setManiaPoint" />
            </div>

            <AppH3>写真</AppH3>
            <div class="grid sm:grid-cols-5 grid-cols-3 gap-1 "
            >
                <div
                v-if="srcs !== null"
                v-for="(src,i) in srcs"
                :key="i"
                >
                    <img  :src="src" class="h-32 w-full sm:h-40  object-cover ">
                    <button @click="removeImage(i)" class="-translate-y-32 sm:-translate-y-40 ml-1 my-1  border px-1 rounded-full bg-cream right-0">×</button>
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

            <AppH3>コメント</AppH3>
            <inputTextarea v-model="comment"></inputTextarea>
            <ButtonPrimary :on-click="reviewEdit ">編集内容を保存</ButtonPrimary>
        </WhiteContainer>
    </TheContainer>


</template>

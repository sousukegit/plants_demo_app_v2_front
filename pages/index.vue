<script setup lang="ts">
import { type loginResponse } from "~~/types/loginResponse";
import { type authLoginForm } from "~~/types/authLoginForm";
import { type errorResponse } from "~~/types/errorResponse";

import { useAuthStore } from '~~/stores/auth';

const { gestLogin } = useGestLogin();


const auth = useAuthStore();
const config = useRuntimeConfig()

const gestUser:authLoginForm ={
  auth:{
    email:config.public.gestUserName,
    password:config.public.gestUserPassword
  }
}

const authSuccessful = (response:loginResponse) =>{
    console.log('authSuccessful',response)
    // ①ログイン処理
    //ユーザー情報をストアへ
    auth.setAuth(response)

    //　②記憶ルートにリダイレクト
    navigateTo('/main')

}
const authFailure = (response:errorResponse) => {
    if(response && response.status === 404){
        //トースタ出力
        console.log("ログイン失敗")
    }
    //エラー処理
    console.log('authFailure',response)
}



</script>

<template>
  <!-- バナーブロック -->
    <div>
      <div class="h-80 w-full bg- md:h-[500px] lg:h-[650px]  bg-center bg-cover bg-[url('/assets/images/top-barner.png')]
      transition: background-image 2s;">
        <div class="h-80 w-full bg- md:h-[500px] lg:h-[650px] bg-gray-400/30">
          <div class="flex flex-col gap-4 justify-center h-full">
            <div class="text-center text-cream text-2xl drop-shadow-md">
              <span class=" bg-slate-400/20 px-0">探そう、欲しい一株を実物で。</span>
            </div>
            <ButtonPrimary :on-click="() => gestLogin(gestUser,authSuccessful,authFailure)" class="mx-auto block py-4 text-2xl ">お試しで使ってみる</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
    <!-- アプリ説明 -->
    <div class="flex flex-col gap-4 sm:justify-center h-full text-center bg-sub-50 pt-10 pb-24 dark:bg-coffee dark:text-cream">
      <div class="gap-disc">
        <h2 class="text-xl font-bold ">BotaniSpotとは?</h2>
        <div class="block mx-auto">
          <img class="top-image-h" src="/assets/images/Botanispot_Icon.png">
        </div>
        <div>観葉植物の取り扱いに特化した店舗を探せるアプリです。</div>
        <div>植物は生き物だから、本当は実物を見たいけど、<br>観葉植物の店舗情報に行きつかない…！</div>
        <div>そんな植物好きのニーズから生まれたアプリです。</div>
      </div>
      <div class="gap-disc">
        <h3 class="text-xl font-bold">近くの植物ショップを見つけよう</h3>
        <div class="block mx-auto">
          <img class="top-image-h"  src="/assets/images/man-search.png">
        </div>
        <div>地図上から近くの観葉植物のお店を探すことができます。</div>
        <div>また、お店の管理状態や、価格帯、マニア度など、<br>植物目線のユーザー評価を設けております。</div>
        <div>お店に行く前に、規模感やなどを把握することができます。</div>
      </div>
      <div class="gap-disc">
        <h3 class="text-xl font-bold">お店の情報をシェアしよう</h3>
        <div class="block mx-auto">
          <img class="top-image-h"  src="/assets/images/man-like.png">
        </div>
        <div>ユーザー登録をすると、店舗のレビューを書き込むことができます。</div>
        <div>お気に入りのスポットの評価・投稿をしてみましょう</div>
      </div>
      <ButtonPrimary :on-click="() => gestLogin(gestUser,authSuccessful,authFailure)" class="mx-auto py-6 block text-2xl">お試しで使ってみる</ButtonPrimary>
    </div>
</template>
<style scoped>
 .gap-disc{
  @apply flex flex-col gap-4 justify-center py-4
 }

 .top-image-h{
  @apply h-32  object-cover
 }
</style>

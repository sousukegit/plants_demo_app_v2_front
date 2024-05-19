<script setup lang="ts">
import type { ButtonPrimary } from '#build/components';

//環境変数を取得
const config = useRuntimeConfig()
// const post = usePost()
// console.log(post)
const users = ref<string[]>("")


</script>

<template>
  <!-- バナーブロック -->
    <div> 
      <div class="h-80 w-full bg- md:h-[500px] lg:h-[650px]  bg-center bg-cover bg-[url('/assets/images/top-barner.png')]
      transition: background-image 2s;">
        <div class="h-80 w-full bg- md:h-[500px] lg:h-[650px] bg-white/20">
          <div class="flex flex-col gap-4 justify-center h-full">
            <div class="text-center text-cream text-2xl drop-shadow-md">欲しい植物を、目で見て探そう</div>
            <ButtonPrimary class="mx-auto block text-2xl">お試しで使ってみる</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
    <!-- アプリ説明 -->
    <div class="flex flex-col gap-4 justify-center h-full text-center bg-cream py-4">
      <h2>BotaniSpotとは?</h2>
      <div>観葉植物の取り扱いに特化した店舗を探せるアプリです。</div>
      <div>植物は生き物だから、本当は実物を見たいけど、観葉植物の店舗情報に行きつかない…！</div>
      <div>そんな植物好きのニーズから生まれたアプリです。</div>
    </div>
    <!-- サービス説明 -->
    <div class="flex flex-col gap-4 justify-center h-full text-center bg-sub-50 py-4">
      <h3>地図から近くの店舗を見つけよう</h3>
      <div>地図上から近くの観葉植物のお店を探すことができます。</div>
      <div>また、お店の管理状態や、価格帯、マニア度など、植物目線のユーザー評価を設けております。</div>
      <div>お店に行く前に、規模感やなどを把握することができます</div>
      <h3>お店の情報をシェアしよう</h3>
      <div>店舗のレビューを書き込むことができます。</div>
    </div>
    
    
  </template>

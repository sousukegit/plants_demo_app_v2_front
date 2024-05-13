<script setup lang="ts">
//環境変数を取得
const config = useRuntimeConfig()
// const post = usePost()
// console.log(post)
const users = ref<string[]>("")


</script>

<template>
  <TheContainer>
    <AppH1>BotaniSpot</AppH1>
    <div>BotaniSpotとは、観葉植物の取り扱いに特化した店舗の情報検索アプリです
    </div>
    <div>植物は生き物だから、本当は店舗で買いたいけど、観葉植物の店舗情報に行きつかない…！
    </div>
    <div>そんなニーズから生まれたアプリです。
    </div>
  </TheContainer>
  <!-- ここは簡単なランディングページにしたい -->
    
  </template>

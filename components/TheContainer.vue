<template>
<!-- 共通機能 -->
<div id="the_container">
    <div class="min-h-screen bg bg-main-300 py-2 px-1 text-coffee dark:bg-coffee dark:text-main-100">

<!-- コンテンツゾーン -->
        <slot/>  
<!-- 枠外下 -->
        <div class="container mx-auto my-10 text-right">
            <ButtonSecondary v-if="isNotTopPage" :on-click="goBack">
            TOPへ戻る
            </ButtonSecondary>
        </div>  
    </div>
</div>   
</template>
<script setup lang="ts">

//topページ用のURLに戻る関数を指定
const goBack = () =>{
 navigateTo("/")
}
//現在のページがトップページなら表示する
//v-if判定するための変数を用意
const isNotTopPage = useRoute().path !== "/";
</script>
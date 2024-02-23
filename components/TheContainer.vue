<template>
<!-- 共通機能 -->
<div :class="mode" id="the_container">
    <div class="min-h-screen bg bg-main-300 py-2 px-4 text-coffee dark:bg-coffee dark:text-main-100">

        <div class="flex justify-between">
            <Thebreadcrumbs/>
            <ModeSwitcher :dark-or-empty="mode" :switch-mode="switchMode"></ModeSwitcher>
            
        </div>
<!-- コンテンツゾーン -->
        <div class="container mx-auto mt-4 rounded-md bg-main-50 p-4 dark:border-2 dark:bg-coffee dark:shadow-2xl dark:shadow-sub-200">
            
            <slot/>  
        </div>
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
//ダーク切り替え用のrefを用意,usecookieで記憶管理
const mode = useCookie("mode",{maxAge:60*60*24*365,})
//mode切り替え関数
const switchMode = () =>{
  mode.value =mode.value? "" :"dark";  
}

//topページ用のURLに戻る関数を指定
const goBack = () =>{
 navigateTo("/")
}
//現在のページがトップページなら表示する
//v-if判定するための変数を用意
const isNotTopPage = useRoute().path !== "/";
console.log(isNotTopPage)



</script>
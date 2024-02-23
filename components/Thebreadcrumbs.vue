<template>
    <span class="inline-flex justify-center gap-4">
        <span v-for="(url,index) in urlList">
            <NuxtLink v-if="index < urlList.length-1"
            :href="url"
            :key="url"
            class="inline-block rounded-full h-7 w-7 bg-accent-400 shadow-lg dark:bg-accent-200 hover:opacity-20"
            ></NuxtLink>
        
        <span v-else
        key="current"
        class="inline-block rounded-full h-7 w-7 bg-accent-700 shadow-lg dark:bg-accent-50 hover:opacity-20"
        > </span>

        </span>
        
    </span>
    

</template>

<script setup lang="ts">
    const urlList = [
        "/",
        //スプレッド演算子で「/」の後ろに演算した配列を展開
        ...useRoute().path.split("/")
        //filter関数の引数に省略形のアロー関数をいれて空白を除去
        .filter(path => path !== "")
        //配列を切り出して/をつけて加工する
        .map((_path,index,array) => {
        const url = "/" + array.slice(0,index + 1).join("/");
        return url;
         }),
        ];

</script>
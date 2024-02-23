<template>    
    <div class="">
        <img :src="picSrc"
        class="w-52 h-52 object-cover rounded-full border-coffee border-2 dark:border-main-300">
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    picSrc:string;
}>()
</script>
<template>
    <div class="self-center">
        <a :href="link">
            <p class="text-main-700 text-3xl hover:opacity-40 dark:text-main-200" >
                <slot/>
            </p>
        </a>
    </div>
</template>
<script setup lang="ts">
 const props =defineProps<{
    link:string
 }>()


</script>
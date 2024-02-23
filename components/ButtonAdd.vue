<template>
    <button
    class="flex justify-center rounded-full bg-accent-200 h-20 w-20 pt-1 font-bold text-6xl shadow-md hover:opacity-20 dark:border-2 dark:border-accent-300 dark:bg-coffee dark:text-accent-200"
    v-on:click="onClick()"
    >
      <slot/>
    </button>

</template>
<script setup lang="ts">
const props = defineProps<{
    onClick:Function
}>();

</script>
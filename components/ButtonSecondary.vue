<template>
    <button
    class="rounded-md bg-sub-100 p-1 text-sm shadow-md hover:opacity-70  dark:bg-coffee dark:text-coffee"
    type="button" 
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
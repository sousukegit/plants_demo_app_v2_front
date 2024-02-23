<template>
    <button
    class="rounded-md bg-sub-100 p-1 text-sm shadow-md hover:opacity-70  dark:bg-sub-300　dark:text-coffee"
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
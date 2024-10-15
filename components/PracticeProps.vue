<script setup lang="ts">
type coffee = {
    name:string;
    color:string;
}

defineProps<coffee>();
</script>

<template>
    <div class="border bg-main-200">
        <div>子コンポーネント</div>
        <p>{{ name }}</p>
        <button>{{ color }}</button>
    </div>

</template>
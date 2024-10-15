<script setup lang="ts">
    type Props = {
        randomNum:number;
    }
    const props = defineProps<Props>();
    const randomNum = ref<number>(props.randomNum);

    type Emits = {
        (e:"emitFire",randomNum:number):void;
    }

    const emits = defineEmits<Emits>();

    const culcRandom = () => {
        randomNum.value = Math.random();
        emits("emitFire",randomNum.value );
    }


</script>

<template>
    <div>
        <div>子コンポーネント：{{ randomNum }}</div>
        <button class="border bg-amber-50" @click="culcRandom">子で乱数発生</button>
    </div>
</template>

<script setup lang="ts">

type props = {
    count:number;
}
const props = defineProps<props>();

const childCount = ref(props.count);

//emit型定義
type Emits = {
    (e:"countup",newCount:number):void;
}
//emits定義
const emits = defineEmits<Emits>();

//子コンポーネントクリック時に発火
//ここに親のメソッド名を書く
const pointUp = () => {
    childCount.value++;
    emits("countup",childCount.value);
}



</script>

<template>
    <div class="border bg-main-200">
        <div>Emits子コンポーネント</div>
        <div>childCount:{{ childCount }}</div>
        <button class="bg-slate-300" @click="pointUp"> Emit発火</button>
    </div>

</template>
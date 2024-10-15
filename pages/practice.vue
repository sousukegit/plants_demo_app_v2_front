<script setup lang="ts">
type post_and_name = {
    post:number | null;
    name:string | null;
}

const count = ref<number>(0);

const setNewCount = (newCount:number) =>{
    count.value = newCount;
}

</script>

<template>
    <h1>テスト</h1>
    <!-- <label>郵便番号</label>
    <PracticePostInput :value="postNum"></PracticePostInput>
    <label>名前</label>
    <input type="text" class="border">
    <div>
        <button class="rounded-sm border bg-slate-400">確認する</button>
    </div>

    <div>
        <PracticeProps name="こくのある深い味黒" color="black"></PracticeProps>
    </div> -->

    <div class="bg-sub-100">
        <p>emit</p>
        <div>親コンポーネントのカウント:{{ count }}</div>
        <PracticeEmit :count="count" @countup="setNewCount"></PracticeEmit>
    </div>
    
</template>
<template>

    <div>
        <textarea v-model="modelValue" 
        class="border-2 h-32 w-full rounded-lg p-2 dark:bg-coffee"></textarea>
    </div>

</template>

<script setup lang="ts">

//親からうけとるPropsを用意
const props = defineProps<{
    modelValue:string

}>()
//親で実行するイベントとイベント引数をemitsで用意
const emits = defineEmits<{
    "update:modelValue":[value:string]
}>()

//inputタグのmodelValueに入力される値を監視
const modelValue = computed({
    get:()=>  props.modelValue,
    
    set:(value)=> emits('update:modelValue',value)
})

</script>
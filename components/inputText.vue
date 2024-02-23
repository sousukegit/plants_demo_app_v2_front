<template>
    <div>
        <input type="text" 
        v-model="modelValue" 
        class="w-full rounded-lg border-2 p-2 dark:bg-coffee">
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
<template>
    <div>
        <input  :type="inputType"
        v-model="modelValue" 
        class="w-full rounded-lg border-2 p-2 dark:bg-coffee"
        :class="{'bg-danger-100 border-danger-200 dark:border-danger-400': props.modelValue.length> max}">   
        <span @click="onClick">●</span>
        <div v-if="max.length !== ''" 
        class="text-right flex justify-between"
        :class="{'text-danger-700 dark:text-danger-400': props.modelValue.length> max}"
        >
            <div v-if="props.modelValue.length> max">{{ max }}文字を超えています。</div>
            <div v-else></div>
            <div>{{props.modelValue.length}}/{{ max }}</div>       
        </div>
    </div>
    


</template>

<script setup lang="ts">

//親からうけとるPropsを用意
const props = defineProps<{
    modelValue:string
    max:string|Number
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

//クリック判定
const isClicked = ref<boolean>(true)
const inputType = ref<string>("password")
const onClick = () =>{
    isClicked.value = !isClicked.value
    inputType.value = isClicked.value? "input" : "password";
}


// const iconType = isClicked? "eye-slash" : "eye"


</script>
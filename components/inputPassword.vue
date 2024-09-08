<template>
    <div>
        <div class="flex">
            <input  :type="inputType"
            autocomplete="current-password"
            v-model="modelValue" 
            class="w-full rounded-lg border-2 p-2 dark:bg-coffee"
            :class="{'bg-danger-100 border-danger-200 dark:border-danger-400': props.modelValue.length< min&&props.modelValue.length>0}">   
            <div @click="onClick" class="my-2 ml-1">
                    <font-awesome-icon  
                    v-if="iconType==='eye'" 
                    :icon="['fas', 'eye']"/>
                    <font-awesome-icon  
                    v-else 
                    :icon="['fas', 'eye-slash']"/>
            </div>
        </div>
        <div v-if="min.length !== ''" 
        class="text-right flex justify-between"
        :class="{'text-danger-700 dark:text-danger-400': props.modelValue.length< min&&props.modelValue.length>0}"
        >
            <div v-if="props.modelValue.length< min&&props.modelValue.length>0">パスワードは{{ min }}文字以上です。</div>
            <div v-else></div>
            <div>{{props.modelValue.length}}/{{ min }}</div>       
        </div>
    </div>
    


</template>

<script setup lang="ts">

//親からうけとるPropsを用意
const props = defineProps<{
    modelValue:string
    min:string|Number
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


const isClicked = ref<boolean>(false)
const inputType = ref<string>("password")
const iconType = ref<string>("eye")
//クリック判定
const onClick = () =>{
    isClicked.value = !isClicked.value
    inputType.value = isClicked.value? "input" : "password";
    iconType.value = isClicked.value? "eye-slash" : "eye"
}
</script>
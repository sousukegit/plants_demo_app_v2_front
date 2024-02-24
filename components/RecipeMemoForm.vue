<template>
    <div class="grid gap-8">
        <label>
            レシピ名
            <InputText v-model="form.name" ></InputText>
        </label>
        <div v-for="(item,index) in form.items" class="bg-main-100 rounded-md p-4 shadow-md dark:bg-coffee dark:border-2 ">
            <div class="text-right">
                <ButtonSecondary :on-click="() => removeItem(index)">材料{{index+1}}を削除する</ButtonSecondary>
              
            </div>
            <div class="grid grid-cols-3 gap-2" >
                <label>材料{{ index +1 }}の名前
                <InputText v-model="item.name"></InputText>
                </label>
                <label>材料{{ index +1 }}の個数
                <InputNum v-model="item.amount"></InputNum>
                </label>
                <label>材料{{ index +1 }}の単位
                <InputText v-model="item.unit"></InputText>
                </label>
            </div>
        </div>
        <div class="py-2">
                <ButtonSecondary :on-click="() => addItem()">材料を追加する</ButtonSecondary>                
            </div>
        <label>
            調理方法
            <InputTextarea v-model="form.howToCook" ></InputTextarea>
        </label>
        <div class="w-full text-center">
            <ButtonPrimary :on-click="() => submit()">レシピを保存する</ButtonPrimary>
        </div>
    </div>
  


</template>
<script setup lang="ts">

//入力フォームをまとめたコンポーネント
//親-自身-子で受け渡せるコンポーネントを作成

//レシピオブジェクト
interface RecipeModel {
    //料理名
    name:string;
    //材料名
    items:{
        name:string;
        amount:""|number;
        unit:string;        
    }[],
    //調理方法
    howToCook:string,
}
//propsの作成
const props = defineProps<{
    //v-modelで渡せるようmodelvalueを設定
    modelValue:RecipeModel;
    //レシピid
    id:string;
    //レシピの書き込み時にリダイレクトする関数
    redirectOnSuccess:string;
}>()

//Emitsの作成
const emits = defineEmits<{
    "update:modelValue":[value:RecipeModel]
}>()
//get,setで親とリアクティブにやりとり
const form = computed({
    get:()=>props.modelValue,
    set:(value)=>emits('update:modelValue',value)
})

//材料を削除する処理
const removeItem = (index:number) => {
 form.value.items.splice(index,1);
}
//追加処理
const addItem =() =>{
 form.value.items.push({
    name:"",
    amount:"",
    unit:"",
 })
}


//以下DB処理-----------
//INdexdDBのDB名とテーブル名
const dbName = "recipe-memo"
const tableName = "recipe";

//レシピ保存処理
const submit = () =>{
    console.log(props.modelValue)
    
    //from.valueの中味を分割代入でばらす
    const {name, items, howToCook} = form.value;

    //いずれかのフォームが空白ならエラー
    if(!name||
    !howToCook||
    items.some(
        (item) => !item.name || !Number.isFinite(item.amount)||!item.unit
    )    
    ){
        alert("いずれかのフォームが空白です");
        return;
    }

//IndexedDBを使うには、まずIndexedDBを開く必要がある
//なので最初にそのためのリクエストをopen関数で実行する
//その際、引数には使いたい任意のDB名を渡す。
const openRequest = indexedDB.open(dbName);

//IndexedDBの軌道に成功したら、次のコールバック関数を実行
openRequest.onsuccess = (event) => {
    //起動しただけではレシピの保存をできない
    //まずコールバック関数の引数からIndexedDBのインスタンスを取得する
    //なお型推論が弱いので、より厳密な方を明示している
    const db =(event.target as IDBRequest).result;

    //トランザクションを開始
    const transaction =db.transaction(tableName,"readwrite");
  
    //テーブル名を指定して、IndexedDBからテーブルを取得する
    //（厳密にはテーブルでなくオブジェクトすとあ）
    //なおこのテーブルは親が事前に作成しておく前提
    //型推論が弱いので、厳密な方を明示
    const table =transaction.objectStore(tableName) as IDBObjectStore;
    
    //ここまででIndexedDBへの操作が可能になる
   
    //親から渡されたレシピID
    const id = props.id;

    //テーブルへのレシピ保存を試行する
    const putRequest = table.put({
        //親がidをindexedDBのキーとして使える用準備してある前提
        id,
        name,
        items: items.map((i) => ({
            //仕様上、シリアライズ可能値にすべきなのでmapする
            name: i.name,
            amount:i.amount,
            unit:i.unit,
        })),
        howToCook,
    });


    //レシピ保存に成功したら、親から渡されたリダイレクト関数を実行
    putRequest.onsuccess = (event) => {
        const menu = (event.target as IDBRequest).result.value;
        console.log(menu);
        alert("保存に成功しました");
        navigateTo(props.redirectOnSuccess);
    };
    //レジピ保存に失敗したらアラートを出す
    putRequest.onerror = () =>{
        alert("保存に失敗しました");
    };
 };


};




</script>
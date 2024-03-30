<template>  
         
          <Teleport v-if="doesShowModal" to="#hamberger">
            <div  v-if="doesShowModal"
                @click="(event)=>{
                    //子要素以外をクリックしたらモーダルウィンドウを閉じる
                    if(event.target === event.currentTarget){
                        doesShowModal = false;
                    }
                }"
                class="fixed inset-0 h-screen w-screen items-center justify-center
                bg-coffee bg-opacity-50 py-8 px-2 dark:bg-cream dark:bg-opacity-30"
                >                 
                <button
                class="absolute top-0 left-48 m-6 text-5xl font-bold text-coffee hover:opacity-70 dark:text-cream"
                @click="doesShowModal = false"
                >×
                </button>
                 
            </div>
         </Teleport>
</template>
<script setup lang="ts">
//propsでidとpropsを定義

//書き込みモーダルウィンドウの表示状態を管理
  const doesShowModal = ref(false);
  const showModal = () => {
      doesShowModal.value = true;
  };

</script>
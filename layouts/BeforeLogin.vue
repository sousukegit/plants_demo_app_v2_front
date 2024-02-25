<template>
    <header>
        <div class ="flex justify-between bg-main-300 ">
            <button>ログイン</button>
            <button>会員登録</button>
        </div>
    </header>
   <div>
        <slot/>
   </div>
</template>
<script setup lang="ts">
 const logout = () => {
    navigateTo(`/`);
  }
</script>
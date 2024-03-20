<template>
    <!-- レビュー確認ん -->

</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';
   const auth = useAuthStore();
   const customHeaders = {
       'Authorization': `Bearer ${auth.auth.token}`
   }; 


 
</script>
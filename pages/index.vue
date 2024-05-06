
<script setup lang="ts">
//環境変数を取得
const config = useRuntimeConfig()
// const post = usePost()
// console.log(post)
const users = ref<string[]>("")
async function getHello(){
  //先にユーザーを用意
  const { data } = await useFetch(config.public.apiOrigin+'/api/v1/users')
  users.value = data.value
  console.log(data)
  console.log(config.public.apiOrigin);
}

const dateFormat = (date) =>{
  const dateTimeFormat = new Intl.DateTimeFormat(
        'ja', { dateStyle: 'medium', timeStyle: 'short' }
      )
      return dateTimeFormat.format(new Date(date))
}


</script>

<template>
  <!-- ここは簡単なランディングページにしたい -->
    <AppH1>BotaniSpot</AppH1>
  </template>

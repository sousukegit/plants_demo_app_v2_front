<template>
  <div>
    <h1>dekita!!!awaitaaaa</h1>
    <div>data:{{ greet }}</div>
    <button @click="getHello()">hello</button>
  </div>
</template>

<script setup lang="ts">

const greet = ref<string>("")
greet.value="aa"
async function getHello(){
  const { data } = await useFetch('http://localhost:3000/api/v1/hello')
  // // const getHello = async () =>{    
  // //   await useFetch('/api/v1/hello');
  // // }
  greet.value = data.value
  console.log(data)
  console.log(data.value)
}

</script>

<template>
    <div>
      <button @click="getHello()">API</button>
    </div>


    <table v-if="users.length">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, i) in users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      ユーザーが取得できませんでした
    </div>

  </template>
  
  <script setup lang="ts">
  
  const greet = ref<string[]>("")
  const users = ref<string[]>("")
  async function getHello(){
    //先にユーザーを用意
    const { data } = await useFetch('http://localhost:3000/api/v1/users')
    users.value = data.value
    greet.value = data.value
    console.log(data)
    console.log(data.value)
  }
  
  </script>
  
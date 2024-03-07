<template>
<!-- ここは簡単なランディングページにしたい -->
    <TheContainer>
      <AppH1>aaa</AppH1>
      <div>
        <button
        class= "bg-main-100"
        @click="getHello()">API</button>
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
            <td>{{ dateFormat(user.created_at) }}</td>
          </tr>
        </tbody>
      </table> 

      <div v-else>
        ユーザーが取得できませんでした
      </div>    
    </TheContainer>
  

  </template>
  
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
  
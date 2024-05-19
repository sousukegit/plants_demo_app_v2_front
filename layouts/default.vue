<script setup lang="ts">

import { useAuthStore } from '~~/stores/auth';
const auth = useAuthStore();
const config = useRuntimeConfig()
const router = useRouter()
const route = ref(useRoute())



const notRedirectPaths = ["/","/login","/signup","/signupAfter"]
const loginUrlChecker = ():boolean => {
  route.value = useRoute().path
  return !notRedirectPaths.includes(route.value)
}
const loginUrlCheck = ref(loginUrlChecker())

 async function tokenDelete(){
  try {
    //先にユーザーを用意
  const  res  = await $fetch(config.public.apiOrigin+'/api/v1/auth_token',
          {
          method:"DELETE",
          credentials: 'include',
          headers:{
          'X-Requested-With': 'XMLHttpRequest',
          }
       }
      )
      .then(res=>{
          console.log(res)
      })
  }
   catch (error) {
    console.log(error)
  }
}

 const logout = () => {
    tokenDelete()
    auth.resetPinia()
    alert("ログアウトしました")
    doesShowModal.value = false;
    navigateTo(`/`)
  }
  const login = () => {
    if(!auth.loggedIn){
      doesShowModal.value = false;
      navigateTo(`/login`);
      doesShowModal.value = false;
      return
    }
    navigateTo(`/main`);
    doesShowModal.value = false;
  }
  const singup = () => {
    doesShowModal.value = false;
    navigateTo(`/signup`);
  }

  const back = () => {
    console.log(route)
  }


  //モーダルウィンドウの表示状態を管理
  const doesShowModal = ref(false);
  const showModal = () => {
      doesShowModal.value = true;
      loginUrlCheck.value = loginUrlChecker()
  };

//ダーク切り替え用のrefを用意,usecookieで記憶管理
const mode = useCookie("mode",{maxAge:60*60*24*365,})
//mode切り替え関数
const switchMode = () =>{
  mode.value =mode.value? "" :"dark";
}

defineExpose({
  loginUrlCheck
});
</script>
<template>
  <div :class="mode" >
    <header class="sticky top-0 w-full z-50">
      <div class ="flex justify-between bg-cream dark:bg-coffee dark:border-b-2 dark:border-cream dark:text-cream" id="hamberger" >
        <div  class="mx-2">
          <!-- 戻る -->
          <font-awesome-icon  @click="$router.go(-1)" :icon="['fas', 'chevron-left']" class="mt-6 text-2xl mr-2"/>
          <!-- ハンバーガー -->
          <font-awesome-icon @click="showModal" class="mt-5 text-2xl" :icon="['fas', 'bars']" /> 
          <!-- navをモーダルウィンドウで表示 -->
          <Teleport v-if="doesShowModal" to="#hamberger">
            <div  v-if="doesShowModal"
                @click="(event)=>{
                    //子要素以外をクリックしたらモーダルウィンドウを閉じる
                    if(event.target === event.currentTarget){
                        doesShowModal = false;
                    }
                }"
                class="fixed inset-0 h-screen w-screen items-center justify-center z-50
                bg-coffee bg-opacity-50 py-8 px-2 dark:bg-cream dark:bg-opacity-30"
                >
                <button
                class="absolute top-0 left-48 m-6 text-5xl font-bold text-coffee hover:opacity-70 dark:text-cream"
                @click="doesShowModal = false"
                >×
                </button>
                <div
                    class="container ml-0 w-64 overflow-auto rounded-md p-4 text-coffee bg-cream dark:bg-coffee dark:text-cream"
                >
                  <div v-if= "loginUrlCheck" >
                    <div v-if=auth.loggedIn class="mb-4">{{ auth.user.name }}さん</div>
                    <ul>
                      <li @click="logout">ログアウト</li>
                    </ul>
                    <ModeSwitcher :dark-or-empty="mode" :switch-mode="switchMode"></ModeSwitcher>
                  </div>
                  <div v-else>
                    <ul>
                      <li @click="login"> ログイン</li>
                      <li @click="singup"> ユーザー登録</li>
                    </ul>
                    <ModeSwitcher :dark-or-empty="mode" :switch-mode="switchMode"></ModeSwitcher>
                  </div>
                </div>
            </div>
         </Teleport>
        </div>
        <h1 class="mb-0">
          <NuxtLink to="/" title="Botanispot">
            <img v-if="mode=='dark'" class="logo" src="/assets/images/Botanispot _logoicon_Dark.png">
            <img v-else class="logo" src="/assets/images/Botanispot _logoicon.png">
          </NuxtLink>
        </h1>
        <div class="mx-2">
          <font-awesome-icon class="mt-6 text-2xl align-middle" :icon="['fas', 'magnifying-glass']" />
        </div>
      </div>
    </header>

    <div>
        <slot/>
    </div>
  </div>
</template>

<style scoped>
 .logo{
  @apply w-60 mt-2 sm:w-72  md:w-80 
 }
</style>
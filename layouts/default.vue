<template>
    <header>
        <div class ="flex justify-between bg-main-300" >
        <div><h1>hello plants</h1></div>
        <div>            
            <button>ログアウト</button>
            <button>ユーザー情報編集</button>   
        </div>     
    </div>
    </header>
   
    <div>
        <slot/>
    </div>
</template>
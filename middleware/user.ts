import { useAuthStore } from '~~/stores/auth';
import { useUserStore } from '~~/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig()    
    const auth = useAuthStore();
    const user = useUserStore();
    console.log('middlewara/user')
    
    async function getHello(){
        try {
            //先にユーザーを用意
        const { data } = await $fetch(config.public.apiOrigin+'/api/v1/users',{
            headers:{
                'X-Requested-With': 'XMLHttpRequest', 
                'Authorization': `Bearer ${auth.auth.token}`
                }  
             }                    
            )
            .then(data=>{
                console.log(data)  
            })
                      
        }
         catch (error) {
            
            navigateTo("/login")
        }
        
    } 
    if(!user.user.name){
        await getHello()
    }
    
   
  })
export const usePost = (endpoint, data) => {
    //環境変数を取得
    const config = useRuntimeConfig()
    const submit = async() =>{
        const response = await $fetch(
            config.public.apiOrigin+endpoint,
            {
                method:"POST",
                credentials: 'include', 
                body:JSON.stringify({
                    data
                    }),                             
                headers:{
                    'X-Requested-With': 'XMLHttpRequest',                                                      
                },                
            }
        )
    }
    return submit
  }
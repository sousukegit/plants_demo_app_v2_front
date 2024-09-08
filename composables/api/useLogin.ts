import type { authLoginForm } from '~/types/authLoginForm'
import type { loginResponse } from '~/types/loginResponse'
import type { errorResponse } from '~/types/errorResponse'

export const useLogin = () => {

    const login = async(user:authLoginForm, authSuccessful:(response:loginResponse)=>void, authFailure:(error:errorResponse)=>void ):Promise<void> => {

      try {
        const response = await usePost<authLoginForm,loginResponse>('/api/v1/auth_token',user);
          // 成功時の処理
          if("token" in response){
            authSuccessful(response)
          }
        } catch (error) {
            authFailure(error as errorResponse)
        }
    }
    return { login }
}


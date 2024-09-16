import type { userForm } from '~/types/userForm'
import type { singUpResponse } from '~/types/loginResponse'
import type { errorResponse } from '~/types/errorResponse'


export const useSignup = () => {

    const signUp = async(user:userForm,authSuccessful:(response:userForm)=>void, authFailure:(error:errorResponse)=>void) =>{
        try {
            await usePost<userForm,>('/api/v1/users',user)
        } catch (error) {

        }
    }

    return {signUp}
}
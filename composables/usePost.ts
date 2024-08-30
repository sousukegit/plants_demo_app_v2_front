type errorResponse = {
    status:number;
    message?:string;
}

export const usePost = async <T,U>(url: string, requestBody?: T, customHeaders?: Record<string, string>):Promise<U|errorResponse>=> {
    const config = useRuntimeConfig();

    const headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
        ...(customHeaders || {}),
    };

    return await $fetch(
        config.public.apiOrigin + `${url}`,
        {
            method: "POST",
            credentials: 'include',
            // body: requestBody? JSON.stringify(requestBody) : undefined,
            body: requestBody? requestBody : undefined,
            headers,
            onResponseError({response}) {
                console.log(response)
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                showError({ statusCode: response.status })
            },
        }
    );
};
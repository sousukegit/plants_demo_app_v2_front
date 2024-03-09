export const useDelete = async <T>(url: string, requestBody?: T, customHeaders?: Record<string, string>) => {
    const config = useRuntimeConfig();

    const headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
        ...(customHeaders || {}),
    };

    return await $fetch(
        config.public.apiOrigin + `${url}`,
        {
            method: "DELETE",
            credentials: 'include',
            body: requestBody? JSON.stringify(requestBody) : undefined,
            headers,
        }
    );
};
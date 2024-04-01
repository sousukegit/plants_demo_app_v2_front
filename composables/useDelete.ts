export const useDelete = async <T>(url: string, customHeaders?: Record<string, string>) => {
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
            headers,
        }
    );
};
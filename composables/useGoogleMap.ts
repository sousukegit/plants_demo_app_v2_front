import * as pkg from '@googlemaps/js-api-loader';
const { Loader } = pkg;

export const useGoogle = () => {
        const config = useRuntimeConfig()
        //const runtimeConfig = useRuntimeConfig();
        const loader = new Loader({
            apiKey:config.public.googleMapsApiKey,
            version:'weekly',
            libraries:['places','drawing','geometry']
        })

        return (loader)
}
import { Helmet, HelmetProvider } from "react-helmet-async"


const HelmetFunc = (name) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Chaldal || ${name} - Leargest Ecommerce In Bangladesh.</title>
            </Helmet>
        </HelmetProvider>
    )
}
export { HelmetFunc }
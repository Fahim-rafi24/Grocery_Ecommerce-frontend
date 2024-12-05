import { Helmet } from "react-helmet"


const HelmetFunc = (name) => {
    const title = `Chaldal || ${name} - Leargest Ecommerce In Bangladesh.`
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </>
    )
}
export { HelmetFunc }
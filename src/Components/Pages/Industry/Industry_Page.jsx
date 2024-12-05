import { Link, useParams } from "react-router-dom";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";



const Industry_Page = () => {
    const { name } = useParams(); // Name will hold the value from the URL
    // console.log(name)

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc(name)}
            {/* top route path */}
            <div className="yuji-mai-regular text-[14px] md:text-[16px]">
                <Link>
                    <span className="hover:text-amber-500">{name}</span>
                </Link>
            </div>
        </div>
    );
}
export { Industry_Page }
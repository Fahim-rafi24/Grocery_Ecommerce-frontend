import { Link, useParams } from "react-router-dom";
// icon
import { GoRelFilePath } from "react-icons/go";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";

const Catagory_Page = () => {
    const { Data } = useParams(); // Name will hold the value from the URL
    const [Industry, Catagory] = JSON.parse(Data);

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc(Catagory)}
            {/* top route path */}
            <div className="yuji-mai-regular text-[14px] md:text-[16px]">
                <Link
                to={`/Industry/${Industry}`}>
                <span className="hover:text-amber-500">{Industry}</span>
                </Link>
                <GoRelFilePath className="inline-block ml-2"/>
                <Link>
                <span className="hover:text-amber-500">{Catagory}</span>
                </Link>
            </div>
        </div>
    );
}
export { Catagory_Page }
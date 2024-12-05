import { Link, useParams } from "react-router-dom";
// icon
import { GoRelFilePath } from "react-icons/go";
import { HelmetFunc } from "../../Utils/Helmet/Helmet";

const SubCatagory_Page = () => {
    const { Data } = useParams(); // Name will hold the value from the URL
    const [Industry, Catagory, SubCatagory] = JSON.parse(Data);

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc(SubCatagory)}
            {/* top route path */}
            <div className="yuji-mai-regular text-[14px] md:text-[16px]">
                <Link
                    to={`/Industry/${Industry}`}>
                    <span className="hover:text-amber-500">{Industry}</span>
                </Link>
                <GoRelFilePath className="inline-block ml-2" />
                <Link
                to={`/Catagory/${JSON.stringify([Industry, Catagory])}`}>
                <span className="hover:text-amber-500">{Catagory}</span>
                </Link>
                <GoRelFilePath className="inline-block ml-2" />
                <Link>
                <span className="hover:text-amber-500">{SubCatagory}</span>
                </Link>
            </div>
        </div>
    );
}
export { SubCatagory_Page }
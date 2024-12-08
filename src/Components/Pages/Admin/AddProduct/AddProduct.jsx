import { Link } from "react-router-dom"
import { HelmetFunc } from "../../../Utils/Helmet/Helmet"
import sidebarData from "../../../../../public/sidebar_root.json"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../ContextStorage/UserContext"
import Swal from "sweetalert2"
import axios_with_cookies from "../../../../Axios/axios_with_cookies"

// this page is too much cause code

const AddProduct = () => {
    // context
    const { user } = useContext(UserContext);
    // all data
    const [industrys, setIndustrys] = useState([]);
    const [catagorys, setCatagorys] = useState([]);
    const [subCatagorys, setSubCatagorys] = useState([]);

    // targeted data
    const [Industry, setIndustry] = useState(null);
    const [Catagory, setCatagory] = useState(null);

    // error
    const [err, setErr] = useState("");

    useEffect(() => {
        // custome state
        const industries = [];
        const categories = [];
        const subCategories = [];

        // find industry
        sidebarData.forEach(element => {
            if (element?.Industry) {
                industries.push(element?.Industry);
            }
            const catagorys = element?.All_Catagory || [];
            // find Catagory
            catagorys.forEach(obj => {
                if (obj?.Catagory) {
                    categories.push(element);
                }
                const subCatagorys = obj.All_SubCatagory || [];
                subCatagorys.forEach(subCat => {
                    if (subCat?.SubCatagory) {
                        subCategories.push(obj);
                    }
                })
            });
        });

        // set in state
        setIndustrys(industries);
        setCatagorys(categories);
        setSubCatagorys(subCategories);
    }, [sidebarData])

    const [tags, setTags] = useState([]); // set tags value
    const handleInputChange = (e) => {
        // const value = e.target.value;
        // const make_lower = value.toLowerCase();
        setTags(e.target.value);
    };

    // handel form submit
    const handleSubmit = (e) => {
        // page reload off
        e.preventDefault();
        setErr("");

        // all tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase()).filter((tag) => tag);

        // get all value
        const form = e.target;
        const first_name = form.first_name.value.trim();
        tagsArray.push(first_name.toLowerCase());
        const last_name = form.last_name.value.trim();
        tagsArray.push(last_name.toLowerCase());
        // name
        const name = (first_name + " " + last_name);
        tagsArray.push(name.toLowerCase());
        const product_Volume = form.product_Volume.value.trim();
        tagsArray.push(product_Volume.toLowerCase());
        const img = form.img.value.trim();
        const store_Volume = form.store_Volume.value;
        const Price = form.Price.value;
        // set isPopuler as a boolian value
        let isPopular = form.isPopular.value;
        if (isPopular == "select") {
            setErr("isPopular Much Be required")
            return
        }
        if (isPopular == 'true') {
            isPopular = true
        } else {
            isPopular = false
        }
        const Industry = form.Industry.value;
        if (Industry == "select") {
            setErr("Industry Much Be required")
            return
        }
        tagsArray.push(Industry.toLowerCase());
        const Catagory = form.Catagory.value;
        if (Catagory == "select") {
            setErr("Catagory Much Be required")
            return
        }
        tagsArray.push(Catagory.toLowerCase());
        const SubCatagory = form.SubCatagory.value;
        if (SubCatagory == "select") {
            setErr("SubCatagory Much Be required")
            return
        }
        tagsArray.push(SubCatagory.toLowerCase());
        const obj = { name, Price, img, product_Volume, store_Volume, isPopular: (isPopular), Industry, Catagory, SubCatagory, hastag: tagsArray };
        (async function autocall() {
            const response = await axios_with_cookies.post("/product_add", { id: user._id, obj });
            Swal.fire("Item Added Successfully!");
            // refresh from
            form.reset();
        })();
    }
    // input Class
    const inputClass = "w-full h-10 pl-4 mt-3 font-bold bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md";

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Product Add Page")}
            <Link className="yuji-mai-regular text-[14px] md:text-[16px]">Product Add Page</Link>

            {/* error show */}
            <p className="mt-10 text-red-500">{err}</p>

            {/* Add Product from */}
            <section className="mt-10">
                <form
                    className="grid md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit}>
                    <div>
                        <label>Product First Name :</label>
                        <input
                            className={inputClass}
                            type="text"
                            name="first_name"
                            required
                        />
                    </div>
                    <div>
                        <label>Product Last Name :</label>
                        <input
                            className={inputClass}
                            type="text"
                            name="last_name"
                            required
                        />
                    </div>
                    <div>
                        <label>Image URL :</label>
                        <input
                            className={inputClass}
                            type="url"
                            name="img"
                            required
                        />
                    </div>
                    <div>
                        <label>Product Volume/weight :</label>
                        <input
                            className={inputClass}
                            type="text"
                            name="product_Volume"
                            required
                        />
                    </div>
                    <div>
                        <label>Price :</label>
                        <input
                            className={inputClass}
                            type="number"
                            name="Price"
                            required
                        />
                    </div>
                    <div>
                        <label>Store Volume :</label>
                        <input
                            className={inputClass}
                            type="number"
                            name="store_Volume"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label>Tags (comma-separated) :</label>
                        <input
                            className={inputClass}
                            type="text"
                            name="tag"
                            value={tags}
                            onChange={handleInputChange}
                            placeholder="Enter tags, separated by commas"
                            required
                        />
                    </div>
                    <div>
                        <label>Is Popular :</label>
                        <select
                            className={inputClass}
                            name="isPopular"
                            required
                        >
                            <option>select</option>
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                    </div>
                    {
                        industrys && <div>
                            <label>Industry :</label>
                            <select
                                className={inputClass}
                                name="Industry"
                                onChange={(e) => setIndustry(e.target.value)}
                                required
                            >
                                <option>select</option>
                                {
                                    industrys.map((each, inx) => <option key={inx} value={each}>{each}</option>)
                                }
                            </select>
                        </div>
                    }
                    {
                        catagorys && <div>
                            <label>catagory :</label>
                            <select
                                className={inputClass}
                                name="Catagory"
                                onChange={(e) => setCatagory(e.target.value)}
                                required
                            >
                                <option>select</option>
                                {
                                    catagorys.find((each) => each.Industry === Industry)?.All_Catagory.map((each, inx) => <option key={inx} value={each.Catagory}>{each.Catagory}</option>)
                                }
                            </select>
                        </div>
                    }
                    {
                        subCatagorys && <div>
                            <label>subCatagory :</label>
                            <select
                                className={inputClass}
                                name="SubCatagory"
                                required
                            >
                                <option>select</option>
                                {
                                    subCatagorys.find((each) => each.Catagory === Catagory)?.All_SubCatagory.map((each, inx) => <option key={inx} value={each.SubCatagory}>{each.SubCatagory}</option>)
                                }
                            </select>
                        </div>
                    }
                    <button className="md:col-span-2 btn bg-primary text-black font-bold mt-5" type="submit">Submit</button>
                </form>
            </section>
        </div>
    )
}
export { AddProduct }
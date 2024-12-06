import { Link } from "react-router-dom"
import { HelmetFunc } from "../../../Utils/Helmet/Helmet"
import sidebarData from "../../../../../public/sidebar_root.json"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const AddProduct = () => {
    const [industrys, setIndustry] = useState([]);
    const [catagorys, setCatagory] = useState([]);
    const [subCatagorys, setSubCatagory] = useState([]);

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
                    categories.push(obj.Catagory);
                }
                const subCatagorys = obj.All_SubCatagory || [];
                subCatagorys.forEach(subCat => {
                    if (subCat?.SubCatagory) {
                        subCategories.push(subCat?.SubCatagory);
                    }
                })
            });
        });

        // set in state
        setIndustry(industries);
        setCatagory(categories);
        setSubCatagory(subCategories);
    }, [sidebarData])

    const [tags, setTags] = useState([]); // set tags value
    const handleInputChange = (e) => {
        setTags(e.target.value);
    };

    // handel form submit
    const handleSubmit = (e) => {
        // page reload off
        e.preventDefault();

        // all tags
        const tagsArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);

        // get all value
        const form = e.target;
        const first_name = form.first_name.value.trim();
        tagsArray.push(first_name);
        const last_name = form.last_name.value.trim();
        tagsArray.push(last_name);
        // name
        const name = (first_name+" "+ last_name);
        tagsArray.push(name);
        const product_Volume = form.product_Volume.value.trim();
        tagsArray.push(product_Volume);
        const img = form.img.value.trim();
        const store_Volume = form.store_Volume.value;
        // set isPopuler as a boolian value
        let isPopular = form.isPopular.value;
        // if (isPopular == 'true') {
        //     isPopular = true
        // } else{
        //     isPopular = false
        // }
        const Industry = form.Industry.value;
        tagsArray.push(Industry);
        const Catagory = form.Catagory.value;
        tagsArray.push(Catagory);
        const SubCatagory = form.SubCatagory.value;
        tagsArray.push(SubCatagory);
        const obj = { name, img, product_Volume, store_Volume, isPopular : (isPopular), Industry, Catagory, SubCatagory, hastag : tagsArray };
        console.log(obj);
        Swal.fire("Item Added Successfully!");
        // refresh from
        // form.reset();
    }

    // input Class
    const inputClass = "w-full h-10 pl-4 mt-3 font-bold bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md";

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Product Add Page")}
            <Link className="yuji-mai-regular text-[14px] md:text-[16px]">Product Add Page</Link>


            {/* Add Product from */}
            <section className="mt-10 md:mt-24">
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
                        />
                    </div>
                    <div>
                        <label>Store Volume :</label>
                        <input
                            className={inputClass}
                            type="number"
                            name="store_Volume"
                        />
                    </div>
                    <div>
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
                                required
                            >
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
                                required
                            >
                                {
                                    catagorys.map((each, inx) => <option key={inx} value={each}>{each}</option>)
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
                                {
                                    subCatagorys.map((each, inx) => (<option key={inx} value={each}>{each}</option>))
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
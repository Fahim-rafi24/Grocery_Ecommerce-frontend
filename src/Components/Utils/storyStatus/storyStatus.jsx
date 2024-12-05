import { useEffect, useState } from "react";
// json
import StoryJSON from "../../../../public/story_status.json";
import { Link } from "react-router-dom";



const storyStatus = (match, speacificIndex) => {
    const [banners, setBanner] = useState([]);
    const [story, setStory] = useState(null);

    // call effect
    useEffect(() => {
        if (!match.trim()) {
            setBanner([]);
            return;
        }
        StoryJSON.forEach(element => {
            if (element?.path === match) {
                const arr = element?.coverBanner || [];
                setBanner(arr);
            }
        });
    }, [match])
    // 
    useEffect(() => {
        const obj = banners[speacificIndex];
        if (obj) {
            setStory(obj)
        }
    }, [banners])

    // class variable
    const divClass = "text-green-500 font-bold md:text-black";
    const aClass = "md:btn btn-circle";

    return (
        <div className="carousel w-full h-fit">
            {/* slider */}
            {
                !speacificIndex && banners.map((each, index) => <div
                    key={index}
                    id={`slide${index}`}
                    className="carousel-item relative w-full">
                    <img
                        src={each.photo}
                        alt={`Slide ${index + 1}`}
                        className="w-full"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        {
                            index !== 0 && index !== (banners.length - 1) && <>
                                <div className={divClass}>
                                    <a href={`#slide${index - 1}`} className={aClass}>❮</a>
                                </div>
                                <div className={divClass}>
                                    <a href={`#slide${index + 1}`} className={aClass}>❯</a>
                                </div>
                            </>
                        }
                        {
                            index === 0 ? <>
                                <div className={divClass}>
                                    <a href={`#slide${banners.length - 1}`} className={aClass}>❮</a>
                                </div>
                                <div className={divClass}>
                                    <a href={`#slide${index + 1}`} className={aClass}>❯</a>
                                </div>
                            </> : ''
                        }
                        {
                            index === (banners.length - 1) ? <>
                                <div className={divClass}>
                                    <a href={`#slide${index - 1}`} className={aClass}>❮</a>
                                </div>
                                <div className={divClass}>
                                    <a href={`#slide${0}`} className={aClass}>❯</a>
                                </div>
                            </> : ''
                        }
                    </div>
                </div>)
            }
            {/* slider End */}
            {/* story */}
            {
                story && <div className="mx-auto">
                    <Link>
                        <img src={story?.photo} alt={story?.index}/>
                    </Link>
                </div>
            }
        </div>
    )
}
export { storyStatus }
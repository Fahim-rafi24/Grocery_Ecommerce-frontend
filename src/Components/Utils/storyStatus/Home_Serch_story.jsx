import { storyStatus } from "./storyStatus"

const Home_Serch_story = () => {
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-9 gap-6 mx-auto">
            {storyStatus("randomeData", 1)}
            {storyStatus("randomeData", 2)}
            {storyStatus("randomeData", 3)}
            {storyStatus("randomeData", 4)}
            {storyStatus("randomeData", 5)}
            {storyStatus("randomeData", 6)}
            {storyStatus("randomeData", 7)}
            {storyStatus("randomeData", 8)}
            <span className="hidden md:block">
                {storyStatus("randomeData", 9)}
            </span>
        </div>
    )
}
export { Home_Serch_story }
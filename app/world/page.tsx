import fetchIndicators, { Indicator } from "../components/ServerComponents/Indicator"
import WorldChartSection from "../components/world/WorldChartSection"

const page = async () => {
    // Fetch all available indicators and filter out Migration Rate (ID 65)
    const allIndicators = await fetchIndicators() as Indicator[];
    const indicators = allIndicators.filter((ind) => ind.id !== 65);

    return (
        <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto flex flex-col items-center">
            <div className="flex flex-col w-full items-center mb-4 gap-4 mt-12 md:mt-2">
                <p className="text-2xl font-semibold">
                    World Demographic Insights and Trends
                </p >
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-4xl">
                    Unlock a deeper understanding of the world with these interactive demographic charts. Charts show you exactly how populations are growing, aging, and moving across different continents. Whether you are researching for a project or just curious about global trends, these insights offer a clear window into the human story behind the numbers.
                </p>
            </div>

            <WorldChartSection indicators={indicators} />

        </div >
    )
}

export default page
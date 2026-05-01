import fetchIndicators, { Indicator } from "../components/ServerComponents/Indicator"
import WorldChartSection from "../components/world/WorldChartSection"

const page = async () => {
    // Fetch all available indicators
    const indicators = await fetchIndicators() as Indicator[];

    return (
        <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto flex flex-col items-center">
            <p className="text-2xl font-semibold mb-6">
                World Demographic Insights and Trends
            </p >
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl">
                Select an indicator below to view global historical trends.
            </p>

            <WorldChartSection indicators={indicators} />
        </div >
    )
}

export default page
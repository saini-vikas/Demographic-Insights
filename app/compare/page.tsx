import fetchIndicatorsList from "../components/ServerComponents/Indicator"
import fetchCountries from "../components/ServerComponents/Countries"
import CompareChartSection from "../components/compare/CompareChartSection"

const page = async () => {
    const indicators = await fetchIndicatorsList()
    const countries = await fetchCountries()

    return (
        <div className="flex flex-col w-full h-full p-4 mt-12 md:mt-0 lg:p-8 overflow-y-auto">
            <div className="flex flex-col mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Compare Countries
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Compare demographic indicators between two countries side-by-side.
                </p>
            </div>

            <CompareChartSection indicators={indicators} countries={countries} />
        </div>
    )
}

export default page
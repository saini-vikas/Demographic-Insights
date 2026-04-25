import SelectCountry from "./SelectCountry"
import AppGrid from "../AppGrid/AppGrid"
import fetchCountries from "../ServerComponents/Countries"

export default async function AppContainer() {
    const countries = await fetchCountries()
    return (
        <div className='flex flex-col w-full h-full px-2 md:px-5 gap-5'>
            <div className='flex flex-row justify-end md:justify-between mt-1 pt-0.5 md:pt-0 md:mt-2'>
                <span className="text-xl font-bold hidden md:block">Demographic Insights</span>
                <div className="flex flex-row items-center gap-5">
                    <SelectCountry countries={countries} />
                </div>
            </div>
            <AppGrid />
        </div>
    )
}
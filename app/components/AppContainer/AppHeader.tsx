"use client"
import { useState } from "react"
import AppGrid from "../AppGrid/AppGrid"
import SelectCountry from "./SelectCountry"
import type { Country } from "../ServerComponents/Countries"

interface AppHeaderProps {
    countries: Country[]
}

const AppHeader = ({ countries }: AppHeaderProps) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[33])
    const handleCountryChange = (name: string) => {
        const countryObject = countries.find(c => c.name === name) || null
        setSelectedCountry(countryObject)
    }

    return (
        <div className='flex flex-col w-full h-full px-2 md:px-5 gap-5'>
            <div className='flex flex-row justify-end md:justify-between mt-1 pt-0.5 md:pt-0 md:mt-2'>
                <span className="text-xl font-bold hidden md:block">Demographic Insights</span>
                <div className="flex flex-row items-center gap-5">
                    <SelectCountry
                        countries={countries}
                        setSelectedCountry={handleCountryChange}
                        selectedCountry={selectedCountry?.name || ""} />
                </div>
            </div>
            <AppGrid selectedCountry={selectedCountry} />
        </div>
    )
}

export default AppHeader
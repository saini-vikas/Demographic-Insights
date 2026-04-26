"use client"
import { useEffect, useState } from "react"
import type { Country } from "../ServerComponents/Countries"
import fetchPopulationChange from "../ServerComponents/PopulationChange"
import type { PopulationChange } from "../ServerComponents/PopulationChange"
import fetchMigrationRate from "../ServerComponents/MigrationRate"
import { MigrationRate } from "../ServerComponents/MigrationRate"
import PopulationChangeChart from "./PopulationChangeChart"
import MigrationRateChart from "./MigrationRateChart"


type Charts = {
    PopulationChange: PopulationChange | null;
    MigrationRate: MigrationRate | null;
}


interface AppGridProps {
    selectedCountry: Country | null
}
const AppGrid = ({ selectedCountry }: AppGridProps) => {
    console.log("Selected Country in AppGrid:", selectedCountry?.id, selectedCountry?.name) // Debug log
    const [data, setData] = useState<Charts | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!selectedCountry) return

        const fetchData = async () => {
            setLoading(true)
            // You call a Server Action or an API route here
            const populationResult = await fetchPopulationChange(selectedCountry.id)
            const migrationResult = await fetchMigrationRate(selectedCountry.id)
            setData({ PopulationChange: populationResult, MigrationRate: migrationResult })
            setLoading(false)
        }

        fetchData()
    }, [selectedCountry])



    if (loading) return <div>Loading country details...</div>
    if (!data) return <div>Select a country to see details.</div>

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 w-full h-full'>
            <MigrationRateChart data={data.MigrationRate?.data} title={data.MigrationRate?.title} description={data.MigrationRate?.description} location={data.MigrationRate?.location} locationId={data.MigrationRate?.locationId} />
            <div className="flex border bg-white rounded-lg p-2 max-md:col-span-1"></div>
            <div className="flex border bg-white rounded-lg p-2 max-md:col-span-2"></div>
            <PopulationChangeChart data={data.PopulationChange?.data} title={data.PopulationChange?.title} description={data.PopulationChange?.description} location={data.PopulationChange?.location} locationId={data.PopulationChange?.locationId} />
            <div className="flex border bg-white rounded-lg p-2 row-span-2"></div>
            <div className="flex border bg-white rounded-lg p-2 col-span-2"></div>
        </div>
    )
}

export default AppGrid

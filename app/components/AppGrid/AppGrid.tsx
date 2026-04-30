"use client"
import { useEffect, useState } from "react"
import type { Country } from "../ServerComponents/Countries"
import fetchPopulationChange from "../ServerComponents/PopulationChange"
import type { PopulationChange } from "../ServerComponents/PopulationChange"
import fetchMigrationRate from "../ServerComponents/MigrationRate"
import { MigrationRate } from "../ServerComponents/MigrationRate"
import fetchPopulationDensity from "../ServerComponents/PopulationDensity"
import type { PopulationDensity } from "../ServerComponents/PopulationDensity"
import fetchTotalPopulation from "../ServerComponents/TotalPopulation"
import type { TotalPopulation } from "../ServerComponents/TotalPopulation"
import fetchTotalDeath from "../ServerComponents/TotalDeath"
import type { TotalDeath } from "../ServerComponents/TotalDeath"
import fetchSexRatio from "../ServerComponents/SexRatio"
import type { SexRatio } from "../ServerComponents/SexRatio"
import fetchMedianAge from "../ServerComponents/MedianAge"
import type { MedianAge } from "../ServerComponents/MedianAge"
import fetchPopAgeSexPct from "../ServerComponents/PopAgeSexPct"
import type { PopAgeSexPct } from "../ServerComponents/PopAgeSexPct"
import fetchSexRatioTotalPop from "../ServerComponents/SexRatioTotalPop"
import type { SexRatioTotalPop } from "../ServerComponents/SexRatioTotalPop"
import fetchLifeExpectancy from "../ServerComponents/LifeExpectancy"
import type { LifeExpectancy } from "../ServerComponents/LifeExpectancy"
import PopulationChangeChart from "./PopulationChangeChart"
import MigrationRateChart from "./MigrationRateChart"
import LifeExpectancyChart from "./LifeExpectancyChart"
import PopulationDensityChart from "./PopulationDensityChart"
import PopAgeSexPctChart from "./PopAgeSexPctChart"
import KeyMetricsCards from "./KeyMetricsCards"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type Charts = {
    PopulationChange: PopulationChange | null;
    MigrationRate: MigrationRate | null;
    PopulationDensity: PopulationDensity | null;
    TotalPopulation: TotalPopulation | null;
    TotalDeath: TotalDeath | null;
    SexRatio: SexRatio | null;
    MedianAge: MedianAge | null;
    PopAgeSexPct: PopAgeSexPct | null;
    SexRatioTotalPop: SexRatioTotalPop | null;
    LifeExpectancy: LifeExpectancy | null;
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
            // Fetch all available metrics in parallel for the selected country.
            const [
                populationResult,
                migrationResult,
                populationDensityResult,
                totalPopulationResult,
                totalDeathResult,
                sexRatioResult,
                medianAgeResult,
                popAgeSexPctResult,
                sexRatioTotalPopResult,
                lifeExpectancyResult,
            ] = await Promise.all([
                fetchPopulationChange(selectedCountry.id),
                fetchMigrationRate(selectedCountry.id),
                fetchPopulationDensity(selectedCountry.id),
                fetchTotalPopulation(selectedCountry.id),
                fetchTotalDeath(selectedCountry.id),
                fetchSexRatio(selectedCountry.id),
                fetchMedianAge(selectedCountry.id),
                fetchPopAgeSexPct(selectedCountry.id),
                fetchSexRatioTotalPop(selectedCountry.id),
                fetchLifeExpectancy(selectedCountry.id),
            ])

            setData({
                PopulationChange: populationResult,
                MigrationRate: migrationResult,
                PopulationDensity: populationDensityResult,
                TotalPopulation: totalPopulationResult,
                TotalDeath: totalDeathResult,
                SexRatio: sexRatioResult,
                MedianAge: medianAgeResult,
                PopAgeSexPct: popAgeSexPctResult,
                SexRatioTotalPop: sexRatioTotalPopResult,
                LifeExpectancy: lifeExpectancyResult,
            })
            setLoading(false)
        }

        fetchData()
    }, [selectedCountry])



    if (loading) return <SpinnerButton />
    if (!data) return <div>Select a country to see details.</div>

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-full py-3 h-auto'>
            <MigrationRateChart data={data.MigrationRate?.data} title={data.MigrationRate?.title} description={data.MigrationRate?.description} location={data.MigrationRate?.location} locationId={data.MigrationRate?.locationId} />
            <LifeExpectancyChart data={data.LifeExpectancy?.data} title={data.LifeExpectancy?.title} description={data.LifeExpectancy?.description} location={data.LifeExpectancy?.location} locationId={data.LifeExpectancy?.locationId} />
            <PopulationDensityChart data={data.PopulationDensity?.data} title={data.PopulationDensity?.title} description={data.PopulationDensity?.description} location={data.PopulationDensity?.location} locationId={data.PopulationDensity?.locationId} />
            <PopulationChangeChart data={data.PopulationChange?.data} title={data.PopulationChange?.title} description={data.PopulationChange?.description} location={data.PopulationChange?.location} locationId={data.PopulationChange?.locationId} />
            <PopAgeSexPctChart data={data.PopAgeSexPct?.data} title={data.PopAgeSexPct?.title} description={data.PopAgeSexPct?.description} location={data.PopAgeSexPct?.location} locationId={data.PopAgeSexPct?.locationId} />
            <KeyMetricsCards
                totalPopulation={data.TotalPopulation}
                totalDeath={data.TotalDeath}
                medianAge={data.MedianAge}
                sexRatio={data.SexRatio}
            />
        </div>
    )
}

export default AppGrid


export function SpinnerButton() {
    return (
        <div className="flex w-full h-full flex-col justify-center items-center gap-4">
            <Button variant="secondary" disabled size="lg">
                <Spinner data-icon="inline-start" className="size-8" />
                Processing
            </Button>
        </div>
    )
}

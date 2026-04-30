"use client"
import { TrendingUp, TrendingDown } from "lucide-react"

import type { MedianAge } from "../ServerComponents/MedianAge"
import type { SexRatio } from "../ServerComponents/SexRatio"
import type { TotalDeath } from "../ServerComponents/TotalDeath"
import type { TotalPopulation } from "../ServerComponents/TotalPopulation"

type MetricPoint = {
    timeLabel: string;
    value: number;
}

type MetricCardProps = {
    label: string;
    value: string;
    changePct: number | null;
}

type KeyMetricsCardsProps = {
    totalPopulation: TotalPopulation | null;
    totalDeath: TotalDeath | null;
    medianAge: MedianAge | null;
    sexRatio: SexRatio | null;
}

const extractYear = (timeLabel: string) => {
    const match = timeLabel.match(/\d{4}/)
    return match ? Number(match[0]) : -1
}

const latestTwoPoints = (series?: MetricPoint[]) => {
    if (!series || series.length === 0) return { latest: null, previous: null }

    const sorted = [...series].sort((a, b) => extractYear(a.timeLabel) - extractYear(b.timeLabel))
    const latest = sorted[sorted.length - 1] ?? null
    const previous = sorted[sorted.length - 2] ?? null

    return { latest, previous }
}

const computeYoYChange = (latestValue?: number, previousValue?: number) => {
    if (latestValue === undefined || previousValue === undefined || previousValue === 0) return null
    return ((latestValue - previousValue) / previousValue) * 100
}

const formatMainValue = (label: string, value?: number) => {
    if (value === undefined) return "N/A"
    if (label === "Total Population" || label === "Total Death") return value.toLocaleString()
    return value.toFixed(2)
}

const formatChange = (changePct: number | null) => {
    if (changePct === null) return "N/A"
    const sign = changePct >= 0 ? "+" : ""
    return `${sign}${changePct.toFixed(2)}%`
}

const changeColorClass = (changePct: number | null) => {
    if (changePct === null) return "text-muted-foreground"
    return changePct >= 0 ? "text-emerald-600" : "text-rose-600"
}

const MetricCard = ({ label, value, changePct }: MetricCardProps) => {
    return (
        <div className="flex-1 rounded-lg bg-white h-full dark:bg-gray-800 py-5 px-4 flex flex-col justify-center gap-2">
            <p className="text-sm lg:text-xs dark:text-gray-300 text-muted-foreground">{label}</p>
            <p className="text-2xl  dark:text-white font-semibold text-foreground leading-tight">{value}</p>
            <div className={`flex items-center text-xs font-medium ${changeColorClass(changePct)}`}>
                <span>YoY: {formatChange(changePct)}</span>
                &nbsp;
                {changePct !== null && (
                    changePct >= 0 ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />
                )}
            </div>
        </div>
    )
}

const KeyMetricsCards = ({ totalPopulation, totalDeath, medianAge, sexRatio }: KeyMetricsCardsProps) => {
    const totalPopulationPoints = latestTwoPoints(totalPopulation?.data)
    const totalDeathPoints = latestTwoPoints(totalDeath?.data)
    const medianAgePoints = latestTwoPoints(medianAge?.data)
    const sexRatioPoints = latestTwoPoints(sexRatio?.data)

    const totalPopulationChange = computeYoYChange(totalPopulationPoints.latest?.value, totalPopulationPoints.previous?.value)
    const totalDeathChange = computeYoYChange(totalDeathPoints.latest?.value, totalDeathPoints.previous?.value)
    const medianAgeChange = computeYoYChange(medianAgePoints.latest?.value, medianAgePoints.previous?.value)
    const sexRatioChange = computeYoYChange(sexRatioPoints.latest?.value, sexRatioPoints.previous?.value)

    return (
        <div className="col-span-3 md:col-span-2 grid grid-cols-2 2xl:grid-cols-4 gap-4 items-center h-60 xl:h-auto">
            <MetricCard
                label="Total Population"
                value={formatMainValue("Total Population", totalPopulationPoints.latest?.value)}
                changePct={totalPopulationChange}
            />
            <MetricCard
                label="Total Death"
                value={formatMainValue("Total Death", totalDeathPoints.latest?.value)}
                changePct={totalDeathChange}
            />
            <MetricCard
                label="Median Age"
                value={formatMainValue("Median Age", medianAgePoints.latest?.value)}
                changePct={medianAgeChange}
            />
            <MetricCard
                label="Sex Ratio"
                value={formatMainValue("Sex Ratio", sexRatioPoints.latest?.value)}
                changePct={sexRatioChange}
            />
        </div>
    )
}

export default KeyMetricsCards

"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label, Legend } from "recharts"
import type { PopAgeSexPct } from "../ServerComponents/PopAgeSexPct"
import { InfoTitle } from "./AppHoverCard"
import { Bold } from "lucide-react"

type PyramidDatum = {
    ageGroup: string;
    male: number;
    female: number;
}

type LegendItem = {
    value?: string;
}

const extractYear = (timeLabel?: string) => {
    if (!timeLabel) return -1
    const match = timeLabel.match(/\d{4}/)
    return match ? Number(match[0]) : -1
}

const formatPercent = (value: unknown) => `${Math.abs(Number(value)).toFixed(1)}%`

const itemSorter = (item: LegendItem) => (item.value === "Male" ? 0 : 1)

const PopAgeSexPctChart = ({ data, description, topicName }: PopAgeSexPct) => {
    const pyramidData = useMemo<PyramidDatum[]>(() => {
        if (!data || data.length === 0) return []

        const latestYear = Math.max(...data.map((d) => extractYear(d.timeLabel)))
        const latest = data.filter((d) => extractYear(d.timeLabel) === latestYear)
        const source = latest.length > 0 ? latest : data

        const grouped = new Map<string, PyramidDatum>()

        source.forEach((entry) => {
            const ageGroup = entry.ageLabel || entry.timeLabel
            const normalizedSex = (entry.sexLabel || "").toLowerCase()
            const sexId = entry.sexId

            if (!grouped.has(ageGroup)) {
                grouped.set(ageGroup, { ageGroup, male: 0, female: 0 })
            }

            const row = grouped.get(ageGroup)!

            if (normalizedSex.includes("male") || sexId === 1) {
                row.male = -Math.abs(entry.value)
            } else if (normalizedSex.includes("female") || sexId === 2) {
                row.female = Math.abs(entry.value)
            }
        })

        // Fallback: if labels/ids are missing, assume two values per age group are male/female.
        if ([...grouped.values()].every((row) => row.male === 0 && row.female === 0)) {
            const byAge = new Map<string, number[]>()
            source.forEach((entry) => {
                const ageGroup = entry.ageLabel || entry.timeLabel
                if (!byAge.has(ageGroup)) byAge.set(ageGroup, [])
                byAge.get(ageGroup)!.push(Math.abs(entry.value))
            })

            byAge.forEach((values, ageGroup) => {
                if (!grouped.has(ageGroup)) grouped.set(ageGroup, { ageGroup, male: 0, female: 0 })
                const row = grouped.get(ageGroup)!
                row.male = values[0] ? -values[0] : 0
                row.female = values[1] ? values[1] : 0
            })
        }

        return [...grouped.values()]
            .filter((row) => row.male !== 0 || row.female !== 0)
            .sort((a, b) => {
                const aStart = Number(a.ageGroup.replace("+", "").split("-")[0])
                const bStart = Number(b.ageGroup.replace("+", "").split("-")[0])
                if (Number.isNaN(aStart) || Number.isNaN(bStart)) return a.ageGroup.localeCompare(b.ageGroup)
                return aStart - bStart
            })
    }, [data])

    return (
        <div className="flex flex-col items-center bg-white p-2 dark:bg-gray-800 rounded-lg col-span-3 md:col-span-2 xl:col-span-1 xl:row-span-2 lg:order-3 2xl:order-none h-80 2xl:h-auto">
            <InfoTitle title="Population by Age group and Sex" description={description} topicName={topicName as string} />
            <div className="flex-1 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart
                        data={pyramidData}
                        layout="vertical"
                        stackOffset="sign"
                        barCategoryGap={1}
                        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis
                            type="number"
                            tick={{ fontSize: 11 }}
                            stroke="var(--color-text-3)"
                            tickFormatter={formatPercent}
                        >
                            <Label value="% Population" offset={-2} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis
                            type="category"
                            dataKey="ageGroup"
                            tick={{ fontSize: 11 }}
                            width={65}
                            stroke="var(--color-text-3)"
                        >
                            <Label
                                value="Age Group"
                                angle={-90}
                                position="insideLeft"
                                offset={0}
                                className="font-semibold text-xs"
                                fill="var(--color-text-3)"
                                style={{ textAnchor: "middle" }}
                            />
                        </YAxis>
                        <Tooltip
                            cursor={{
                                fill: 'var(--color-surface-muted)',
                                opacity: 0.4
                            }}
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => formatPercent(value)}
                        />
                        <Legend itemSorter={itemSorter} verticalAlign="top" align="right" />
                        <Bar
                            stackId="age"
                            dataKey="female"
                            name="Female"
                            fill="var(--color-chart-5)"
                            radius={[0, 5, 5, 0]}
                            barSize={50}
                            label={{ position: "left", formatter: formatPercent, fill: "var(--color-text-7)", fontSize: 10, fontWeight: 600 }}
                        />
                        <Bar
                            stackId="age"
                            dataKey="male"
                            name="Male"
                            fill="var(--color-chart-7)"
                            radius={[0, 5, 5, 0]}
                            barSize={70}
                            label={{ position: "left", formatter: formatPercent, fill: "var(--color-text-7)", fontSize: 10, fontWeight: 600 }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PopAgeSexPctChart

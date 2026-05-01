"use client"

import { useMemo } from "react"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { WorldIndicatorDataResult } from "../ServerComponents/WorldIndicatorData"
import { InfoTitle } from "../AppGrid/AppHoverCard"

interface GenericChartProps extends WorldIndicatorDataResult {
    chartType: "area" | "bar" | "line" | "pyramid"
}

type PyramidDatum = {
    ageGroup: string;
    male: number;
    female: number;
}

const extractYear = (timeLabel?: string) => {
    if (!timeLabel) return -1
    const match = timeLabel.match(/\d{4}/)
    return match ? Number(match[0]) : -1
}

const formatPercent = (value: unknown) => `${Math.abs(Number(value)).toFixed(1)}%`
const itemSorter = (item: any) => (item.value === "Male" ? 0 : 1)

const GenericChart = ({ data, title, description, topicName, chartType }: GenericChartProps) => {
    // If no data or empty data array
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-2 rounded-lg w-full h-80">
                <p className="text-gray-500">No data available to display</p>
            </div>
        )
    }

    const pyramidData = useMemo<PyramidDatum[]>(() => {
        if (!data || data.length === 0 || chartType !== "pyramid") return []

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
    }, [data, chartType])

    const formatValue = (value: unknown) => {
        const numValue = Number(value);
        if (isNaN(numValue)) return String(value);

        const lowerTitle = (title || "").toLowerCase();
        const isTargetIndicator = lowerTitle.includes("total population") ||
            lowerTitle.includes("total deaths") ||
            lowerTitle.includes("population change");

        if (isTargetIndicator) {
            // UN API provides these in thousands. 1 million = 1000 thousands
            if (lowerTitle.includes("thousands")) {
                return `${(numValue / 1000).toFixed(0)}M`;
            } else {
                return `${(numValue / 1000000).toFixed(0)}M`;
            }
        }

        return numValue.toFixed(2);
    };

    const renderChart = () => {
        switch (chartType) {
            case "pyramid":
                return (
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
                );
            case "bar":
                return (
                    <BarChart
                        data={data}
                        margin={{ top: 0, right: 15, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tickFormatter={formatValue} tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={-5} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [formatValue(value), title]}
                        />
                        <Bar
                            dataKey="value"
                            fill="var(--color-chart-5)"
                        />
                    </BarChart>
                );
            case "line":
                return (
                    <LineChart
                        data={data}
                        margin={{ top: 0, right: 15, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tickFormatter={formatValue} tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={-5} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [formatValue(value), title]}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="var(--color-chart-5)"
                            strokeWidth={3}
                            dot={{ fill: "var(--color-surface-base)", r: 4 }}
                            activeDot={{ r: 5, stroke: "var(--color-surface-base)" }}
                        />
                    </LineChart>
                );
            case "area":
            default:
                return (
                    <AreaChart
                        data={data}
                        margin={{ top: 0, right: 15, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tickFormatter={formatValue} tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={-5} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [formatValue(value), title]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--color-chart-5)"
                            strokeWidth={3}
                            fill="var(--color-chart-5)"
                            fillOpacity={0.35}
                            dot={{ fill: "var(--color-surface-base)", r: 4 }}
                            activeDot={{ r: 5, stroke: "var(--color-surface-base)" }}
                        />
                    </AreaChart>
                );
        }
    };

    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg w-full h-[350px] lg:h-[400px] min-h-[300px] min-w-[300px] shadow-sm border border-gray-100 dark:border-gray-700">
            <InfoTitle title={title || "Chart"} description={description} topicName={topicName || ""} />
            <div className="flex-1 w-full h-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default GenericChart

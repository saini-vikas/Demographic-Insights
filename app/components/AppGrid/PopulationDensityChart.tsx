"use client"

import { AreaChart, Area, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import type { PopulationDensity } from "../ServerComponents/PopulationDensity"
import { InfoTitle } from "./AppHoverCard"

const PopulationDensityChart = ({ data, title, description }: PopulationDensity) => {
    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded-lg lg:order-2 lg:h-80 2xl:order-none col-span-3 md:col-span-2 xl:col-span-1 h-60 2xl:h-60">
            <InfoTitle title={title as string} description={description} />
            <div className="flex-1 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 0,
                            right: 15,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="People / km²" angle={-90} offset={15} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [Number(value).toFixed(2), "Density"]}
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
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PopulationDensityChart

"use client"

import { LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import type { LifeExpectancy } from "../ServerComponents/LifeExpectancy"
import { InfoTitle } from "./AppHoverCard"

const LifeExpectancyChart = ({ data, description }: LifeExpectancy) => {
    return (
        <div className="flex flex-col items-center bg-white p-2 dark:bg-gray-800 rounded-lg col-span-3 md:col-span-2 xl:col-span-1 h-60">
            <InfoTitle title="Life Expectancy" description={description} />
            <ResponsiveContainer width="100%" height="100%" className="ml-2" minWidth={0}>
                <LineChart
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
                        <Label value="Years" angle={-90} offset={15} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                    </YAxis>
                    <Tooltip
                        cursor={{ stroke: "var(--color-border-2)" }}
                        contentStyle={{
                            backgroundColor: "var(--color-surface-raised)",
                            borderColor: "var(--color-border-2)",
                            borderRadius: "15px",
                        }}
                        formatter={(value: unknown) => [`${Number(value).toFixed(2)} years`, "Life Expectancy"]}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={3}
                        stroke="var(--color-chart-2)"
                        dot={{ fill: "var(--color-surface-base)", r: 4 }}
                        activeDot={{ r: 5, stroke: "var(--color-surface-base)" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LifeExpectancyChart

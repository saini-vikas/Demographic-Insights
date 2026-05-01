"use client"

import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { WorldIndicatorDataResult } from "../ServerComponents/WorldIndicatorData"
import { InfoTitle } from "../AppGrid/AppHoverCard"

interface GenericChartProps extends WorldIndicatorDataResult {
    chartType: "area" | "bar" | "line"
}

const GenericChart = ({ data, title, description, topicName, chartType }: GenericChartProps) => {
    // If no data or empty data array
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-2 rounded-lg w-full h-80">
                <p className="text-gray-500">No data available to display</p>
            </div>
        )
    }

    const renderChart = () => {
        switch (chartType) {
            case "bar":
                return (
                    <BarChart
                        data={data}
                        margin={{ top: 0, right: 15, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={15} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [Number(value).toFixed(2), title]}
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
                        margin={{ top: 0, right: 15, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={15} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [Number(value).toFixed(2), title]}
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
                        margin={{ top: 0, right: 15, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                        <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Year" offset={-5} className="font-semibold text-xs" position="insideBottom" fill="var(--color-text-3)" />
                        </XAxis>
                        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-3)">
                            <Label value="Value" angle={-90} offset={15} position="insideLeft" className="font-semibold text-xs" fill="var(--color-text-3)" style={{ textAnchor: "middle" }} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-raised)",
                                borderColor: "var(--color-border-2)",
                                borderRadius: "15px",
                            }}
                            formatter={(value: unknown) => [Number(value).toFixed(2), title]}
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
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg w-full h-[400px] shadow-sm border border-gray-100 dark:border-gray-700">
            <InfoTitle title={title || "Chart"} description={description} topicName={topicName || ""} />
            <div className="flex-1 w-full h-full mt-6">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default GenericChart

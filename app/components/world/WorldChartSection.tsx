"use client"

import { useState, useEffect } from "react"
import { Indicator } from "../ServerComponents/Indicator"
import fetchWorldIndicatorData, { WorldIndicatorDataResult } from "../ServerComponents/WorldIndicatorData"
import GenericChart from "./GenericChart"
import AppSpinner from "../AppGrid/AppSpinner"
import { AreaChart, BarChart, LineChart, Triangle } from "lucide-react"

export default function WorldChartSection({ indicators }: { indicators: Indicator[] }) {
    const currentYear = new Date().getFullYear();
    const [selectedIndicator, setSelectedIndicator] = useState<number>(indicators[0]?.id || 49); // default to first or 49 (total population)
    const [chartType, setChartType] = useState<"area" | "bar" | "line" | "pyramid">("area");
    const [startYear, setStartYear] = useState<number>(currentYear - 15);
    const [endYear, setEndYear] = useState<number>(currentYear);
    const [chartData, setChartData] = useState<WorldIndicatorDataResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (!selectedIndicator) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchWorldIndicatorData(selectedIndicator, startYear, endYear);
                setChartData(data);
            } catch (error) {
                console.error("Failed to load indicator data", error);
                setChartData(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedIndicator, startYear, endYear]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl h-fit mt-6">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col flex-grow w-full md:w-auto min-w-[200px]">
                    <label htmlFor="indicator-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Select Indicator
                    </label>
                    <select
                        id="indicator-select"
                        value={selectedIndicator}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setSelectedIndicator(val);
                            if (val === 71) setChartType("pyramid");
                            else if (chartType === "pyramid") setChartType("area");
                        }}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        {indicators.map((ind) => (
                            <option key={ind.id} value={ind.id}>
                                {ind.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col flex-grow md:flex-grow-0 w-full md:w-auto">
                    <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Chart Type
                    </label>
                    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-md p-1 gap-1 h-10">
                        <button
                            title="Area Chart"
                            onClick={() => setChartType("area")}
                            disabled={selectedIndicator === 71}
                            className={`flex items-center justify-center flex-1 px-3 py-1 text-sm rounded-md transition-colors ${chartType === "area" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"} ${selectedIndicator === 71 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <AreaChart className="w-4 h-4" />
                        </button>
                        <button
                            title="Bar Chart"
                            onClick={() => setChartType("bar")}
                            disabled={selectedIndicator === 71}
                            className={`flex items-center justify-center flex-1 px-3 py-1 text-sm rounded-md transition-colors ${chartType === "bar" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"} ${selectedIndicator === 71 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <BarChart className="w-4 h-4" />
                        </button>
                        <button
                            title="Line Chart"
                            onClick={() => setChartType("line")}
                            disabled={selectedIndicator === 71}
                            className={`flex items-center justify-center flex-1 px-3 py-1 text-sm rounded-md transition-colors ${chartType === "line" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"} ${selectedIndicator === 71 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <LineChart className="w-4 h-4" />
                        </button>
                        <button
                            title="Pyramid Chart"
                            onClick={() => setChartType("pyramid")}
                            disabled={selectedIndicator !== 71}
                            className={`flex items-center justify-center flex-1 px-3 py-1 text-sm rounded-md transition-colors ${chartType === "pyramid" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"} ${selectedIndicator !== 71 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <Triangle className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col flex-grow md:flex-grow-0 w-full sm:w-[calc(50%-0.5rem)] md:w-32">
                    <label htmlFor="start-year-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Start Year
                    </label>
                    <select
                        id="start-year-select"
                        value={startYear}
                        onChange={(e) => setStartYear(Number(e.target.value))}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        {years.filter(y => y <= endYear).map((y) => (
                            <option key={`start-${y}`} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col flex-grow md:flex-grow-0 w-full sm:w-[calc(50%-0.5rem)] md:w-32">
                    <label htmlFor="end-year-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        End Year
                    </label>
                    <select
                        id="end-year-select"
                        value={endYear}
                        onChange={(e) => setEndYear(Number(e.target.value))}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        {years.filter(y => y >= startYear).map((y) => (
                            <option key={`end-${y}`} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full relative min-h-[500px] min-w-[80%]">
                {loading && <AppSpinner />}
                {chartData && (
                    <GenericChart
                        data={chartData.data}
                        title={chartData.title}
                        description={chartData.description}
                        topicName={chartData.topicName}
                        location={chartData.location}
                        locationId={chartData.locationId}
                        chartType={chartType}
                    />
                )}
            </div>
        </div>
    )
}

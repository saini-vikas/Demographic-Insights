"use client"

import { useState, useEffect } from "react"
import { Indicator } from "../ServerComponents/Indicator"
import fetchWorldIndicatorData, { WorldIndicatorDataResult } from "../ServerComponents/WorldIndicatorData"
import GenericChart from "./GenericChart"

export default function WorldChartSection({ indicators }: { indicators: Indicator[] }) {
    const currentYear = new Date().getFullYear();
    const [selectedIndicator, setSelectedIndicator] = useState<number>(indicators[0]?.id || 49); // default to first or 49 (total population)
    const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");
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
        <div className="flex flex-col gap-6 w-full max-w-6xl mt-6">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col flex-grow w-full md:w-auto min-w-[200px]">
                    <label htmlFor="indicator-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Select Indicator
                    </label>
                    <select
                        id="indicator-select"
                        value={selectedIndicator}
                        onChange={(e) => setSelectedIndicator(Number(e.target.value))}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        {indicators.map((ind) => (
                            <option key={ind.id} value={ind.id}>
                                {ind.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col flex-grow md:flex-grow-0 w-full sm:w-[calc(50%-0.5rem)] md:w-48">
                    <label htmlFor="chart-type-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Chart Type
                    </label>
                    <select
                        id="chart-type-select"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as "area" | "bar" | "line")}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        <option value="area">Area Chart</option>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                    </select>
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

            <div className="w-full relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-lg">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
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

"use client"

import { useState, useEffect } from "react"
import { Indicator } from "../ServerComponents/Indicator"
import { Country } from "../ServerComponents/Countries"
import fetchCountryIndicatorData, { CountryIndicatorDataResult } from "../ServerComponents/CountryIndicatorData"
import CompareChart from "./CompareChart"
import AppSpinner from "../AppGrid/AppSpinner"
import { AreaChart, BarChart, LineChart, Triangle } from "lucide-react"
import SelectCountry from "../AppContainer/SelectCountry"

interface CompareChartSectionProps {
    indicators: Indicator[]
    countries: Country[]
}

export default function CompareChartSection({ indicators, countries }: CompareChartSectionProps) {
    const currentYear = new Date().getFullYear();
    const [selectedIndicator, setSelectedIndicator] = useState<number>(indicators[0]?.id || 49);

    // Default to two random countries or first two
    const [country1Name, setCountry1Name] = useState<string>(countries[33]?.name || countries[0]?.name || "");
    const [country2Name, setCountry2Name] = useState<string>(countries[222]?.name || countries[1]?.name || "");

    const [chartType, setChartType] = useState<"area" | "bar" | "line" | "pyramid">("area");
    const [startYear, setStartYear] = useState<number>(currentYear - 15);
    const [endYear, setEndYear] = useState<number>(currentYear);

    const [data1, setData1] = useState<CountryIndicatorDataResult | null>(null);
    const [data2, setData2] = useState<CountryIndicatorDataResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (!selectedIndicator || !country1Name || !country2Name) return;

        const country1 = countries.find(c => c.name === country1Name);
        const country2 = countries.find(c => c.name === country2Name);

        if (!country1 || !country2) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [res1, res2] = await Promise.all([
                    fetchCountryIndicatorData(selectedIndicator, country1.id, startYear, endYear),
                    fetchCountryIndicatorData(selectedIndicator, country2.id, startYear, endYear)
                ]);
                setData1(res1);
                setData2(res2);
            } catch (error) {
                console.error("Failed to load compare data", error);
                setData1(null);
                setData2(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedIndicator, country1Name, country2Name, startYear, endYear, countries]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl h-fit mt-6">
            <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                {/* Countries selection row */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end w-full">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Country 1
                        </label>
                        <SelectCountry
                            countries={countries}
                            selectedCountry={country1Name}
                            setSelectedCountry={setCountry1Name}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Country 2
                        </label>
                        <SelectCountry
                            countries={countries}
                            selectedCountry={country2Name}
                            setSelectedCountry={setCountry2Name}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Other selectors row */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-end w-full">
                    <div className="flex flex-col flex-grow w-full md:w-1/3">
                        <label htmlFor="indicator-select" className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Indicator
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

                    <div className="flex flex-col w-full sm:w-[calc(50%-0.5rem)] md:w-32">
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

                    <div className="flex flex-col w-full sm:w-[calc(50%-0.5rem)] md:w-32">
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

                    <div className="flex flex-col w-full md:w-auto">
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
                </div>
            </div>

            <div className="w-full relative min-h-[500px] min-w-[80%]">
                {loading && <AppSpinner />}
                {(data1 || data2) && (
                    <CompareChart
                        data1={data1}
                        data2={data2}
                        country1Name={country1Name}
                        country2Name={country2Name}
                        chartType={chartType}
                    />
                )}
            </div>
        </div>
    )
}

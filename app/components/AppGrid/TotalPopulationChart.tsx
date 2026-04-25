"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { TotalPopulation } from '../ServerComponents/TotalPopulation';

const TotalPopulationChart = ({ data }: { data: TotalPopulation[] }) => {
    return (
        <div className="flex border bg-white rounded-lg p-2 col-span-3 lg:col-span-2">
            <LineChart
                style={{ width: '100%', maxWidth: '1000px', height: '20rem', maxHeight: '20rem', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                <XAxis dataKey="timeLabel" stroke="var(--color-text-3)" />
                <YAxis width="auto" stroke="var(--color-text-3)" />
                <Tooltip
                    cursor={{
                        stroke: 'var(--color-border-2)',
                    }}
                    contentStyle={{
                        backgroundColor: 'var(--color-surface-raised)',
                        borderColor: 'var(--color-border-2)',
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Population"
                    stroke="var(--color-chart-1)"
                    dot={{
                        fill: 'var(--color-surface-base)',
                    }}
                    activeDot={{ r: 2, stroke: 'var(--color-surface-base)' }}
                />

            </LineChart>
        </div>
    )
}

export default TotalPopulationChart
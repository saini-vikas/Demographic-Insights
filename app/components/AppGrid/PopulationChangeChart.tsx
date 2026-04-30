"use client"

import { BarChart, Bar, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { PopulationChange } from '../ServerComponents/PopulationChange';
import { InfoTitle } from './AppHoverCard';

const PopulationChangeChart = ({ data, title, description }: PopulationChange) => {

    const formatYAxis = (value: number) => {
        return `${(value / 1000000).toFixed(1)}M`;
    };
    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 h-60 xl:h-84 p-2 rounded-lg col-span-3 md:col-span-2">
            <InfoTitle title={title as string} description={description} />
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 15,
                        left: 40,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />

                    <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)" >
                        <Label value="Year" offset={-10} className='font-semibold text-xs' position="insideBottom" fill="var(--color-text-3)" />
                    </XAxis>
                    <YAxis width="auto" tick={{ fontSize: 12 }} tickFormatter={formatYAxis} stroke="var(--color-text-3)">
                        <Label value="Population Change" angle={-90} offset={-25} position="insideLeft" className='font-semibold text-xs' fill="var(--color-text-3)" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip

                        cursor={{
                            fill: 'var(--color-surface-muted)',
                            opacity: 0.4
                        }}
                        contentStyle={{
                            backgroundColor: 'var(--color-surface-raised)',
                            borderColor: 'var(--color-border-2)',
                            borderRadius: '15px',
                        }}
                        formatter={(value: unknown) => [`${(Number(value) / 1000000).toFixed(2)} Million`, 'Population']}
                    />
                    <legend />
                    <Bar
                        dataKey="value"
                        fill="var(--color-chart-1)"
                        radius={[5, 5, 0, 0]}
                        barSize={50}
                    />

                </BarChart>
            </ResponsiveContainer >
        </div >
    )
}

export default PopulationChangeChart
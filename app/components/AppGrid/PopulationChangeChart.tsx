"use client"

import { LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { PopulationChange } from '../ServerComponents/PopulationChange';
import { InfoTitle } from './AppHoverCard';

const PopulationChangeChart = ({ data, title, description }: PopulationChange) => {

    const formatYAxis = (value: number) => {
        return `${(value / 1000000).toFixed(1)}M`;
    };
    return (
        <div className="flex flex-col items-center bg-white h-60 xl:h-84 p-2 rounded-lg col-span-3 lg:col-span-2">
            <InfoTitle title={title as string} description={description} />
            <ResponsiveContainer width="100%" height="100%" className="ml-7" minWidth={0}>
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                    <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} stroke="var(--color-text-3)" >
                        <Label value="Year" offset={-10} className='font-semibold text-xs' position="insideBottom" fill="var(--color-text-3)" />
                    </XAxis>
                    <YAxis width="auto" tick={{ fontSize: 12 }} tickFormatter={formatYAxis} stroke="var(--color-text-3)">
                        <Label value="Population Change" angle={-90} offset={-10} position="insideLeft" className='font-semibold text-xs' fill="var(--color-text-3)" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip

                        cursor={{
                            stroke: 'var(--color-border-2)',
                        }}
                        contentStyle={{
                            backgroundColor: 'var(--color-surface-raised)',
                            borderColor: 'var(--color-border-2)',
                            borderRadius: '15px',
                        }}
                        formatter={(value: unknown) => [`${(Number(value) / 1000000).toFixed(2)} Million`, 'Population']}
                    />
                    <legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={3}
                        stroke="var(--color-chart-1)"
                        dot={{
                            fill: 'var(--color-surface-base)',
                            r: 2,
                        }}
                        activeDot={{ r: 4, stroke: 'var(--color-surface-base)' }}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PopulationChangeChart
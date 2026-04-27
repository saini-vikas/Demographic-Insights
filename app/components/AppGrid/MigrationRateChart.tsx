"use client"

import {
    BarChart, // Changed from LineChart
    Bar,      // Changed from Line
    XAxis,
    YAxis,
    Label,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import type { MigrationRate } from '../ServerComponents/MigrationRate';
import { InfoTitle } from './AppHoverCard';

const MigrationRateChart = ({ data, description }: MigrationRate) => {
    const formatMillions = (value: number) => `${(value / 1000000).toFixed(1)}M`

    return (
        // Added h-[450px] or similar to ensure ResponsiveContainer has a height to fill
        <div className="flex flex-col items-center border bg-white p-2 rounded-lg col-span-3 md:col-span-2 xl:col-span-1 h-60 xl:h-auto">
            <InfoTitle title="Migration Rate" description={description} />

            <div className="flex-1 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 0,
                            right: 10,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-3)" />

                        <XAxis
                            dataKey="timeLabel"
                            tick={{ fontSize: 12 }}
                            stroke="var(--color-text-3)"
                        >
                            <Label
                                value="Year"
                                offset={-5}
                                className='font-semibold text-xs'
                                position="insideBottom"
                                fill="var(--color-text-3)"
                            />
                        </XAxis>

                        <YAxis
                            width={60} // Fixed width helps align labels better
                            tick={{ fontSize: 12 }}
                            tickFormatter={formatMillions}
                            stroke="var(--color-text-3)"
                        >
                            <Label
                                value="Migration Rate"
                                angle={-90}
                                offset={10}
                                position="insideLeft"
                                className='font-semibold text-xs'
                                fill="var(--color-text-3)"
                                style={{ textAnchor: 'middle' }}
                            />
                        </YAxis>

                        <Tooltip
                            cursor={{
                                fill: 'var(--color-surface-muted)', // Changed stroke to fill for bar hover effect
                                opacity: 0.4
                            }}
                            contentStyle={{
                                backgroundColor: 'var(--color-surface-raised)',
                                borderColor: 'var(--color-border-2)',
                                borderRadius: '15px',
                            }}
                            formatter={(value: unknown) => [`${(Number(value) / 1000000).toFixed(2)} Million`, 'Migration']}
                        />

                        <Bar
                            dataKey="value"
                            fill="var(--color-chart-1)" // Bars use 'fill' instead of 'stroke'
                            radius={[4, 4, 0, 0]}       // Optional: adds nice rounded corners to the top of bars
                            barSize={30}                // Optional: controls the thickness of the bars
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MigrationRateChart
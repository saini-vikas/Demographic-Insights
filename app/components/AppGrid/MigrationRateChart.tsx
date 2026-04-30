"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import type { MigrationRate } from '../ServerComponents/MigrationRate';
import { InfoTitle } from './AppHoverCard';

const MigrationRateChart = ({ data, description, topicName }: MigrationRate) => {
    const formatMillions = (value: number) => `${(value / 1000).toFixed(0)}K`

    return (
        // Added h-[450px] or similar to ensure ResponsiveContainer has a height to fill
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded-lg col-span-3 md:col-span-2 xl:col-span-1 h-60">
            <InfoTitle title="Migration Rate" description={description} topicName={topicName as string} />

            <div className="flex-1 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 0,
                            right: 15,
                            left: 15,
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
                                offset={0}
                                position="insideLeft"
                                className='font-semibold text-xs'
                                fill="var(--color-text-3)"
                                style={{ textAnchor: 'middle' }}
                            />
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
                            formatter={(value: unknown) => [`${(Number(value) / 1000).toFixed(2)} Thousand`, 'Migration']}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            strokeWidth={3}
                            stroke="var(--color-chart-8)"
                            dot={{
                                fill: 'var(--color-surface-base)',
                                r: 4,
                            }}
                            activeDot={{ r: 5, stroke: 'var(--color-surface-base)' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MigrationRateChart
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Brush,
    AreaChart,
    Area
} from 'recharts'

const RepoIssuesChart = ({ data }: any) => {
    return (
        <>
            <p>Azure-samples repository growth rate</p>
            <div className="line-chart-wrapper">
                <LineChart
                    width={600}
                    height={400}
                    data={data}
                    margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" label="" />
                    <YAxis domain={['auto', 'auto']} label="" />
                    <Tooltip
                        wrapperStyle={{
                            borderColor: 'white',
                            boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
                        }}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                        labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                    />
                    <Line dataKey="count" stroke="#ff7300" dot={false} />
                    <Brush dataKey="date" startIndex={data.length - 40}>
                        <AreaChart>
                            <CartesianGrid />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Area
                                dataKey="count"
                                stroke="#ff7300"
                                fill="#ff7300"
                                dot={false}
                            />
                        </AreaChart>
                    </Brush>
                </LineChart>
            </div>
        </>
    )
}

export default RepoIssuesChart

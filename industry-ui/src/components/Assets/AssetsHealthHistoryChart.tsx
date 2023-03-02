import Highcharts from 'highcharts'
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  Title,
  LineSeries,
  Tooltip,
} from 'react-jsx-highcharts'
import React from 'react'
import moment from 'moment'
import { HealthHistoryEntity, HealthStatus } from '@/types/types'

const plotOptions = {
  series: {
    marker: {
      enabled: true,
      radius: 2.5,
    },
  },
}

const flattenedData = (data: HealthHistoryEntity[] | null | undefined) =>
  data?.map((point: HealthHistoryEntity) => [
    moment.utc(point.timestamp).valueOf(),
    HealthStatus[point.status as keyof typeof HealthStatus],
  ])

export const AssetsHealthHistoryChart = ({
  data,
}: {
  data: HealthHistoryEntity[] | null | undefined
}) => {
  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart plotOptions={plotOptions}>
        <Chart type="spline" />
        <XAxis type="datetime" labels={{ format: '{value:%Y-%b-%e}' }}>
          <XAxis.Title>Date of data collection</XAxis.Title>
        </XAxis>
        <YAxis id="number" min={1} max={5} tickInterval={1}>
          <YAxis.Title>Health Status</YAxis.Title>
          <LineSeries id="my-series" data={flattenedData(data)} />
        </YAxis>
      </HighchartsChart>
    </HighchartsProvider>
  )
}

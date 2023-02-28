import Highcharts from 'highcharts'
import {
  HighchartsProvider, HighchartsChart, Chart, XAxis, YAxis, Title, LineSeries, Tooltip
} from 'react-jsx-highcharts';
import React from 'react';
import moment from 'moment';

const plotOptions = {
  series: {
    marker: {
      enabled: true,
      radius: 2.5
    }
  }
};

export interface HealthHistoryEntity {
  status: string;
  timestamp: string;
}

enum Direction {
  inOperation = 1,
  inDowntime,
  inAlert,
  unplannedStop,
  plannedStop
}

const flattenedData = (data: any) => data.map((point: any) => [moment.utc(point.timestamp).valueOf(), Direction[point.status]])

export const AssetsHealthHistoryChart = ({data}:{data: (HealthHistoryEntity)[] | null | undefined}) => {
  console.log((data))
  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart plotOptions={plotOptions}>
        <Chart type='spline' />
        <Title>Health History</Title>
        <XAxis type='datetime' labels={{format: '{value:%Y-%b-%e}'}}>
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

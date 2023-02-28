import React from 'react';
import { Button, Image, Typography, Progress, Descriptions, Card, Col, Row, Statistic } from 'antd';
import SlidingPanel from 'react-sliding-side-panel';
import Highcharts from 'highcharts'
import {
  HighchartsProvider, HighchartsChart, Chart, XAxis, YAxis, Title, LineSeries, PlotLine
} from 'react-jsx-highcharts';

export interface DataType {
  assignedUserIds?: (number)[] | null;
  companyId: number;
  healthHistory?: (HealthHistoryEntity)[] | null;
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors?: (string)[] | null;
  specifications: Specifications;
  status: string;
  unitId: number;
}
export interface HealthHistoryEntity {
  status: string;
  timestamp: string;
}
export interface Metrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}
export interface Specifications {
  maxTemp: number;
}

const { Title: TextTitle, Text } = Typography;
const plotOptions = {
  series: {
    pointStart: 2010
  }
};

const AssetsSidePanel = ({
  openPanel,
  setOpenPanel,
  selectedItem
}:{
  openPanel: boolean,
  setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>,
  selectedItem: DataType
}) => {
  const specifications = []

  if (selectedItem?.specifications) {
    for (const [key, value] of Object.entries(selectedItem?.specifications)) {
      specifications.push({label: key, value})
    }
  }
  return (
      <SlidingPanel
        type={'right'}
        isOpen={openPanel}
        size={40}
      >
        <div className='panel-container'>
          <Button type='primary' className='panel-button' onClick={() => setOpenPanel(false)} danger>close</Button>
          <TextTitle level={3}>{selectedItem?.name}</TextTitle>
          <Image
            height={400}
            src={selectedItem?.image}
            alt="Image of the selected motor"
            preview={false}
          />
          <div className='specifications-container'>
            <div className='health-score'>
              <Progress
                type="dashboard"
                strokeLinecap="butt"
                percent={selectedItem?.healthscore}
              />
              <Text type="secondary" style={{textAlign: 'center'}}>health score</Text>
            </div>
            <div className='specifications'>
              <Descriptions title="Specificaitons">
                {selectedItem?.specifications && specifications?.map((spec) => (
                  <Descriptions.Item key={spec.label} label={spec.label}>{spec.value ?? 'no data'}</Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </div>
          <div className='metrics-container'>
            <Row gutter={8}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    // prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    // prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card bordered={false}>
                    <Statistic
                      title="Idle"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      // prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
              </Col>
            </Row>
          </div>
          {/* <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart plotOptions={plotOptions}>
              <Chart />

              <Title>Return on investment</Title>

              <XAxis>
                <XAxis.Title>Year</XAxis.Title>
                
                <PlotLine id="investment" value={2012} dashStyle="Dash" width={1} color="#666">
                  <PlotLine.Label>Series A</PlotLine.Label>
                </PlotLine>
              </XAxis>

              <YAxis id="number">
                <YAxis.Title>Returns (£)</YAxis.Title>
                <LineSeries id="my-series" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
              </YAxis>
            </HighchartsChart>
          </HighchartsProvider> */}
        </div>
      </SlidingPanel>
  )
}
 
export default AssetsSidePanel;
import React, { useEffect, useState } from 'react';
import { Button, Image, Typography, Progress, Descriptions, Card, Col, Row, Statistic, Space, Skeleton } from 'antd';
import SlidingPanel from 'react-sliding-side-panel';
import moment from 'moment';
import { AssetsHealthHistoryChart } from './AssetsHealthHistoryChart';

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

enum HealthStatus {
  inOperation = 1,
  inDowntime,
  inAlert,
  unplannedStop,
  plannedStop
}

const { Title: TextTitle, Text } = Typography;

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
  const metrics = []
  if (selectedItem?.specifications) {
    for (const [key, value] of Object.entries(selectedItem?.specifications)) {
      specifications.push({label: key, value})
    }
  }
  if (selectedItem?.metrics) {
    for (const [key, value] of Object.entries(selectedItem?.metrics)) {
      metrics.push({label: key, value})
    }
  }
  return (
      <SlidingPanel
        type={'right'}
        isOpen={openPanel}
        size={50}
      >
        <div className='panel-container'>
          <Button type='primary' className='panel-button' onClick={() => setOpenPanel(false)} danger>close</Button>
          <TextTitle level={3}>{selectedItem?.name}</TextTitle>
          <Image
            height={300}
            src={selectedItem?.image}
            alt="Image of the selected motor"
            preview={false}
            placeholder={true}
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
          <div className='health-history-chart-container'>
            <AssetsHealthHistoryChart data={selectedItem?.healthHistory}/>
          </div>
          <div className='metrics-container'>
            {metrics?.length > 0 && (
            <>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
              <Row gutter={8}>
                  <Col span={24}>
                    <Card title="Health History Legend" bordered={false}>
                    <Text italic>{HealthStatus.inOperation}: In Operation<br/></Text>
                    <Text italic>{HealthStatus.inDowntime}: in Downtime<br/></Text>
                    <Text italic>{HealthStatus.inAlert}: In Alert<br/></Text>
                    <Text italic>{HealthStatus.unplannedStop}: Unplanned Stop<br/></Text>
                    <Text italic>{HealthStatus.plannedStop}: Planned Stop<br/></Text>
                    </Card>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={24}>
                    <Card bordered={false}>
                      <Statistic
                        title={metrics[0].label}
                        value={moment(metrics[0].value).format('LLL')}
                        precision={2}
                        valueStyle={{ color: '#1677ff' }}
                      />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title={metrics[1].label}
                        value={metrics[1].value}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                          title={metrics[2].label}
                          value={(Math.trunc(metrics[2].value))}
                          precision={0}
                          valueStyle={{ color: '#3f8600' }}
                          suffix="h"
                        />
                      </Card>
                  </Col>
                </Row>
              </Space>
            </>
            )}
          </div>
        </div>
      </SlidingPanel>
  )
}
 
export default AssetsSidePanel;
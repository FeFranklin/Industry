import React from 'react'
import {
  Button,
  Image,
  Typography,
  Progress,
  Descriptions,
  Card,
  Col,
  Row,
  Statistic,
  Space,
  Divider,
  Collapse,
} from 'antd'
import SlidingPanel from 'react-sliding-side-panel'
import moment from 'moment'
import { AssetsHealthHistoryChart } from './AssetsHealthHistoryChart'
import { AssetsSidePanelProps, HealthStatus } from '@/types/types'
import styles from '@/styles/AssetsSidePanel.module.scss'

const { Title: TextTitle, Text } = Typography
const { Panel } = Collapse

const AssetsSidePanel = ({
  openPanel,
  setOpenPanel,
  selectedItem,
}: AssetsSidePanelProps) => {
  const specifications = []
  const metrics = []
  if (selectedItem?.specifications) {
    for (const [key, value] of Object.entries(selectedItem?.specifications)) {
      specifications.push({ label: key, value })
    }
  }
  if (selectedItem?.metrics) {
    for (const [key, value] of Object.entries(selectedItem?.metrics)) {
      metrics.push({ label: key, value })
    }
  }
  return (
    <SlidingPanel type={'right'} isOpen={openPanel} size={50}>
      <div className={styles.sidepanelContainer}>
        <Button
          type="primary"
          className={styles.sidepanelbutton}
          onClick={() => setOpenPanel(false)}
          danger
        >
          close
        </Button>
        <Image
          className={styles.sidepanelimagecontainer}
          height={300}
          src={selectedItem?.image}
          alt="Image of the selected motor"
          preview={false}
          placeholder={true}
        />
        <Divider>Data about {selectedItem?.name}</Divider>
        <div className={styles.sidepanelspecificationscontainer}>
          <div className={styles.sidepanelhealthscore}>
            <Progress
              type="dashboard"
              strokeLinecap="butt"
              percent={selectedItem?.healthscore}
            />
            <Text type="secondary" className={styles.sidepanelhealthscore}>
              health score
            </Text>
          </div>
          <div className={styles.sidepanelspecifications}>
            <Descriptions title="Specifications">
              {selectedItem?.specifications &&
                specifications?.map((spec) => (
                  <Descriptions.Item key={spec.label} label={spec.label}>
                    {spec.value ?? 'no data'}
                  </Descriptions.Item>
                ))}
            </Descriptions>
          </div>
        </div>
        <Divider>Health history chart for {selectedItem?.name}</Divider>
        <div>
          <AssetsHealthHistoryChart data={selectedItem?.healthHistory} />
        </div>
        <div className={styles.sidepanelmetricscontainer}>
          <Collapse>
            <Panel header="Click here to see more Metrics!" key="1">
              {metrics?.length > 0 && (
                <>
                  <Space
                    direction="vertical"
                    size="small"
                    className={styles.sidepanelmetricscontainerspace}
                  >
                    <Row gutter={8}>
                      <Col span={24}>
                        <Card title="Health History Legend" bordered={false}>
                          <Text italic>
                            {HealthStatus.inOperation}: In Operation
                            <br />
                          </Text>
                          <Text italic>
                            {HealthStatus.inDowntime}: in Downtime
                            <br />
                          </Text>
                          <Text italic>
                            {HealthStatus.inAlert}: In Alert
                            <br />
                          </Text>
                          <Text italic>
                            {HealthStatus.unplannedStop}: Unplanned Stop
                            <br />
                          </Text>
                          <Text italic>
                            {HealthStatus.plannedStop}: Planned Stop
                            <br />
                          </Text>
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
                            value={Math.trunc(metrics[2].value)}
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
            </Panel>
          </Collapse>
        </div>
      </div>
    </SlidingPanel>
  )
}

export default AssetsSidePanel

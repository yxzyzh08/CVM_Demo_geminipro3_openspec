import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Row, Col, Card, Statistic, Tree, Empty, Input, Space, Tag, Progress, message, Modal } from 'antd';
import { PlusOutlined, SearchOutlined, RiseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { Kpi } from '../../types/kpi';
import { getKpis, deleteKpi } from '../../services/kpi-client';
import KpiModal from './components/KpiModal';
import KpiTrendChart from './components/KpiTrendChart';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { confirm } = Modal;

const KPIPage: React.FC = () => {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchKpis = async () => {
    setLoading(true);
    try {
      const data = await getKpis();
      setKpis(data);
      // If no KPI selected or selected one is gone, select first
      if (!selectedKpiId && data.length > 0) {
        setSelectedKpiId(data[0].id);
      } else if (selectedKpiId && !data.find(k => k.id === selectedKpiId)) {
          setSelectedKpiId(data.length > 0 ? data[0].id : null);
      }
    } catch (error) {
      message.error('Failed to load KPIs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const handleDelete = (id: string) => {
      confirm({
          title: 'Are you sure delete this KPI?',
          icon: <ExclamationCircleOutlined />,
          content: 'This action cannot be undone.',
          onOk: async () => {
              try {
                  await deleteKpi(id);
                  message.success('KPI deleted successfully');
                  fetchKpis();
              } catch (error) {
                  message.error('Failed to delete KPI');
              }
          },
      });
  };

  const selectedKpi = kpis.find(k => k.id === selectedKpiId) || (kpis.length > 0 ? kpis[0] : undefined);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={300} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>KPI Center</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} />
             </div>
             <Input placeholder="Search KPI..." prefix={<SearchOutlined />} />
          </Space>
        </div>
        <div style={{ padding: '0 16px' }}>
            {kpis.length === 0 ? <Empty description="No KPIs" image={Empty.PRESENTED_IMAGE_SIMPLE} /> : (
                <Tree
                    treeData={kpis.map(k => ({ title: k.name, key: k.id }))}
                    onSelect={(keys) => setSelectedKpiId(keys[0] as string)}
                    selectedKeys={selectedKpi ? [selectedKpi.id] : []}
                    blockNode
                />
            )}
        </div>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', overflowY: 'auto' }}>
          {selectedKpi ? (
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>{selectedKpi.name}</Title>
                    <Text type="secondary">{selectedKpi.description}</Text>
                    <div style={{ marginTop: 8 }}>
                        <Tag color={selectedKpi.status === 'Achieved' ? 'green' : selectedKpi.status === 'Overdue' ? 'red' : selectedKpi.status === 'AtRisk' ? 'orange' : 'blue'}>
                            {selectedKpi.status}
                        </Tag>
                        <Text type="secondary">Deadline: {selectedKpi.deadline}</Text>
                    </div>
                </div>
                <Space>
                    <Button>Edit</Button>
                    <Button danger onClick={() => handleDelete(selectedKpi.id)}>Delete</Button>
                </Space>
              </div>

              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={8}>
                    <Card>
                        <Statistic 
                            title="Current Value" 
                            value={selectedKpi.currentValue} 
                            precision={2}
                            suffix={selectedKpi.unit}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic 
                            title="Target Value" 
                            value={selectedKpi.targetValue} 
                            precision={2}
                            suffix={selectedKpi.unit}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Progress">
                         <Progress percent={Math.min(100, Math.round((selectedKpi.currentValue / selectedKpi.targetValue) * 100))} />
                    </Card>
                </Col>
              </Row>

              <Card title="Historical Trend" extra={<Button icon={<RiseOutlined />}>View Full Report</Button>}>
                  <div style={{ height: 300, width: '100%' }}>
                      <KpiTrendChart kpi={selectedKpi} />
                  </div>
              </Card>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Empty description="Select a KPI to view details" />
            </div>
          )}
        </Content>
      </Layout>
      <KpiModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchKpis} />
    </Layout>
  );
};

export default KPIPage;

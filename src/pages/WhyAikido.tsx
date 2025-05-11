import React from 'react';
import { Typography, Card, List, Row, Col, Space } from 'antd';
import {
  HeartOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  GlobalOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const benefits = [
  {
    icon: <HeartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Rozwój fizyczny i mentalny',
    description: 'Harmonijny rozwój ciała i umysłu poprzez kompleksowe ćwiczenia.'
  },
  {
    icon: <SafetyOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Samoobrona',
    description: 'Skuteczne techniki obrony bez użycia brutalnej siły.'
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Energia i witalność',
    description: 'Poprawa kondycji, równowagi i koordynacji ruchowej.'
  },
  {
    icon: <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Społeczność',
    description: 'Dołącz do przyjaznej społeczności praktykujących Aikido.'
  },
  {
    icon: <GlobalOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Tradycja i kultura',
    description: 'Poznaj fascynującą kulturę i filozofię Japonii.'
  },
  {
    icon: <MedicineBoxOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    title: 'Zdrowie i sprawność',
    description: 'Poprawa ogólnego stanu zdrowia i elastyczności.'
  }
];

const WhyAikido: React.FC = () => {
  return (
    <div className="fade-in">
      <Typography>
        <Title level={1} className="page-title">Dlaczego Aikido?</Title>
        
        <Card className="feature-card">
          <Paragraph style={{ fontSize: '16px', textAlign: 'center' }}>
            Aikido to więcej niż sztuka walki - to droga rozwoju osobistego i harmonii ciała z umysłem.
            Poprzez regularne treningi nie tylko uczysz się technik samoobrony, ale również rozwijasz się
            wewnętrznie i fizycznie.
          </Paragraph>
        </Card>

        <Title level={2} style={{ textAlign: 'center', margin: '48px 0 24px' }}>
          Korzyści z treningu Aikido
        </Title>

        <Row gutter={[24, 24]}>
          {benefits.map((benefit, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="feature-card" style={{ height: '100%' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
                  {benefit.icon}
                  <Title level={4}>{benefit.title}</Title>
                  <Paragraph>{benefit.description}</Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="feature-card" style={{ marginTop: '48px' }}>
          <Title level={3}>Dla kogo jest Aikido?</Title>
          <Paragraph>
            Aikido jest dla każdego - niezależnie od wieku, płci czy sprawności fizycznej.
            Techniki Aikido opierają się na wykorzystaniu energii przeciwnika, dlatego nie wymagają
            użycia dużej siły fizycznej.
          </Paragraph>
          <List
            style={{ marginTop: '24px' }}
            bordered
            dataSource={[
              'Dla osób w każdym wieku',
              'Dla początkujących i zaawansowanych',
              'Dla osób szukających harmonijnego rozwoju',
              'Dla zainteresowanych kulturą japońską',
              'Dla chcących poprawić sprawność fizyczną'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
      </Typography>
    </div>
  );
};

export default WhyAikido;

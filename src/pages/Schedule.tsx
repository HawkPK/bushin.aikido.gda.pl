import React from 'react';
import { Typography, Card, Table, Tag, Button, Space, Row, Col } from 'antd';
import { ClockCircleOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const scheduleData = [
  {
    key: '1',
    day: 'Poniedziałek',
    time: '18:00 - 19:30',
    level: 'Początkujący',
    instructor: 'Sensei Kowalski',
    type: ['podstawy', 'ukemi']
  },
  {
    key: '2',
    day: 'Poniedziałek',
    time: '19:45 - 21:15',
    level: 'Zaawansowani',
    instructor: 'Sensei Kowalski',
    type: ['techniki zaawansowane', 'broń']
  },
  {
    key: '3',
    day: 'Środa',
    time: '18:00 - 19:30',
    level: 'Początkujący',
    instructor: 'Sensei Nowak',
    type: ['podstawy', 'techniki']
  },
  {
    key: '4',
    day: 'Środa',
    time: '19:45 - 21:15',
    level: 'Zaawansowani',
    instructor: 'Sensei Nowak',
    type: ['techniki zaawansowane']
  },
  {
    key: '5',
    day: 'Piątek',
    time: '18:00 - 19:30',
    level: 'Ogólny',
    instructor: 'Sensei Kowalski',
    type: ['mieszany', 'wszystkie poziomy']
  },
  {
    key: '6',
    day: 'Sobota',
    time: '10:00 - 11:30',
    level: 'Dzieci (7-12 lat)',
    instructor: 'Sensei Nowak',
    type: ['podstawy', 'gry i zabawy']
  }
];

const columns = [
  {
    title: 'Dzień',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Godzina',
    dataIndex: 'time',
    key: 'time',
    render: (text: string) => (
      <Space>
        <ClockCircleOutlined />
        {text}
      </Space>
    )
  },
  {
    title: 'Poziom',
    dataIndex: 'level',
    key: 'level',
    render: (text: string) => {
      const color = 
        text.includes('Początkujący') ? 'green' :
        text.includes('Zaawansowani') ? 'blue' :
        text.includes('Dzieci') ? 'purple' : 'orange';
      return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: 'Instruktor',
    dataIndex: 'instructor',
    key: 'instructor',
    render: (text: string) => (
      <Space>
        <TeamOutlined />
        {text}
      </Space>
    )
  },
  {
    title: 'Typ zajęć',
    dataIndex: 'type',
    key: 'type',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => (
          <Tag color="default" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    )
  }
];

const Schedule: React.FC = () => {
  return (
    <div className="fade-in">
      <Typography>
        <Title level={1} className="page-title">Grafik zajęć</Title>

        <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
          <Col xs={24} md={8}>
            <Card className="feature-card">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <TrophyOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={3}>Nowy w Aikido?</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  Rozpocznij swoją przygodę z Aikido od zajęć dla początkujących.
                  Pierwszy trening jest bezpłatny!
                </Paragraph>
                <Button type="primary">
                  <Link to="/first-class">Dowiedz się więcej</Link>
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card className="feature-card">
              <Title level={3}>Informacje o zajęciach</Title>
              <Paragraph>
                Oferujemy treningi dostosowane do różnych poziomów zaawansowania i grup wiekowych.
                Wszystkie zajęcia prowadzone są przez wykwalifikowanych instruktorów z wieloletnim doświadczeniem.
              </Paragraph>
              <Paragraph>
                Na każdy trening należy przyjść 10-15 minut wcześniej. Prosimy o punktualność.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Card className="feature-card">
          <Table 
            dataSource={scheduleData} 
            columns={columns} 
            pagination={false}
            className="schedule-table"
          />
        </Card>
      </Typography>
    </div>
  );
};

export default Schedule;

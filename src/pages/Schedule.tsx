import React from 'react';
import { Typography, Card, Table, Tag, Button, Space, Row, Col, Breakpoint } from 'antd';
import { ClockCircleOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const scheduleData = [
  {
    key: '1',    day: 'Wtorek',
    time: '18:20',
    level: 'Dzieci (7 lat i starsze)',
    instructor: 'Piotr Pek',
    type: ['podstawy', 'gry i zabawy']
  },
  {
    key: '2',
    day: 'Wtorek',
    time: '19:20',
    level: 'Dorośli',
    instructor: 'Paweł Jastrząbek / Piotr Pek',
    type: ['podstawy', 'ukemi', 'techniki']
  },
  {
    key: '3',
    day: 'Czwartek',
    time: '17:30',
    level: 'Dzieci (3-6 lat)',
    instructor: 'Paweł Jastrząbek',
    type: ['gry i zabawy', 'koordynacja']
  },
  {
    key: '4',
    day: 'Czwartek',
    time: '18:20',    level: 'Dzieci (7 lat i starsze)',
    instructor: 'Paweł Jastrząbek',
    type: ['podstawy', 'ukemi']
  },
  {
    key: '5',
    day: 'Czwartek',
    time: '19:20',
    level: 'Dorośli/Młodzież Początkujący',
    instructor: 'Paweł Jastrząbek',
    type: ['podstawy', 'ukemi']
  },
  {
    key: '6',
    day: 'Czwartek',
    time: '20:00',
    level: 'Dorośli/Młodzież Zaawansowani',
    instructor: 'Paweł Jastrząbek',
    type: ['techniki zaawansowane', 'broń']
  }
];

const columns = [  {
    title: 'Dzień',
    dataIndex: 'day',
    key: 'day',
    width: '25%',
  },
  {
    title: 'Godzina',
    dataIndex: 'time',
    key: 'time',
    width: '25%',
    render: (text: string) => (
      <Space>
        <ClockCircleOutlined />
        {text}
      </Space>
    )
  },  {
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
  }
  // Commented out Instruktor column
  /*{
    title: 'Instruktor',
    dataIndex: 'instructor',
    key: 'instructor',
    render: (text: string) => (
      <Space>
        <TeamOutlined />
        {text}
      </Space>
    )
  }*/
  // Commented out Typ zajęć column
  /*{
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
  }*/
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
        </Row>        <Card className="feature-card">
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

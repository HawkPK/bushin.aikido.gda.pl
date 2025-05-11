import React from 'react';
import { Typography, Card, List, Row, Col, Timeline, Button } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const necessaryItems = [
  'Dres lub luźne spodnie (preferowany kolor ciemny)',
  'Koszulka z krótkim rękawem',
  'Klapki lub inne obuwie na zmianę',
  'Ręcznik',
  'Woda do picia'
];

const timelineSteps = [
  {
    title: 'Przed treningiem',
    description: 'Przyjdź 15 minut wcześniej, aby się przebrać i poznać dojo'
  },
  {
    title: 'Rozgrzewka',
    description: 'Rozpoczynamy od bezpiecznej rozgrzewki całego ciała'
  },
  {
    title: 'Podstawowe techniki',
    description: 'Poznasz pierwsze kroki i podstawowe pozycje'
  },
  {
    title: 'Ćwiczenia w parach',
    description: 'Spróbujesz pierwszych ćwiczeń z partnerem'
  }
];

const FirstClass: React.FC = () => {
  return (
    <div className="content-layout">
      <Typography>
        <Title level={1} className="page-title">Pierwsze zajęcia</Title>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card 
              title={<><CheckCircleOutlined /> Co zabrać na pierwszy trening?</>}
              className="feature-card"
            >
              <List
                dataSource={necessaryItems}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card 
              title={<><ClockCircleOutlined /> Przebieg pierwszego treningu</>}
              className="feature-card"
            >
              <Timeline items={timelineSteps.map(step => ({
                children: (
                  <>
                    <Title level={5}>{step.title}</Title>
                    <Paragraph>{step.description}</Paragraph>
                  </>
                )
              }))} />
            </Card>
          </Col>
        </Row>

        <Card 
          title={<><InfoCircleOutlined /> Ważne informacje</>}
          className="feature-card"
          style={{ marginTop: 24 }}
        >
          <Paragraph>
            Pierwsze zajęcia są próbne i bezpłatne. Wystarczy przyjść 15 minut przed rozpoczęciem treningu.
            Nie musisz mieć żadnego specjalnego stroju - keikogi (strój do aikido) możesz zakupić później.
          </Paragraph>
          <Paragraph>
            Na pierwszy trening przynieś ze sobą dobry humor i otwartość na nowe doświadczenia!
            Nasi instruktorzy zadbają o to, abyś czuł się komfortowo i bezpiecznie podczas pierwszych kroków w Aikido.
          </Paragraph>
          <Button type="primary" size="large" style={{ marginTop: 16 }}>
            Zapisz się na trening próbny
          </Button>
        </Card>
      </Typography>
    </div>
  );
};

export default FirstClass;

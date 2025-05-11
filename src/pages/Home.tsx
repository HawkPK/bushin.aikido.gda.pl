import React from 'react';
import { Typography, Card, Row, Col, Button, Space, Carousel } from 'antd';
import { ArrowRightOutlined, EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const carouselStyle: React.CSSProperties = {
  height: '400px',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
  color: '#fff',
  marginBottom: '40px',
};

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      <Carousel autoplay effect="fade">
        <div>
          <div style={carouselStyle}>
            <Title level={1} style={{ color: 'white', margin: 0 }}>
              Bushin Dojo
            </Title>
            <Title level={3} style={{ color: 'white', marginTop: '8px' }}>
              Akademia Aikido Gdańsk
            </Title>
          </div>
        </div>
        <div>
          <div style={carouselStyle}>
            <Title level={2} style={{ color: 'white' }}>
              Treningi dla początkujących i zaawansowanych
            </Title>
          </div>
        </div>
        <div>
          <div style={carouselStyle}>
            <Title level={2} style={{ color: 'white' }}>
              Dołącz do nas już dziś!
            </Title>
          </div>
        </div>
      </Carousel>

      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} md={16}>
          <Card className="feature-card">
            <Title level={2}>Witaj w Bushin Dojo</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              Bushin Dojo to miejsce, gdzie tradycyjna sztuka Aikido spotyka się ze współczesnym podejściem do treningu.
              Pod okiem doświadczonych instruktorów rozwiniesz swoje umiejętności, poprawisz kondycję
              i poznasz fascynującą kulturę japońskich sztuk walki.
            </Paragraph>
            <Space size="middle">
              <Button type="primary" size="large">
                <Link to="/first-class">Rozpocznij trening</Link>
              </Button>
              <Button size="large">
                <Link to="/why-aikido">Dowiedz się więcej <ArrowRightOutlined /></Link>
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="feature-card">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <EnvironmentOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <Title level={4}>Lokalizacja</Title>
                <Paragraph>
                  Klub "Gawra"<br />
                  ul. Trawki 7<br />
                  Gdańsk (obok PKM Niedźwiednik)
                </Paragraph>
              </div>
              <div>
                <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <Title level={4}>Godziny otwarcia</Title>
                <Paragraph>Pon-Pt: 17:00 - 21:00<br />Sob: 10:00 - 14:00</Paragraph>
              </div>
              <div>
                <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <Title level={4}>Kontakt</Title>
                <Paragraph>Tel: +48 123 456 789<br />Email: kontakt@bushindojo.pl</Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="feature-card" hoverable>
            <Title level={3}>Dla początkujących</Title>
            <Paragraph>
              Specjalne zajęcia wprowadzające dla osób rozpoczynających przygodę z Aikido.
              Bezpieczne i przyjazne środowisko do nauki.
            </Paragraph>
            <Link to="/first-class">Zobacz więcej</Link>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="feature-card" hoverable>
            <Title level={3}>Harmonogram</Title>
            <Paragraph>
              Elastyczny grafik zajęć dopasowany do różnych poziomów zaawansowania.
              Treningi poranne i wieczorne.
            </Paragraph>
            <Link to="/schedule">Zobacz grafik</Link>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="feature-card" hoverable>
            <Title level={3}>Aktualności</Title>
            <Paragraph>
              Bądź na bieżąco z wydarzeniami w naszym dojo.
              Seminaria, warsztaty i specjalne treningi.
            </Paragraph>
            <Link to="/news">Czytaj więcej</Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { 
  HomeOutlined, 
  QuestionCircleOutlined, 
  ScheduleOutlined, 
  TeamOutlined, 
  NotificationOutlined,
  ContactsOutlined,
  MenuOutlined
} from '@ant-design/icons';
import './App.css';

// Import page components
import Home from './pages/Home';
import WhyAikido from './pages/WhyAikido';
import Schedule from './pages/Schedule';
import FirstClass from './pages/FirstClass';
import News from './pages/News';
import Contact from './pages/Contact';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">O nas</Link>
  },
  {
    key: '2',
    icon: <QuestionCircleOutlined />,
    label: <Link to="/why-aikido">Dlaczego Aikido?</Link>
  },
  {
    key: '3',
    icon: <ScheduleOutlined />,
    label: <Link to="/schedule">Grafik zajęć</Link>
  },
  {
    key: '4',
    icon: <TeamOutlined />,
    label: <Link to="/first-class">Pierwsze zajęcia</Link>
  },
  {
    key: '5',
    icon: <NotificationOutlined />,
    label: <Link to="/news">Aktualności</Link>
  },
  {
    key: '6',
    icon: <ContactsOutlined />,
    label: <Link to="/contact">Kontakt</Link>
  }
];

const App: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <div className="logo">
            合気道
          </div>
          <div className="mobile-menu-button">
            <Button type="text" icon={<MenuOutlined />} onClick={toggleMobileMenu} />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            className="desktop-menu"
            items={menuItems}
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={toggleMobileMenu}
            open={mobileMenuVisible}
            className="mobile-menu-drawer"
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              theme="light"
              mode="vertical"
              items={menuItems}
              onClick={() => setMobileMenuVisible(false)}
            />
          </Drawer>
        </Header>
        <Content>
          <div className="content-layout">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/why-aikido" element={<WhyAikido />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/first-class" element={<FirstClass />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Content>
        <Footer className="footer">
          <div className="footer-content">
            <Title level={5} style={{ color: 'white', marginBottom: 24 }}>Bushin Dojo</Title>
            <p>Klub "Gawra", ul. Trawki 7</p>
            <p>Gdańsk (obok PKM Niedźwiednik)</p>
            <p>Tel: +48 123 456 789</p>
            <p>Email: kontakt@bushindojo.pl</p>
            <Button type="primary" ghost style={{ marginTop: 16 }}>
              <Link to="/contact">Skontaktuj się z nami</Link>
            </Button>
          </div>
          <div className="footer-bottom" style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
            Bushin Dojo ©{new Date().getFullYear()}
          </div>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;

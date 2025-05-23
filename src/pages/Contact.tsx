import React from 'react';
import { Typography, Card, Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Map from '../components/Map';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form] = Form.useForm<ContactFormData>();

  const onFinish = (values: ContactFormData) => {
    console.log('Form values:', values);
    message.success('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
    form.resetFields();
  };

  return (
    <div className="fade-in">
      <Typography>
        <Title level={1} className="page-title">Kontakt</Title>
        
        <Card className="feature-card" style={{ marginBottom: '24px' }}>
          <Map />
        </Card>

        <Row gutter={[24, 24]}>          <Col xs={24} lg={12}>
            <Card className="feature-card">
              <Title level={3}>Formularz kontaktowy</Title>
              <Paragraph>
                Formularz kontaktowy jest tymczasowo niedostępny. 
                Prosimy o kontakt telefoniczny lub mailowy.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="feature-card">
              <Title level={3}>Dane kontaktowe</Title>
              <div className="contact-info-item">
                <EnvironmentOutlined className="contact-info-icon" />
                <div>
                  <strong>Adres:</strong>
                  <Paragraph>
                    Bushin Dojo<br />
                    Klub "Gawra"<br />
                    ul. Trawki 7<br />
                    Gdańsk (obok PKM Niedźwiednik)
                  </Paragraph>
                </div>
              </div>

              <div className="contact-info-item">
                <PhoneOutlined className="contact-info-icon" />
                <div>
                  <strong>Telefon:</strong>
                  <Paragraph>+48 518 580 292</Paragraph>
                </div>
              </div>

              <div className="contact-info-item">
                <MailOutlined className="contact-info-icon" />
                <div>
                  <strong>Email:</strong>
                  <Paragraph>aikidonaniedzwiedniku@gmail.pl</Paragraph>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <Title level={4}>Godziny otwarcia:</Title>
                <Paragraph>
                  Poniedziałek - Piątek: 17:00 - 21:00<br />
                  Sobota: Zamknięte<br />
                  Niedziela: Zamknięte
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </Typography>
    </div>
  );
};

export default Contact;

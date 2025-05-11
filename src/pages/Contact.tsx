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

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card className="feature-card">
              <Form<ContactFormData>
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item
                  name="name"
                  label="Imię i Nazwisko"
                  rules={[{ required: true, message: 'Proszę podać imię i nazwisko' }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Proszę podać adres email' },
                    { type: 'email', message: 'Proszę podać poprawny adres email' }
                  ]}
                >
                  <Input size="large" prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Telefon"
                >
                  <Input size="large" prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Temat"
                  rules={[{ required: true, message: 'Proszę podać temat wiadomości' }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Wiadomość"
                  rules={[{ required: true, message: 'Proszę wpisać treść wiadomości' }]}
                >
                  <TextArea rows={6} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Wyślij wiadomość
                  </Button>
                </Form.Item>
              </Form>
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
                  <Paragraph>+48 123 456 789</Paragraph>
                </div>
              </div>

              <div className="contact-info-item">
                <MailOutlined className="contact-info-icon" />
                <div>
                  <strong>Email:</strong>
                  <Paragraph>kontakt@bushindojo.pl</Paragraph>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <Title level={4}>Godziny otwarcia:</Title>
                <Paragraph>
                  Poniedziałek - Piątek: 17:00 - 21:00<br />
                  Sobota: 10:00 - 14:00<br />
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

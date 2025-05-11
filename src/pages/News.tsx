import React from 'react';
import { Typography, Card, List, Tag, Space, Button } from 'antd';
import { CalendarOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface NewsItem {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  image?: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Letnie Seminarium Aikido 2025',
    date: '2025-07-15',
    author: 'Sensei Kowalski',
    content: 'Zapraszamy na letnie seminarium Aikido, które odbędzie się w dniach 15-17 lipca 2025. W programie intensywne treningi, wykłady o filozofii Aikido oraz integracja.',
    tags: ['seminarium', 'wydarzenia']
  },
  {
    id: 2,
    title: 'Nowe grupy początkujące',
    date: '2025-06-01',
    author: 'Sensei Nowak',
    content: 'Od czerwca otwieramy nowe grupy dla początkujących. Treningi będą odbywać się we wtorki i czwartki. Zapraszamy wszystkich chętnych do rozpoczęcia przygody z Aikido.',
    tags: ['początkujący', 'nabór']
  },
  {
    id: 3,
    title: 'Egzaminy na stopnie kyu',
    date: '2025-05-20',
    author: 'Sensei Kowalski',
    content: 'W dniu 20 maja odbędą się egzaminy na stopnie kyu. Wszystkich przygotowujących się do egzaminu zapraszamy na dodatkowe treningi w weekendy.',
    tags: ['egzaminy', 'stopnie kyu']
  }
];

const News: React.FC = () => {
  return (
    <div className="fade-in">
      <Typography>
        <Title level={1} className="page-title">Aktualności</Title>

        <List
          itemLayout="vertical"
          size="large"
          dataSource={newsData}
          renderItem={(item: NewsItem) => (
            <Card className="feature-card" style={{ marginBottom: '24px' }}>
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<Title level={3}>{item.title}</Title>}
                  description={
                    <Space direction="vertical" size="small">
                      <Space split={<span style={{ margin: '0 8px' }}>•</span>}>
                        <Space>
                          <CalendarOutlined />
                          {item.date}
                        </Space>
                        <Space>
                          <UserOutlined />
                          {item.author}
                        </Space>
                      </Space>
                      <Space>
                        <TagOutlined />
                        {item.tags.map(tag => (
                          <Tag key={tag} color="blue">{tag}</Tag>
                        ))}
                      </Space>
                    </Space>
                  }
                />
                <Paragraph style={{ marginTop: '16px' }}>
                  {item.content}
                </Paragraph>
                <Button type="link" style={{ paddingLeft: 0 }}>
                  Czytaj więcej
                </Button>
              </List.Item>
            </Card>
          )}
        />
      </Typography>
    </div>
  );
};

export default News;

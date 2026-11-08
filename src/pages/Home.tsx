import React from 'react';
import { Typography, Card, Row, Col, Button, Image } from 'antd';
import { ArrowRightOutlined, EnvironmentOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { scheduleData } from './Schedule';
import { useSignup } from '../components/SignupModal';
import './Home.css';

import heroImg from '../assets/home/hero.jpg';
import kamizaImg from '../assets/home/kamiza.jpg';
import kids36Img from '../assets/home/kids-3-6.jpg';
import kids7Img from '../assets/home/kids-7.jpg';
import adultsImg from '../assets/home/adults.jpg';
import gallerySeiza from '../assets/home/gallery-seiza.jpg';
import galleryDojo from '../assets/home/gallery-dojo.jpg';
import galleryUkemi from '../assets/home/gallery-ukemi.jpg';
import galleryDiplomas from '../assets/home/gallery-diplomas.jpg';
import galleryTechnique from '../assets/home/gallery-technique.jpg';
import galleryRei from '../assets/home/gallery-rei.jpg';

const { Title, Paragraph } = Typography;

type Slot = (typeof scheduleData)[number];

const dayPlural: Record<string, string> = {
  'Poniedziałek': 'poniedziałki',
  'Wtorek': 'wtorki',
  'Środa': 'środy',
  'Czwartek': 'czwartki',
  'Piątek': 'piątki',
  'Sobota': 'soboty',
  'Niedziela': 'niedziele',
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const pluralGroups = (n: number) => {
  if (n === 1) return 'grupa';
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'grupy' : 'grup';
};

// Joins slots that share a time, e.g. "Wtorek i czwartek 18:20".
const formatSlots = (slots: Slot[]) => {
  const byTime = new Map<string, string[]>();
  slots.forEach((slot) => byTime.set(slot.time, [...(byTime.get(slot.time) ?? []), slot.day]));
  return Array.from(byTime, ([time, days]) =>
    `${capitalize(days.map((day) => day.toLowerCase()).join(' i '))} ${time}`,
  );
};

const slotsFor = (levelPart: string) => scheduleData.filter((slot) => slot.level.includes(levelPart));

const trainingDays = Array.from(new Set(scheduleData.map((slot) => slot.day)));
const firstTime = scheduleData.map((slot) => slot.time).sort()[0];
const groupCount = new Set(scheduleData.map((slot) => slot.level)).size;
const daysText = capitalize(trainingDays.map((day) => dayPlural[day] ?? day.toLowerCase()).join(' i '));

const audiences = [
  {
    title: 'Dzieci 3–6 lat',
    image: kids36Img,
    alt: 'Najmłodsze dzieci podczas zajęć na macie',
    text: 'Zabawa, koordynacja i pierwsze padania. Dzieci uczą się współpracy i skupienia w bezpiecznych warunkach.',
    times: formatSlots(slotsFor('3-6 lat')).map((when) => ({ when, note: '' })),
  },
  {
    title: 'Dzieci 7+ lat',
    image: kids7Img,
    alt: 'Dzieci w seiza przed rozpoczęciem treningu',
    text: 'Podstawy aikido, padania, praca w parach i system kolorowych pasów z egzaminami.',
    times: formatSlots(slotsFor('7 lat')).map((when) => ({ when, note: '' })),
  },
  {
    title: 'Dorośli i młodzież',
    image: adultsImg,
    alt: 'Dorośli w hakama podczas treningu',
    text: 'Techniki aikido, praca z bronią (bokken, jo) i ruch, który poprawia kondycję w każdym wieku.',
    times: slotsFor('Dorośli').map((slot) => ({
      when: `${slot.day} ${slot.time}`,
      note: slot.level.split(' ').slice(1).join(' ').toLowerCase(),
    })),
  },
];

const gallery = [
  { src: gallerySeiza, alt: 'Szereg ćwiczących w seiza przed kamizą' },
  { src: galleryDojo, alt: 'Sala treningowa w popołudniowym słońcu' },
  { src: galleryUkemi, alt: 'Dzieci ćwiczą padania' },
  { src: galleryDiplomas, alt: 'Dyplomy i czarne pasy po egzaminie' },
  { src: galleryTechnique, alt: 'Ćwiczenie techniki w parze' },
  { src: galleryRei, alt: 'Ukłon na rozpoczęcie treningu' },
];

const Home: React.FC = () => {
  const openSignup = useSignup();

  return (
    <div className="fade-in home">
      <section className="home-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="home-hero-inner">
          <span className="home-hero-tag">Gdańsk · Niedźwiednik · ul. Trawki 7</span>
          <Title level={1} className="home-hero-title">Bushin Dojo</Title>
          <Title level={2} className="home-hero-subtitle">Akademia Aikido Gdańsk</Title>
          <Paragraph className="home-hero-text">
            Tradycyjne aikido dla dzieci, młodzieży i dorosłych. Dwa pierwsze treningi są bezpłatne —
            nie potrzebujesz doświadczenia ani kimona, wystarczy wygodny dres.
          </Paragraph>
          <div className="home-hero-actions">
            <Button type="primary" size="large" onClick={openSignup}>
              Umów darmowy trening
            </Button>
            <Button size="large" ghost href="#/schedule">
              Zobacz grafik
            </Button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <Row gutter={[{ xs: 16, md: 48 }, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title level={2}>Witaj w Bushin Dojo</Title>
            <Paragraph className="home-lead">
              Bushin Dojo to miejsce, gdzie tradycyjna sztuka Aikido spotyka się ze współczesnym podejściem do treningu.
              Pod okiem doświadczonych instruktorów rozwiniesz swoje umiejętności, poprawisz kondycję
              i poznasz fascynującą kulturę japońskich sztuk walki.
            </Paragraph>
            <div className="home-facts">
              <div><strong>{trainingDays.length}×</strong>treningi w tygodniu</div>
              <div><strong>3+</strong>lat — zajęcia od najmłodszych</div>
              <div><strong>{groupCount}</strong>{pluralGroups(groupCount)} w grafiku</div>
            </div>
            <Link to="/why-aikido">Dowiedz się więcej o aikido <ArrowRightOutlined /></Link>
          </Col>
          <Col xs={24} md={12}>
            <img
              className="home-welcome-img"
              src={kamizaImg}
              alt="Kamiza w dojo: kaligrafia 合氣道 i portret założyciela aikido"
            />
          </Col>
        </Row>
      </section>

      <section className="home-section">
        <Title level={2}>Dla kogo są zajęcia</Title>
        <Paragraph className="home-lead">Grupy dobrane do wieku i poziomu — każdy zaczyna od podstaw.</Paragraph>
        <Row gutter={[24, 24]}>
          {audiences.map((audience) => (
            <Col xs={24} md={8} key={audience.title}>
              <Card
                className="feature-card home-audience-card"
                cover={<img src={audience.image} alt={audience.alt} />}
              >
                <Title level={3}>{audience.title}</Title>
                <Paragraph className="home-audience-text">{audience.text}</Paragraph>
                {audience.times.map(({ when, note }) => (
                  <div className="home-when" key={when}>
                    {when}
                    {note && <span>{note}</span>}
                  </div>
                ))}
                <Link to="/schedule">Grafik <ArrowRightOutlined /></Link>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="home-section">
        <Title level={2}>Jak wyglądają treningi</Title>
        <Paragraph className="home-lead">Kliknij zdjęcie, aby je powiększyć.</Paragraph>
        <Image.PreviewGroup>
          <div className="home-gallery">
            {gallery.map((photo) => (
              <Image key={photo.src} src={photo.src} alt={photo.alt} preview={{ mask: 'Powiększ' }} />
            ))}
          </div>
        </Image.PreviewGroup>
      </section>

      <section className="home-info">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Title level={4}><EnvironmentOutlined /> Gdzie</Title>
            <Paragraph>Klub „Gawra”, ul. Trawki 7, Gdańsk<br />obok PKM Niedźwiednik</Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}><ClockCircleOutlined /> Kiedy</Title>
            <Paragraph>
              {daysText}, od {firstTime}<br />
              <Link to="/schedule">Pełny grafik <ArrowRightOutlined /></Link>
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}><PhoneOutlined /> Kontakt</Title>
            <Paragraph>+48 518 580 292<br />aikidonaniedzwiedniku@gmail.com</Paragraph>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;

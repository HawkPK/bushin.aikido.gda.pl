import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Modal, Form, Input, InputNumber, Radio, Checkbox, Button, Result, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { scheduleData } from '../pages/Schedule';
import './SignupModal.css';

const { Paragraph, Text } = Typography;

// Public Web3Forms access key: it only allows sending to the club address, so it is safe in client code.
// Created at https://web3forms.com for aikidonaniedzwiedniku@gmail.com.
const WEB3FORMS_KEY = '097201cf-9f6c-4ae7-8a18-b9e208fe6b39';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const CLUB_PHONE = '+48 518 580 292';
const CLUB_EMAIL = 'aikidonaniedzwiedniku@gmail.com';

const weekdayIndex: Record<string, number> = {
  'Niedziela': 0, 'Poniedziałek': 1, 'Wtorek': 2, 'Środa': 3, 'Czwartek': 4, 'Piątek': 5, 'Sobota': 6,
};
const weekdayShort = ['nd', 'pn', 'wt', 'śr', 'czw', 'pt', 'sb'];

interface Group {
  level: string;
  days: string[];
  time: string;
  isKids: boolean;
}

// One option per level in the schedule, e.g. kids 7+ train on two days at the same time.
const groups: Group[] = Array.from(
  scheduleData.reduce((map, slot) => {
    const group = map.get(slot.level) ?? { level: slot.level, days: [], time: slot.time, isKids: slot.level.includes('Dzieci') };
    group.days.push(slot.day);
    return map.set(slot.level, group);
  }, new Map<string, Group>()).values(),
).sort((a, b) =>
  // Kids first, then by start time, then by first training day (beginners on Tuesday before advanced on Thursday).
  Number(b.isKids) - Number(a.isKids)
  || a.time.localeCompare(b.time)
  || weekdayIndex[a.days[0]] - weekdayIndex[b.days[0]],
);

const describeDays = (group: Group) => `${group.days.map((day) => day.toLowerCase()).join(' i ')} ${group.time}`;

export const nextDates = (group: Group, count: number, from = new Date()) => {
  const wanted = group.days.map((day) => weekdayIndex[day]);
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  const result: string[] = [];
  while (result.length < count) {
    date.setDate(date.getDate() + 1);
    if (wanted.includes(date.getDay())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      result.push(`${weekdayShort[date.getDay()]} ${day}.${month}, ${group.time}`);
    }
  }
  return result;
};

interface SignupValues {
  level: string;
  date?: string;
  name: string;
  age?: number;
  phone?: string;
  email?: string;
  message?: string;
  consent: boolean;
  botcheck?: string;
}

type View = 'form' | 'success' | 'error';

const SignupContext = createContext<() => void>(() => {});

/** Returns a function that opens the "first training" signup popup. */
export const useSignup = () => useContext(SignupContext);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('form');
  const [sending, setSending] = useState(false);
  const [summary, setSummary] = useState<SignupValues | null>(null);
  const [form] = Form.useForm<SignupValues>();
  const level = Form.useWatch('level', form);

  const group = groups.find((g) => g.level === level);
  const dates = useMemo(() => (group ? nextDates(group, 4) : []), [group]);

  const openSignup = useCallback(() => {
    setView('form');
    setOpen(true);
  }, []);

  const close = () => {
    setOpen(false);
    if (view === 'success') form.resetFields();
  };

  const submit = async (values: SignupValues) => {
    if (values.botcheck) return;
    setSending(true);
    const chosen = groups.find((g) => g.level === values.level);
    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Zapis na pierwszy trening: ${values.level}`,
          from_name: 'Bushin Dojo – strona www',
          replyto: values.email || undefined,
          'Grupa': chosen ? `${values.level} (${describeDays(chosen)})` : values.level,
          'Termin': values.date || 'do ustalenia',
          [chosen?.isKids ? 'Rodzic' : 'Imię i nazwisko']: values.name,
          ...(chosen?.isKids ? { 'Wiek dziecka': values.age } : {}),
          'Telefon': values.phone || '-',
          'E-mail': values.email || '-',
          'Wiadomość': values.message || '-',
          botcheck: '',
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || response.statusText);
      setSummary(values);
      setView('success');
    } catch {
      setView('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <SignupContext.Provider value={openSignup}>
      {children}
      <Modal
        open={open}
        onCancel={close}
        footer={null}
        width={560}
        className="signup-modal"
        title={view === 'form' ? 'Zapisz się na darmowy pierwszy trening' : null}
        destroyOnClose={false}
      >
        {view === 'form' && (
          <>
            <Paragraph type="secondary">Odpowiemy w ciągu 1–2 dni i potwierdzimy termin.</Paragraph>
            <Form form={form} layout="vertical" onFinish={submit} requiredMark onValuesChange={(changed) => {
              if ('level' in changed) form.setFieldValue('date', undefined);
            }}>
              <Form.Item name="level" label="Na które zajęcia?" rules={[{ required: true, message: 'Wybierz grupę.' }]}>
                <Radio.Group className="signup-groups">
                  {groups.map((g) => (
                    <Radio key={g.level} value={g.level} className="signup-group">
                      <strong>{g.level}</strong>
                      <span>{describeDays(g)}</span>
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

              {group && (
                <Form.Item name="date" label="Kiedy chcesz przyjść?" extra="Opcjonalnie — możemy ustalić termin później.">
                  <Radio.Group optionType="button" buttonStyle="solid" className="signup-dates" options={dates} />
                </Form.Item>
              )}

              <Row gutter={12}>
                <Col xs={24} sm={group?.isKids ? 14 : 24}>
                  <Form.Item
                    name="name"
                    label={group?.isKids ? 'Imię i nazwisko rodzica' : 'Imię i nazwisko'}
                    rules={[{ required: true, whitespace: true, message: 'Podaj imię.' }]}
                  >
                    <Input autoComplete="name" />
                  </Form.Item>
                </Col>
                {group?.isKids && (
                  <Col xs={24} sm={10}>
                    <Form.Item name="age" label="Wiek dziecka" rules={[{ required: true, message: 'Podaj wiek.' }]}>
                      <InputNumber min={3} max={17} style={{ width: '100%' }} inputMode="numeric" />
                    </Form.Item>
                  </Col>
                )}
              </Row>

              <Row gutter={12}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Telefon"
                    dependencies={['email']}
                    rules={[({ getFieldValue }) => ({
                      required: !getFieldValue('email'),
                      message: 'Podaj telefon albo e-mail.',
                    })]}
                  >
                    <Input type="tel" autoComplete="tel" placeholder="np. 500 600 700" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="email" label="E-mail" rules={[{ type: 'email', message: 'Niepoprawny adres e-mail.' }]}>
                    <Input type="email" autoComplete="email" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="message" label="Wiadomość (opcjonalnie)">
                <Input.TextArea rows={3} placeholder="np. pytania, wcześniejsze doświadczenie, kontuzje" />
              </Form.Item>

              <Form.Item name="botcheck" hidden>
                <Input tabIndex={-1} autoComplete="off" />
              </Form.Item>

              <Form.Item
                name="consent"
                valuePropName="checked"
                rules={[{ validator: (_, checked) => (checked ? Promise.resolve() : Promise.reject(new Error('Zgoda jest wymagana.'))) }]}
              >
                <Checkbox className="signup-consent">
                  Zgadzam się na kontakt w sprawie zapisu na zajęcia. Dane wykorzystamy wyłącznie w tym celu.
                  Administratorem danych jest Bushin Dojo, ul. Trawki 7, Gdańsk.
                </Checkbox>
              </Form.Item>

              <div className="signup-actions">
                <Button onClick={close}>Anuluj</Button>
                <Button type="primary" htmlType="submit" loading={sending}>
                  {sending ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}
                </Button>
              </div>
            </Form>
          </>
        )}

        {view === 'success' && summary && (
          <Result
            status="success"
            title="Dziękujemy, zgłoszenie wysłane!"
            subTitle="Skontaktujemy się w ciągu 1–2 dni, żeby potwierdzić termin."
            extra={[
              <div className="signup-summary" key="summary">
                <div><Text strong>Grupa:</Text> {summary.level}</div>
                <div><Text strong>Termin:</Text> {summary.date || 'do ustalenia'}</div>
                <div><Text strong>Kontakt:</Text> {summary.phone || summary.email}</div>
              </div>,
              <Paragraph key="tip">
                Przyjdź 15 minut wcześniej w wygodnym dresie.{' '}
                <Link to="/first-class" onClick={close}>Co zabrać?</Link>
              </Paragraph>,
              <Button type="primary" key="close" onClick={close}>Zamknij</Button>,
            ]}
          />
        )}

        {view === 'error' && (
          <Result
            status="warning"
            title="Nie udało się wysłać"
            subTitle={<>Spróbuj ponownie za chwilę albo zadzwoń lub napisz bezpośrednio:<br /><strong>{CLUB_PHONE}</strong><br /><strong>{CLUB_EMAIL}</strong></>}
            extra={[
              <Button key="close" onClick={close}>Zamknij</Button>,
              <Button key="retry" type="primary" onClick={() => setView('form')}>Spróbuj ponownie</Button>,
            ]}
          />
        )}
      </Modal>
    </SignupContext.Provider>
  );
};

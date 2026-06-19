import { Button } from "@/shared/components/button";
import { Section } from "@/shared/components/section";
import styles from "./HomePage.module.scss";
import { Container } from "@/shared/components/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/accordion";
import { Skeleton } from "@/shared/components/skeleton";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Clock01Icon,
  GlobalIcon,
  HeadsetIcon,
  ImageIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { Globe } from "@/shared/components/globe";

type Service = {
  title: string;
};

type Question = {
  value: string;
  question: string;
  answer: string;
};

const capitals: Record<string, [number, number]> = {
  Afghanistan: [69.2075, 34.5553], // Kabul
  Albania: [19.8187, 41.3275], // Tirana
  Andorra: [1.5218, 42.5063], // Andorra la Vella
  Armenia: [44.5152, 40.1872], // Yerevan
  Austria: [16.3738, 48.2082], // Vienna
  Azerbaijan: [49.8671, 40.4093], // Baku
  Belarus: [27.5615, 53.9045], // Minsk
  Belgium: [4.3517, 50.8503], // Brussels
  "Bosnia and Herz.": [18.4131, 43.8563], // Sarajevo
  "Bosnia and Herzegovina": [18.4131, 43.8563], // Sarajevo
  Bulgaria: [23.3219, 42.6977], // Sofia
  China: [116.4074, 39.9042], // Beijing
  Croatia: [15.9819, 45.815], // Zagreb
  Cyprus: [33.3823, 35.1856], // Nicosia
  Czechia: [14.4378, 50.0755], // Prague
  "Czech Republic": [14.4378, 50.0755], // Prague
  Denmark: [12.5683, 55.6761], // Copenhagen
  Estonia: [24.7536, 59.437], // Tallinn
  Finland: [24.9384, 60.1699], // Helsinki
  France: [2.3522, 48.8566], // Paris
  Germany: [13.405, 52.52], // Berlin
  Greece: [23.7275, 37.9838], // Athens
  Hungary: [19.0402, 47.4979], // Budapest
  Ireland: [-6.2603, 53.3498], // Dublin
  Italy: [12.4964, 41.9028], // Rome
  Kazakhstan: [71.4304, 51.1694], // Astana
  Kosovo: [21.1655, 42.6629], // Pristina
  Kyrgyzstan: [74.5698, 42.8746], // Bishkek
  Latvia: [24.1052, 56.9496], // Riga
  Liechtenstein: [9.5215, 47.141], // Vaduz
  Lithuania: [25.2797, 54.6872], // Vilnius
  Luxembourg: [6.1319, 49.6116], // Luxembourg
  Macedonia: [21.4316, 41.9981], // Skopje
  Malta: [14.5146, 35.8989], // Valletta
  Moldova: [28.8638, 47.0105], // Chisinau
  Monaco: [7.4246, 43.7384], // Monaco
  Montenegro: [19.262, 42.4304], // Podgorica
  Netherlands: [4.9041, 52.3676], // Amsterdam
  "North Macedonia": [21.4316, 41.9981], // Skopje
  Norway: [10.7522, 59.9139], // Oslo
  Poland: [21.0122, 52.2297], // Warsaw
  Portugal: [-9.1393, 38.7223], // Lisbon
  Romania: [26.1025, 44.4268], // Bucharest
  Russia: [37.6173, 55.7558], // Moscow
  Serbia: [20.4489, 44.7866], // Belgrade
  Slovakia: [17.1077, 48.1486], // Bratislava
  Slovenia: [14.5058, 46.0569], // Ljubljana
  Spain: [-3.7038, 40.4168], // Madrid
  Sweden: [18.0686, 59.3293], // Stockholm
  Switzerland: [7.4474, 46.948], // Bern
  Tajikistan: [68.7739, 38.5598], // Dushanbe
  Turkey: [32.8597, 39.9334], // Ankara
  Turkmenistan: [58.3833, 37.9601], // Ashgabat
  Ukraine: [30.5234, 50.4501], // Kyiv
  "United Kingdom": [-0.1276, 51.5074], // London
  Uzbekistan: [69.2401, 41.2995], // Tashkent
  "Vatican City": [12.4534, 41.9029], // Vatican City
};

const services: Service[] = [
  {
    title: "Авиа",
  },
  {
    title: "Ж/Д",
  },
  {
    title: "Авто",
  },
];

type Reason = {
  icon: IconSvgElement; // Hugeicons
  title: string;
  description: string;
};

const questions: Question[] = [
  {
    value: "delivery-time",
    question: "Сколько времени занимает доставка груза?",
    answer:
      "Сроки зависят от направления, способа перевозки и особенностей груза. После получения заявки мы рассчитываем оптимальный маршрут и сообщаем точные сроки доставки.",
  },
  {
    value: "cargo-types",
    question: "Какие грузы вы перевозите?",
    answer:
      "Мы работаем с широким спектром грузов: оборудованием, сырьем, товарами народного потребления, промышленной продукцией и другими коммерческими грузами.",
  },
  {
    value: "delivery-regions",
    question: "В какие страны осуществляется доставка?",
    answer:
      "Мы организуем перевозки по странам СНГ, Европы и Азии, используя автомобильный, железнодорожный и авиационный транспорт.",
  },
  {
    value: "cargo-insurance",
    question: "Можно ли застраховать груз?",
    answer:
      "Да, по запросу мы поможем оформить страхование груза, чтобы обеспечить дополнительную финансовую защиту на всем маршруте перевозки.",
  },
];

const reasons: Reason[] = [
  {
    icon: Shield01Icon,
    title: "Безопасность груза",
    description:
      "Контролируем перевозку на каждом этапе и предлагаем дополнительные решения по страхованию груза.",
  },
  {
    icon: Clock01Icon,
    title: "Соблюдение сроков",
    description:
      "Подбираем оптимальный маршрут и транспорт, чтобы минимизировать время доставки.",
  },
  {
    icon: GlobalIcon,
    title: "Широкая география",
    description:
      "Организуем перевозки по СНГ, Европе и Азии автомобильным, железнодорожным и авиационным транспортом.",
  },
  {
    icon: HeadsetIcon,
    title: "Персональный менеджер",
    description:
      "На протяжении всей перевозки вы работаете с одним специалистом и оперативно получаете информацию о статусе груза.",
  },
];

export function HomePage() {
  return (
    <main>
      <Section className={styles.Hero}>
        <Container className={styles.container}>
          <div className={styles.block}>
            <h1 className="display">
              Международные грузоперевозки <br />
              по&nbsp;СНГ, Европе и&nbsp;Азии
            </h1>
            <p className="muted">
              Авто, авиа и&nbsp;железнодорожные перевозки для бизнеса.
              Рассчитаем стоимость и&nbsp;предложим оптимальный маршрут
              за&nbsp;30&nbsp;минут
            </p>
          </div>

          <Button>
            {/* <Link to={"https://wa.me/+77712434109"} target="_blank"> */}
            <span>Получить рассчет</span>
            {/* </Link> */}
          </Button>

          <Globe
            className={styles.globe}
            options={{
              angle: [-56.9, -13.2],
              mode: "3d",
              highlights: Object.keys(capitals),
            }}
          />
        </Container>
      </Section>

      <Section className={styles.ServicesSection}>
        <Container className={styles.container}>
          <div>
            <h2 className="heading xl">Направления перевозок</h2>
            <p className="muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              nihil? Esse totam iste ullam. Tempora velit expedita eligendi
              earum ad, quia suscipit sequi distinctio corporis porro omnis ab
              non quod?
            </p>
          </div>
          <div className={styles.content}>
            {services.map(({ title }, index) => (
              <article className={styles.card} key={index}>
                <Skeleton className={styles.cover}>
                  <HugeiconsIcon size={32} icon={ImageIcon} />
                </Skeleton>
                <div className={styles.details}>
                  <span className="heading sm">{title}</span>
                  <p className="muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt, rerum.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className={styles.RoutesSection}>
        <Container className={styles.container}>
          <h2 className="heading xl">География</h2>
          <img style={{ width: "50%" }} src="/map.png" alt="" />
        </Container>
      </Section>

      <Section className={styles.ReasonsSection}>
        <Container className={styles.container}>
          <div>
            <h2 className="heading xl">Почему нам доверяют</h2>
            <ul className={styles.list}>
              {reasons.map(({ title, icon, description }, index) => (
                <li className={styles.card} key={index}>
                  <div className={styles.header}>
                    <HugeiconsIcon icon={icon} />
                    <span className="heading">{title}</span>
                  </div>
                  <p className={styles.description}>{description}</p>
                </li>
              ))}
            </ul>
          </div>
          <Skeleton className={styles.image}>
            <HugeiconsIcon size={48} icon={ImageIcon} />
          </Skeleton>
        </Container>
      </Section>

      <Section className={styles.CasesSection}>
        <Container className={styles.container}>
          <h2 className="heading xl">Кейсы</h2>
          <div className={styles.content}>
            <Skeleton className={styles.mainCase}>
              <HugeiconsIcon size={32} icon={ImageIcon} />
            </Skeleton>
            <Skeleton>
              <HugeiconsIcon size={32} icon={ImageIcon} />
            </Skeleton>
            <Skeleton>
              <HugeiconsIcon size={32} icon={ImageIcon} />
            </Skeleton>
            <Skeleton>
              <HugeiconsIcon size={32} icon={ImageIcon} />
            </Skeleton>
            <Skeleton>
              <HugeiconsIcon size={32} icon={ImageIcon} />
            </Skeleton>
          </div>
        </Container>
      </Section>

      <Section className={styles.QuestionsSection}>
        <Container className={styles.container}>
          <div>
            <h2 className="heading xl">Часто задаваемые вопросы</h2>
            <p className="muted">
              Не нашли ответ на ваш вопрос? <br />
              Свяжитесь с нами и мы с радостью ответим
            </p>
          </div>
          <div>
            <Accordion defaultValue="delivery-time">
              {questions.map(({ value, question, answer }) => (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>
    </main>
  );
}

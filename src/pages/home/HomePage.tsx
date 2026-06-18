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
import { Link } from "react-router-dom";

type Service = {
  title: string;
};

type Question = {
  value: string;
  question: string;
  answer: string;
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
      <Section className={styles.HeroSection}>
        <Container className={styles.container}>
          <div>
            <h1 className="display">
              Международные грузоперевозки по&nbsp;СНГ, Европе и&nbsp;Азии
            </h1>
            <p className="muted">
              Авто, авиа и&nbsp;железнодорожные перевозки для бизнеса.
              Рассчитаем стоимость и&nbsp;предложим оптимальный маршрут
              за&nbsp;30&nbsp;минут
            </p>
          </div>

          <div>
            <Button asChild>
              <Link to={"https://wa.me/+77712434109"} target="_blank">
                <span>Получить рассчет</span>
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className={styles.ServicesSection}>
        <Container className={styles.container}>
          <h2 className="heading xl">Направления перевозок</h2>
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

import { Container } from "@/shared/components/container";
import { Globe } from "@/shared/components/globe";
import { Section } from "@/shared/components/section";
import { capitals } from "./data";
import styles from "./HomePage.module.scss";
import { useMemo, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";

function shortestAngleDelta(from: number, to: number): number {
  let delta = (to - from) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

export function RoutesSection() {
  const __capitals = Object.entries(capitals);
  const [activeCountry, setActiveCountry] = useState(__capitals[0][0]);

  const [initLon, initLat] = __capitals[0][1];
  const lambda = useMotionValue(-initLon);
  const phi = useMotionValue(-initLat);

  const highlights = useMemo(() => [activeCountry], [activeCountry]);

  // ref не для рендера, а только чтобы знать "откуда" стартовать
  // следующий клик, get() с motion value дает то же самое,
  // но ref дешевле чем читать .get() в обработчике клика
  const lastTarget = useRef<[number, number]>([-initLon, -initLat]);

  const handleClick = (coords: [number, number], country: string) => {
    if (country === activeCountry) return;

    const [lon, lat] = coords;
    const target: [number, number] = [-lon, -lat];
    const from = lastTarget.current;

    const lambdaTarget = from[0] + shortestAngleDelta(from[0], target[0]);
    const phiTarget = from[1] + shortestAngleDelta(from[1], target[1]);

    lastTarget.current = [lambdaTarget, phiTarget];
    setActiveCountry(country);

    // animate(motionValue, target, options) пишет напрямую в motion value,
    // без React re-render на каждый кадр
    animate(lambda, lambdaTarget, { type: "spring", bounce: 0, duration: 1.2 });
    animate(phi, phiTarget, { type: "spring", bounce: 0, duration: 1.2 });
  };

  return (
    <Section className={styles.Routes}>
      <Container className={styles.container}>
        <div>
          <h2 className="heading lg">{"[Geography]"}</h2>
          <p className="muted">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo,
            eaque.
          </p>
          <ul>
            {__capitals.map(([key, value]) => (
              <li
                role="button"
                aria-pressed={key === activeCountry}
                onClick={() => handleClick(value, key)}
                key={key}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.GlobeContainer}>
          <Globe
            className={styles.Globe}
            options={{
              mode: "3d",
              angle: { lambda, phi },
              highlights,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}

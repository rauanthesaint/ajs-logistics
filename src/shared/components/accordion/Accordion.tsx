import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import styles from "./Accordion.module.scss";

type AccordionState = {
  selected: string | undefined;
  setSelected: (s: string | undefined) => void;
};

type AccordionItemState = {
  value: string;
};

const AccordionContext = createContext<AccordionState | null>(null);
const AccordionItemContext = createContext<AccordionItemState | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used within Accordion");
  return ctx;
}

function useAccordionItem() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx)
    throw new Error("useAccordionItem must be used within AccordionItem");
  return ctx;
}

type AccordionProps = {
  children: ReactNode;
  defaultValue?: string;
};

export function Accordion({ defaultValue, children }: AccordionProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  return (
    <AccordionContext.Provider value={{ selected, setSelected }}>
      <div className={styles.Accordion}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: string;
  children: ReactNode;
};

export function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={styles.AccordionItem}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children }: { children: ReactNode }) {
  const { selected, setSelected } = useAccordion();
  const { value } = useAccordionItem();

  return (
    <button
      className={styles.AccordionTrigger}
      onClick={() => setSelected(selected === value ? undefined : value)}
    >
      <HugeiconsIcon icon={PlusSignIcon} />
      <span className="heading">{children}</span>
    </button>
  );
}

export function AccordionContent({ children }: { children: ReactNode }) {
  const { selected } = useAccordion();
  const { value } = useAccordionItem();
  const isSelected = selected === value;

  return (
    <motion.div
      animate={{ height: isSelected ? "auto" : "0" }}
      className={styles.AccordionContent}
    >
      {children}
    </motion.div>
  );
}

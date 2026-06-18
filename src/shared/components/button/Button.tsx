import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = { children: ReactNode; asChild?: boolean } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export function Button({
  children,
  className,
  type = "button",
  asChild,
  ...rest
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component type={type} className={clsx(styles.Button, className)} {...rest}>
      {children}
    </Component>
  );
}

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = {
  children: ReactNode;
  asChild?: boolean;
  variant?: "default" | "ghost";
  size?: "sm" | "md";
  isIcon?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({
  children,
  className,
  type = "button",
  size = "md",
  asChild,
  variant = "default",
  isIcon,
  ...rest
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  const classes = clsx(
    styles.Button,
    styles[variant],
    styles[size],
    { [styles.icon]: isIcon },
    className,
  );

  return (
    <Component type={type} className={classes} {...rest}>
      {children}
    </Component>
  );
}

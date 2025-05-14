import React from "react";
import styles from "@/styles/user-profile.module.scss";

type CardProps = {
  children: React.ReactNode;
};

type HeaderProps = {
  children: React.ReactNode;
};

type BodyProps = {
  children: React.ReactNode;
};

type FooterProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}

function CardHeader({ children }: HeaderProps) {
  return <div className={styles.cardHeader}>{children}</div>;
}

function CardBody({ children }: BodyProps) {
  return <div className={styles.cardBody}>{children}</div>;
}

function CardFooter({ children }: FooterProps) {
  return <div className={styles.cardFooter}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

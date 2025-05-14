import React from "react";
import styles from "@/styles/page-layout.module.scss";
type Props = {
  children: React.ReactNode;
  title: string;
};

const PageLayout = ({ children, title }: Props) => {
  return (
    <section className={styles.pageLayout}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

export default PageLayout;

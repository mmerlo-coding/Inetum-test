"use client";

import { useState } from "react";
import { LayoutList, Menu, X } from "lucide-react";
import styles from "@/styles/sidebar.module.scss";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={styles.mobileMenuButtonContainer}>
        <button onClick={toggleMobileMenu} className={styles.mobileMenuButton} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <LayoutList size={24} /> Gestion de tareas
        </div>
        <div className={styles.sidebarContentWrapper}>
          <nav className={styles.sidebarNav}>{children}</nav>
        </div>
      </aside>

      {/* Overlay for mobile when menu is open */}
      {isMobileMenuOpen && <div className={styles.mobileOverlay} onClick={toggleMobileMenu} role="button" tabIndex={0} />}
    </>
  );
}

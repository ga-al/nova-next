"use client";

import { useState } from "react";

import HeroSection from "@/components/home/HeroSection/HeroSection";
import TickerSection from "@/components/home/TickerSection/TickerSection";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import CatalogSection from "@/components/home/CatalogSection/CatalogSection";
import ContactForm from "@/components/contact/ContactForm";

export default function HomeContent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeroSection handleOpen={() => setIsOpen(true)} />
      <TickerSection handleOpen={() => setIsOpen(true)} />
      <AboutSection />
      <CatalogSection />
      <ContactForm handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </>
  );
}

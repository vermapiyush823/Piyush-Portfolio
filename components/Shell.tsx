"use client";

import { useState } from "react";
import About from "./About";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Experience from "./Experience";
import Hero from "./Hero";
import Journey from "./Journey";
import Loader from "./Loader";
import Nav from "./Nav";
import Projects from "./Projects";
import ScrollProgress from "./ScrollProgress";
import Skills from "./Skills";

export default function Shell() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Journey />
        <Contact />
      </main>
    </>
  );
}

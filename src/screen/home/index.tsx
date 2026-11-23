import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Project";
import Skills from "@/components/home/Skills";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import Experience from "@/components/home/Experience";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative overflow-hidden">
        <BackgroundGrid size={{ x: "32px", y: "32px" }} />
        <Skills />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
        <Experience/>
        <Contact/>
      </div>
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 animate-pulse">
      <div className="h-8 w-48 bg-white/10 rounded mb-4" />
      <div className="h-96 w-full bg-white/5 rounded-2xl" />
    </div>
  );
}
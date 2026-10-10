"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { projects, type Project } from "@/constants/projects";
import ProjectModal from "@/components/ProjectModal";
import Loader from "@/components/ui/Loader";
import FlexCarousel, { type FlexCarouselItem } from "@/components/FlexCarousel";
import MobileProjectCarousel from "@/components/MobileProjectCarousel";

const carouselItems: FlexCarouselItem[] = projects.flatMap((project) =>
  (project.media ?? []).flatMap((media) => {
    const src = media.type === "image" ? media.src : media.poster;

    if (!src) return [];

    return [
      {
        src,
        alt: media.alt ?? project.title,
        title: project.title,
        subtitle: media.type === "video" ? "Video preview" : "Featured work",
      },
    ];
  }),
);

export default function Projects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    router.push("/projects");
  }, [router]);

  return (
    <>
      {/* Navigation Loader */}
      {isNavigating && <Loader onComplete={handleLoaderComplete} />}

      <motion.section
        ref={sectionRef}
        id="projects"
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-4 md:mt-6"
      >
        <div
          className="
            relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-7xl
            rounded-2xl border border-[color:var(--border-soft-color)]
            bg-[color:var(--surface)]
            px-5 py-12
            shadow-2xl
            sm:px-8 sm:py-16
            md:px-12 md:py-20
            lg:px-16 lg:py-24
          "
        >
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[color:var(--text)] sm:text-5xl md:text-7xl lg:text-8xl">
              THINGS
            </h2>

            <h2 className="-mt-1 text-4xl font-black tracking-tight text-[color:var(--brand-accent)] sm:text-5xl md:-mt-2 md:text-7xl lg:text-8xl">
              I&apos;VE BUILT
            </h2>
          </div>

          {/* Featured Media Carousel */}
          <div className="mt-6 md:hidden">
            <MobileProjectCarousel items={carouselItems} />
          </div>

          <div className="mt-8 hidden md:block md:mt-12">
            <FlexCarousel
              items={carouselItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.58}
              gap={18}
              radius={14}
              fit="landscape"
              captions
              focusOnClick
              autoplay
              className="h-[480px] w-full lg:h-[540px]"
            />
          </div>

          {/* Navigate to All Projects */}
          <div className="mt-8 flex justify-stretch sm:justify-end md:mt-10">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => setIsNavigating(true)}
                disabled={isNavigating}
                className="
                  flex w-full items-center justify-center
                  rounded-lg bg-[color:var(--brand-accent)]
                  px-8 py-3 font-semibold text-white shadow-sm
                  transition-all duration-300
                  hover:bg-[color:var(--brand-accent-hover)]
                  hover:shadow-md
                  disabled:cursor-wait
                  sm:w-auto
                "
              >
                See More
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

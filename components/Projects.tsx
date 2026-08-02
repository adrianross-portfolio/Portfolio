"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { projects, type Project } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import ProjectDrawer from "./ProjectDrawer";

const featuredProjects = projects.slice(0, 3);

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const controls = useAnimation();

  // MODAL STATE
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // DRAWER STATE
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    controls.set({
      y: -50,
      opacity: 0,
    });

    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
  }, [isInView, controls]);

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="projects"
        animate={controls}
        className="mt-4 md:mt-6"
      >
        <motion.div
          animate={{
            scale: drawerOpen || selectedProject ? 0.97 : 1,
            opacity: drawerOpen || selectedProject ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 25,
          }}
          className="
            relative z-10
            min-h-auto
            lg:min-h-[calc(100vh-5rem)]
            max-w-7xl mx-auto
            rounded-2xl
            border border-[color:var(--border)]
            bg-[color:var(--surface)]
            backdrop-blur-md
            shadow-2xl
            px-5 sm:px-8 md:px-12
            py-12 sm:py-16 md:py-20
          "
        >
          {/* TITLE */}
          <div>
            <h2
              className="font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
              style={{ color: "var(--text)" }}
            >
              THINGS
            </h2>
            <h2 className="font-black text-[color:var(--accent)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl -mt-1 md:-mt-2">
              I&apos;VE BUILT
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-stretch sm:justify-end">
            <motion.button
              onClick={() => setDrawerOpen(true)}
              className="
                w-full sm:w-auto
                px-8 py-3
                rounded-lg
                font-semibold
                transition-all
                shadow-sm
                hover:shadow-md
              "
              style={{
                background: "var(--accent)",
                color: "var(--bg)", // ensures contrast in BOTH themes
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              See More
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* MODAL (ABOVE EVERYTHING) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* DRAWER (BEHIND MODAL WHEN BOTH OPEN) */}
      <div className={selectedProject ? "z-[40]" : "z-[60] relative"}>
        <ProjectDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          projects={projects}
          onOpen={(p) => setSelectedProject(p)}
        />
      </div>
    </>
  );
}

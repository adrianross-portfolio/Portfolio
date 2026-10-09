"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import { projects, type Project } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import ProjectDrawer from "./ProjectDrawer";

const featuredProjects = projects.slice(0, 3);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  // MODAL STATE
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // DRAWER STATE
  const [drawerOpen, setDrawerOpen] = useState(false);

  const overlayActive = drawerOpen || selectedProject !== null;

  return (
    <>
      {/* =====================================================
          PROJECTS SECTION
      ===================================================== */}

      <motion.section
        ref={sectionRef}
        id="projects"
        initial={{
          y: -50,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                y: 0,
                opacity: 1,
              }
            : {}
        }
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="mt-4 md:mt-6"
      >
        <motion.div
          animate={{
            scale: overlayActive ? 0.97 : 1,
            opacity: overlayActive ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 25,
          }}
          className="
            relative
            z-10
            mx-auto

            min-h-[calc(100vh-5rem)]
            max-w-7xl

            rounded-2xl
            border
            border-[color:var(--border-soft-color)]

            bg-[color:var(--surface)]

            px-5
            py-12

            sm:px-8
            sm:py-16

            md:px-12
            md:py-20

            lg:px-16
            lg:py-24

            shadow-2xl
          "
        >
          {/* =================================================
              TITLE
          ================================================= */}

          <div>
            <h2
              className="
                text-4xl
                font-black
                tracking-tight
                text-[color:var(--text)]

                sm:text-5xl
                md:text-7xl
                lg:text-8xl
              "
            >
              THINGS
            </h2>

            <h2
              className="
                -mt-1
                text-4xl
                font-black
                tracking-tight
                text-[color:var(--brand-accent)]

                sm:text-5xl
                md:-mt-2
                md:text-7xl
                lg:text-8xl
              "
            >
              I&apos;VE BUILT
            </h2>
          </div>

          {/* =================================================
              PROJECT GRID
          ================================================= */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5

              sm:grid-cols-2
              lg:grid-cols-3

              md:mt-14
            "
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={(project) => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* =================================================
              SEE MORE BUTTON
          ================================================= */}

          <div className="mt-8 flex justify-stretch sm:justify-end md:mt-10">
            <motion.button
              type="button"
              onClick={() => setDrawerOpen(true)}
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                w-full
                rounded-lg

                bg-[color:var(--brand-accent)]
                px-8
                py-3

                font-semibold
                text-white

                shadow-sm

                transition-all
                duration-300

                hover:bg-[color:var(--brand-accent-hover)]
                hover:shadow-md

                sm:w-auto
              "
            >
              See More
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* =====================================================
          PROJECT MODAL
      ===================================================== */}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* =====================================================
          PROJECT DRAWER
      ===================================================== */}

      <div className={selectedProject ? "relative z-[40]" : "relative z-[60]"}>
        <ProjectDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          projects={projects}
          onOpen={(project) => setSelectedProject(project)}
        />
      </div>
    </>
  );
}

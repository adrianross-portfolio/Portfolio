"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiMongodb,
  SiPayloadcms,
  SiPostgresql,
  SiGraphql,
  SiRedwoodjs,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiJquery,
  SiJavascript,
  SiDocker,
  SiSupabase,
} from "react-icons/si";

import type { Project } from "@/constants/projects";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

type Props = {
  project: Project | null;
  onClose: () => void;
};

/* =========================================================
   STACK ICONS
========================================================= */

const stackIcons: Record<string, ReactElement> = {
  "Next.js": <SiNextdotjs size={14} />,
  React: <SiReact size={14} />,
  TypeScript: <SiTypescript size={14} />,
  TailwindCSS: <SiTailwindcss size={14} />,
  "Framer Motion": <SiFramer size={14} />,
  "Node.js": <SiNodedotjs size={14} />,
  MongoDB: <SiMongodb size={14} />,
  PayloadCMS: <SiPayloadcms size={14} />,
  PostgreSQL: <SiPostgresql size={14} />,
  GraphQL: <SiGraphql size={14} />,
  RedwoodJS: <SiRedwoodjs size={14} />,
  Php: <SiPhp size={14} />,
  Laravel: <SiLaravel size={14} />,
  MySQL: <SiMysql size={14} />,
  Jquery: <SiJquery size={14} />,
  Javascript: <SiJavascript size={14} />,
  Docker: <SiDocker size={14} />,
  Supabase: <SiSupabase size={14} />,
};

export default function ProjectModal({ project, onClose }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  /* =========================================================
     LOCK BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    setCurrentImage(0);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && project.image?.length > 1) {
        setCurrentImage((prev) =>
          prev === 0 ? project.image.length - 1 : prev - 1,
        );
      }

      if (event.key === "ArrowRight" && project.image?.length > 1) {
        setCurrentImage((prev) =>
          prev === project.image.length - 1 ? 0 : prev + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* =================================================
              BACKDROP
          ================================================= */}

          <motion.div
            className="
              fixed
              inset-0
              z-[9998]

              h-full

              bg-black/50
              backdrop-blur-md
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
          />

          {/* =================================================
              STAGE
          ================================================= */}

          <motion.div
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-end
              justify-center

              sm:items-center

              p-0
              sm:p-4

              pt-[env(safe-area-inset-top)]
              pb-[env(safe-area-inset-bottom)]
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="
                absolute

                right-4
                top-[calc(env(safe-area-inset-top)+12px)]

                z-[100]

                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-black/60

                text-white

                shadow-lg
                backdrop-blur-md

                transition-all
                duration-200

                hover:bg-[color:var(--brand-accent)]
                hover:border-[color:var(--brand-accent)]

                active:scale-95
              "
            >
              <X size={22} />
            </button>

            {/* =================================================
                MODAL
            ================================================= */}

            <motion.div
              className="
                relative

                flex
                w-full
                flex-col

                overflow-hidden

                rounded-none

                border
                border-[color:var(--border-soft-color)]

                bg-[color:var(--surface)]

                shadow-2xl

                pt-16

                backdrop-blur-2xl

                h-[100dvh]

                sm:h-auto
                sm:min-h-[80vh]
                sm:max-h-[92vh]
                sm:w-[95vw]
                sm:max-w-5xl
                sm:rounded-3xl
                sm:pt-0

                transition-colors
                duration-300
              "
              initial={{
                scale: 0.96,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.96,
                opacity: 0,
              }}
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  flex-[0.45]
                  overflow-hidden

                  sm:flex-[0.55]
                "
              >
                {project.image?.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      draggable={false}
                      key={currentImage}
                      src={project.image[currentImage]}
                      alt={project.title}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                      initial={{
                        opacity: 0,
                        scale: 1.03,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    />
                  </AnimatePresence>
                )}

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                  "
                />

                {/* =================================================
                    PREVIOUS
                ================================================= */}

                {project.image?.length > 1 && (
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setCurrentImage(
                        currentImage === 0
                          ? project.image.length - 1
                          : currentImage - 1,
                      )
                    }
                    className="
                      absolute
                      left-2
                      top-1/2

                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      bg-black/30

                      text-white

                      backdrop-blur-md

                      transition-all
                      duration-200

                      hover:bg-[color:var(--brand-accent)]

                      sm:left-4
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* =================================================
                    NEXT
                ================================================= */}

                {project.image?.length > 1 && (
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setCurrentImage(
                        currentImage === project.image.length - 1
                          ? 0
                          : currentImage + 1,
                      )
                    }
                    className="
                      absolute
                      right-2
                      top-1/2

                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      bg-black/30

                      text-white

                      backdrop-blur-md

                      transition-all
                      duration-200

                      hover:bg-[color:var(--brand-accent)]

                      sm:right-4
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <ChevronRight size={18} />
                  </button>
                )}

                {/* =================================================
                    DOTS
                ================================================= */}

                {project.image?.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-3
                      left-1/2

                      flex
                      -translate-x-1/2
                      gap-2
                    "
                  >
                    {project.image.map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        aria-label={`Go to image ${index + 1}`}
                        onClick={() => setCurrentImage(index)}
                        className={`
                          h-2
                          rounded-full

                          transition-all
                          duration-200

                          ${
                            currentImage === index
                              ? "w-6 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/80"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div
                className="
                  flex-1
                  overflow-y-auto

                  p-4

                  sm:p-8
                "
              >
                {/* TITLE */}

                <h2
                  className="
                    text-xl
                    font-bold
                    tracking-tight

                    text-[color:var(--text)]

                    sm:text-3xl
                  "
                >
                  {project.title}
                </h2>

                {/* META */}

                <div
                  className="
                    mt-2

                    flex
                    gap-2

                    text-xs
                    text-[color:var(--text)]

                    sm:text-sm
                  "
                >
                  {project.date && <span>{project.date}</span>}

                  {project.date && project.jobType && <span>•</span>}

                  {project.jobType && <span>{project.jobType}</span>}
                </div>

                {/* =================================================
                    STACK
                ================================================= */}

                {project.stack?.length > 0 && (
                  <div
                    className="
                      mt-4

                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {project.stack.map((tech) => (
                      <div
                        key={tech}
                        className="
                          flex
                          items-center
                          gap-2

                          rounded-full

                          border
                          border-[color:var(--border-soft-color)]

                          bg-[color:var(--bg)]

                          px-3
                          py-1.5

                          text-xs
                          text-[color:var(--text)]

                          transition-all
                          duration-200

                          hover:border-[color:var(--brand-accent)]
                          hover:bg-[color:var(--brand-accent-soft)]
                          hover:text-[color:var(--brand-accent)]
                        "
                      >
                        {stackIcons[tech]}

                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-6

                    text-sm
                    leading-relaxed

                    text-[color:var(--text)]

                    sm:text-base
                  "
                >
                  {project.description}
                </p>

                {/* =================================================
                    LIVE URL
                ================================================= */}

                {project.liveUrl && (
                  <div className="mt-6">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2

                        rounded-xl

                        bg-[color:var(--brand-accent)]

                        px-4
                        py-2

                        font-medium
                        text-white

                        shadow-sm

                        transition-all
                        duration-200

                        hover:bg-[color:var(--brand-accent-hover)]
                        hover:scale-[1.02]

                        active:scale-[0.98]
                      "
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

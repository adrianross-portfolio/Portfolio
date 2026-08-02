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

  useEffect(() => {
    if (!project) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setCurrentImage(0);

    return () => {
      document.body.style.overflow = original;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft" && project.image?.length > 1) {
        setCurrentImage((prev) =>
          prev === 0 ? project.image.length - 1 : prev - 1,
        );
      }

      if (e.key === "ArrowRight" && project.image?.length > 1) {
        setCurrentImage((prev) =>
          prev === project.image.length - 1 ? 0 : prev + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[9998] h-full backdrop-blur-md bg-black/40 dark:bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* STAGE */}
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-end sm:items-center justify-center
              p-0 sm:p-4
              pt-[env(safe-area-inset-top)]
              pb-[env(safe-area-inset-bottom)]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="
                absolute
                top-[calc(env(safe-area-inset-top)+12px)]
                right-4
                z-[100]
                h-12 w-12
                flex items-center justify-center
                rounded-full
                bg-black/70 text-white
                backdrop-blur-md
                shadow-lg
              "
            >
              <X size={22} />
            </button>
            {/* MODAL */}
            <motion.div
              className="
                relative
                w-full sm:w-[95vw] sm:max-w-5xl
                h-[100dvh] sm:h-auto
                sm:min-h-[80vh] sm:max-h-[92vh]
                rounded-none sm:rounded-3xl
                overflow-hidden
                pt-16 sm:pt-0
                backdrop-blur-2xl
                shadow-2xl
                flex flex-col

                bg-white/90
                dark:bg-zinc-900/90

                border
                border-zinc-200
                dark:border-zinc-800

                transition-colors duration-300
              "
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              {/* IMAGE */}
              <div className="relative flex-[0.45] sm:flex-[0.55] overflow-hidden">
                {project.image?.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      draggable={false}
                      key={currentImage}
                      src={project.image[currentImage]}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                )}

                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                    dark:from-black/80
                    dark:via-black/30
                  "
                />

                {/* PREV */}
                {project.image?.length > 1 && (
                  <button
                    aria-label="Previous image"
                    onClick={() =>
                      setCurrentImage(
                        currentImage === 0
                          ? project.image.length - 1
                          : currentImage - 1,
                      )
                    }
                    className="
                      absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                      h-8 w-8 sm:h-10 sm:w-10
                      rounded-full
                      flex items-center justify-center
                      text-white
                      backdrop-blur-md
                      bg-white/15
                      hover:bg-white/25
                      transition-colors
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                {/* NEXT */}
                {project.image?.length > 1 && (
                  <button
                    aria-label="Next image"
                    onClick={() =>
                      setCurrentImage(
                        currentImage === project.image.length - 1
                          ? 0
                          : currentImage + 1,
                      )
                    }
                    className="
                      absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                      h-8 w-8 sm:h-10 sm:w-10
                      rounded-full
                      flex items-center justify-center
                      text-white
                      backdrop-blur-md
                      bg-white/15
                      hover:bg-white/25
                      transition-colors
                    "
                  >
                    <ChevronRight size={18} />
                  </button>
                )}

                {/* DOTS */}
                {project.image?.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.image.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentImage === index
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                <h2
                  className="
                    text-xl sm:text-3xl
                    font-bold
                    text-zinc-900
                    dark:text-white
                    transition-colors duration-300
                  "
                >
                  {project.title}
                </h2>

                <div
                  className="
                    mt-2
                    text-xs sm:text-sm
                    flex gap-2
                    text-zinc-500
                    dark:text-zinc-400
                    transition-colors duration-300
                  "
                >
                  <span>{project.date}</span>
                  <span>•</span>
                  <span>{project.jobType}</span>
                </div>

                {/* STACK */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack?.map((tech) => (
                    <div
                      key={tech}
                      className="
                        flex items-center gap-2
                        px-3 py-1.5
                        text-xs
                        rounded-full
                        border

                        transition-all duration-200

                        bg-zinc-100
                        border-zinc-200
                        text-zinc-700
                        hover:bg-zinc-200

                        dark:bg-zinc-800
                        dark:border-zinc-700
                        dark:text-zinc-200
                        dark:hover:bg-zinc-700
                      "
                    >
                      {stackIcons[tech]}
                      {tech}
                    </div>
                  ))}
                </div>

                <p
                  className="
                    mt-6
                    text-sm sm:text-base
                    leading-relaxed
                    text-zinc-600
                    dark:text-zinc-300
                    transition-colors duration-300
                  "
                >
                  {project.description}
                </p>

                {project.liveUrl && (
                  <div className="mt-6">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        text-white
                        bg-blue-600
                        hover:bg-blue-700
                        transition-all duration-200
                        hover:scale-[1.02]
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

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";

type Props = {
  open: boolean;
  onClose: () => void;
  projects: Project[];
  onOpen: (project: Project) => void;
};

const ITEMS_PER_PAGE = 6;

export default function ProjectDrawer({
  open,
  onClose,
  projects,
  onOpen,
}: Props) {
  const [page, setPage] = useState(0);

  /* =========================================================
     RESET PAGE
  ========================================================= */

  useEffect(() => {
    if (open) {
      setPage(0);
    }
  }, [open]);

  /* =========================================================
     LOCK BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /* =========================================================
     ESCAPE TO CLOSE
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, newPage)));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* =================================================
              BACKDROP
          ================================================= */}

          <motion.div
            className="
              fixed
              inset-0
              z-[999]

              bg-black/50
              backdrop-blur-sm
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
              DRAWER
          ================================================= */}

          <motion.div
            className="
              fixed
              left-1/2
              top-2
              z-[1000]

              flex
              h-[calc(100vh-1rem)]
              w-[95%]
              -translate-x-1/2
              flex-col

              overflow-hidden

              rounded-2xl

              border
              border-[color:var(--border-soft-color)]

              bg-[color:var(--surface)]

              shadow-2xl

              sm:top-4
              sm:h-[calc(100vh-2rem)]
              sm:w-[92%]

              md:max-w-6xl
            "
            initial={{
              y: "-100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "-100%",
            }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 20,
            }}
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                flex
                h-16
                shrink-0
                items-center
                justify-between

                border-b
                border-[color:var(--border-soft-color)]

                px-4

                sm:px-6
              "
            >
              {/* TITLE */}

              <div className="min-w-0">
                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-[color:var(--text)]

                    sm:text-2xl
                  "
                >
                  PROJECTS
                </h2>

                <p
                  className="
                    text-xs
                    text-[color:var(--muted)]

                    sm:text-sm
                  "
                >
                  Portfolio Showcase
                </p>
              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-2 sm:gap-3">
                {/* =================================================
                    PAGINATION
                ================================================= */}

                {totalPages > 1 && (
                  <div
                    className="
                      flex
                      items-center
                      gap-1

                      rounded-lg

                      border
                      border-[color:var(--border-soft-color)]

                      bg-[color:var(--bg)]

                      p-1
                    "
                  >
                    <button
                      type="button"
                      onClick={() => changePage(page - 1)}
                      disabled={page === 0}
                      className="
                        rounded-md

                        px-2.5
                        py-1

                        text-xs
                        font-medium
                        text-[color:var(--text)]

                        transition-colors
                        duration-200

                        hover:bg-[color:var(--brand-accent-soft)]
                        hover:text-[color:var(--brand-accent)]

                        disabled:cursor-not-allowed
                        disabled:opacity-30

                        sm:px-3
                        sm:text-sm
                      "
                    >
                      Prev
                    </button>

                    <span
                      className="
                        whitespace-nowrap
                        px-2

                        text-[10px]
                        font-medium
                        text-[color:var(--muted)]

                        sm:text-xs
                      "
                    >
                      {page + 1} / {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() => changePage(page + 1)}
                      disabled={page === totalPages - 1}
                      className="
                        rounded-md

                        px-2.5
                        py-1

                        text-xs
                        font-medium
                        text-[color:var(--text)]

                        transition-colors
                        duration-200

                        hover:bg-[color:var(--brand-accent-soft)]
                        hover:text-[color:var(--brand-accent)]

                        disabled:cursor-not-allowed
                        disabled:opacity-30

                        sm:px-3
                        sm:text-sm
                      "
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* =================================================
                    CLOSE
                ================================================= */}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close projects"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    rounded-lg

                    text-[color:var(--muted)]

                    transition-all
                    duration-200

                    hover:bg-[color:var(--brand-accent-soft)]
                    hover:text-[color:var(--brand-accent)]

                    active:scale-95
                  "
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* =================================================
                CAROUSEL BODY
            ================================================= */}

            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="flex h-full"
                animate={{
                  x: `-${page * 100}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                }}
              >
                {Array.from({
                  length: totalPages,
                }).map((_, index) => {
                  const pageProjects = projects.slice(
                    index * ITEMS_PER_PAGE,
                    index * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
                  );

                  return (
                    <div
                      key={index}
                      className="
                        flex
                        h-full
                        min-w-full
                        items-start
                        justify-center
                        overflow-y-auto

                        p-3

                        sm:p-6
                      "
                    >
                      <div
                        className="
                          grid
                          w-full

                          grid-cols-1
                          gap-4

                          sm:grid-cols-2
                          sm:gap-6

                          lg:grid-cols-3

                          content-start
                        "
                      >
                        {pageProjects.map((project) => (
                          <ProjectCard
                            key={project.title}
                            project={project}
                            onOpen={onOpen}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

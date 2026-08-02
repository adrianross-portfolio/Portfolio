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
  onOpen: (project: Project) => void; // ✅ ADD THIS
};

const ITEMS_PER_PAGE = 6;

export default function ProjectDrawer({
  open,
  onClose,
  projects,
  onOpen,
}: Props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (open) setPage(0);
  }, [open]);

  // lock scroll
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, newPage)));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* DRAWER */}
          <motion.div
            className="
              fixed
              top-2 sm:top-4
              left-1/2 -translate-x-1/2

              w-[95%] sm:w-[92%]
              h-[90vh] sm:h-[95vh]

              z-[1000]

              flex flex-col

              rounded-2xl

              min-h-0
              border border-[color:var(--border)]

              bg-[color:var(--bg)]
              dark:bg-black/40

              backdrop-blur-2xl

              shadow-2xl

              overflow-hidden
            "
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 20,
            }}
          >
            {/* HEADER */}
            <div
              className="
                h-16

                flex items-center justify-between

                px-4 sm:px-6

                border-b border-[color:var(--border)]

                shrink-0
              "
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[color:var(--text)]">
                  PROJECTS
                </h2>
                <p className="text-xs sm:text-sm text-[color:var(--muted)]">
                  Portfolio Showcase
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div
                    className="
                      flex items-center gap-1

                      px-2 py-1

                      rounded-lg

                      bg-white/10 dark:bg-white/5
                      backdrop-blur-md

                      border border-white/10 dark:border-white/10
                    "
                  >
                    <button
                      onClick={() => changePage(page - 1)}
                      disabled={page === 0}
                      className="
                        px-3 py-1

                        rounded-md

                        text-sm
                        text-[color:var(--text)]

                        hover:bg-white/20

                        transition

                        disabled:opacity-30
                        disabled:cursor-not-allowed
                      "
                    >
                      Prev
                    </button>

                    <span className="text-xs text-[color:var(--muted)] px-2 whitespace-nowrap">
                      {page + 1} / {totalPages}
                    </span>

                    <button
                      onClick={() => changePage(page + 1)}
                      disabled={page === totalPages - 1}
                      className="
                        px-3 py-1

                        rounded-md

                        text-sm
                        text-[color:var(--text)]

                        hover:bg-white/20

                        transition

                        disabled:opacity-30
                        disabled:cursor-not-allowed
                      "
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* CLOSE */}
                <button
                  onClick={onClose}
                  className="
                    p-2 rounded-lg

                    text-[color:var(--muted)]

                    hover:text-[color:var(--text)]
                    hover:bg-white/10

                    transition
                  "
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* CAROUSEL BODY */}
            <div className="flex-1 overflow-hidden relative">
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
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageProjects = projects.slice(
                    i * ITEMS_PER_PAGE,
                    i * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
                  );

                  return (
                    <div
                      key={i}
                      className="min-w-full h-full overflow-y-auto flex justify-center items-start p-3 sm:p-6"
                    >
                      <div
                        className="
                          w-full

                          grid
                          grid-cols-1
                          sm:grid-cols-2
                          lg:grid-cols-3

                          gap-4 sm:gap-6

                          content-start
                          auto-rows-max
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

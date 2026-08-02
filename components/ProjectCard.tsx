"use client";

import { motion } from "framer-motion";
import type { Project } from "@/constants/projects";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen?: (project: Project) => void;
}) {
  const clickable = !!project.hasModal;

  return (
    <motion.div
      layoutId={`project-${project.id ?? project.title}`}
      whileHover={clickable ? { scale: 1.02 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      onClick={() => {
        if (project.hasModal) {
          onOpen?.(project);
        }
      }}
      className={`
        group
        rounded-xl
        overflow-hidden
        border border-[color:var(--border)]
        bg-[color:var(--surface)]
        backdrop-blur-md
        transition-all duration-300
        ${clickable ? "cursor-pointer" : "cursor-default"}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-[color:var(--bg)]/40">
        {project.image.length > 0 ? (
          <>
            <img
              src={project.image[0]}
              alt={project.title}
              className={`
                w-full h-full
                object-cover
                transition-transform duration-300
                ${clickable ? "group-hover:scale-105" : ""}
              `}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Modal Badge */}
            {project.hasModal && (
              <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur">
                View Details
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[color:var(--muted)]">{project.title}</p>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-[color:var(--text)] line-clamp-1">
          {project.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[color:var(--muted)] line-clamp-3">
          {project.description}
        </p>

        {(project.date || project.jobType) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.date && (
              <span className="rounded-full px-2.5 py-1 text-[10px] sm:text-xs bg-[color:var(--bg)] text-[color:var(--muted)]">
                {project.date}
              </span>
            )}

            {project.jobType && (
              <span className="rounded-full px-2.5 py-1 text-[10px] sm:text-xs bg-[color:var(--bg)] text-[color:var(--muted)]">
                {project.jobType}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

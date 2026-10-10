"use client";

import { motion } from "framer-motion";
import Folder from "@/components/Folder";
import type { Project } from "@/constants/projects";

type ProjectCardProps = {
  project: Project;
  onOpen?: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const clickable = Boolean(onOpen);

  return (
    <motion.article
      layoutId={`project-${project.id ?? project.title}`}
      whileHover={clickable ? { y: -5 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      className="group flex h-full flex-col items-center"
    >
      <button
        type="button"
        disabled={!clickable}
        onClick={() => onOpen?.(project)}
        aria-label={`View ${project.title} project`}
        className="
          flex w-full flex-col items-center rounded-2xl p-6
          transition-colors duration-300
          hover:bg-[color:var(--surface)]
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[color:var(--brand-accent)]
          disabled:cursor-default
        "
      >
        <Folder color="#f97316" size={1.15} className="mb-12" />

        <div className="w-full border-t border-[color:var(--border-soft-color)] pt-5 text-center">
          <h3 className="text-xl font-semibold tracking-tight text-[color:var(--text)] transition-colors duration-300 group-hover:text-[color:var(--brand-accent)] sm:text-2xl">
            {project.title}
          </h3>
        </div>
      </button>
    </motion.article>
  );
}

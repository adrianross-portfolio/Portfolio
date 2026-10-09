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
  const clickable = Boolean(project.hasModal);

  return (
    <motion.div
      layoutId={`project-${project.id ?? project.title}`}
      whileHover={
        clickable
          ? {
              y: -5,
              scale: 1.015,
            }
          : undefined
      }
      whileTap={
        clickable
          ? {
              scale: 0.98,
            }
          : undefined
      }
      onClick={() => {
        if (project.hasModal) {
          onOpen?.(project);
        }
      }}
      className={`
        group
        overflow-hidden
        rounded-xl

        border
        border-[color:var(--border-soft-color)]

        bg-[color:var(--surface)]

        shadow-sm

        transition-all
        duration-300

        hover:border-[color:var(--brand-accent)]

        ${clickable ? "cursor-pointer hover:shadow-xl" : "cursor-default"}
      `}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          h-40
          overflow-hidden
          bg-[color:var(--bg)]

          sm:h-48
          md:h-52
        "
      >
        {project.image.length > 0 ? (
          <>
            {/* IMAGE */}

            <img
              src={project.image[0]}
              alt={project.title}
              className={`
                h-full
                w-full
                object-cover

                transition-transform
                duration-500
                ease-out

                ${clickable ? "group-hover:scale-105" : ""}
              `}
            />

            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-black/40
                via-black/5
                to-transparent

                opacity-70

                transition-opacity
                duration-300

                group-hover:opacity-90
              "
            />

            {/* VIEW DETAILS BADGE */}

            {project.hasModal && (
              <div
                className="
                  absolute
                  right-3
                  top-3

                  rounded-full

                  border
                  border-white/20

                  bg-black/60

                  px-2.5
                  py-1

                  text-[10px]
                  font-medium
                  tracking-wide
                  text-white

                  shadow-sm

                  backdrop-blur-sm

                  transition-all
                  duration-300

                  group-hover:bg-[color:var(--brand-accent)]
                  group-hover:border-[color:var(--brand-accent)]
                "
              >
                View Details
              </div>
            )}
          </>
        ) : (
          /* EMPTY IMAGE */

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              px-4
            "
          >
            <p
              className="
                text-center
                text-sm
                font-medium
                text-[color:var(--text)]
              "
            >
              {project.title}
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-4 sm:p-5">
        {/* TITLE */}

        <h3
          className="
            line-clamp-1

            text-base
            font-semibold
            tracking-tight
            text-[color:var(--text)]

            transition-colors
            duration-300

            group-hover:text-[color:var(--brand-accent)]

            sm:text-lg
          "
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            line-clamp-3

            text-xs
            leading-relaxed
            text-[color:var(--text)]

            sm:text-sm
          "
        >
          {project.description}
        </p>

        {/* =================================================
            META
        ================================================= */}

        {(project.date || project.jobType) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.date && (
              <span
                className="
                  rounded-full

                  border
                  border-[color:var(--border-soft-color)]

                  bg-[color:var(--bg)]

                  px-2.5
                  py-1

                  text-[10px]
                  font-medium
                  text-[color:var(--text)]

                  transition-colors
                  duration-300

                  group-hover:border-[color:var(--brand-accent-soft)]
                "
              >
                {project.date}
              </span>
            )}

            {project.jobType && (
              <span
                className="
                  rounded-full

                  border
                  border-[color:var(--border-soft-color)]

                  bg-[color:var(--bg)]

                  px-2.5
                  py-1

                  text-[10px]
                  font-medium
                  text-[color:var(--text)]

                  transition-colors
                  duration-300

                  group-hover:border-[color:var(--brand-accent-soft)]
                "
              >
                {project.jobType}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

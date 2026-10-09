"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Play, Image as ImageIcon, Film } from "lucide-react";

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

import type { Project, ProjectMedia } from "@/constants/projects";
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
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);

  const media: ProjectMedia[] = !project
    ? []
    : project.media?.length
      ? project.media
      : (project.image ?? []).map((src, index) => ({
          type: "image" as const,
          src,
          alt: `${project.title} preview ${index + 1}`,
        }));

  // Lock body scroll while the project drawer is open.
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSelectedMedia(null);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  // Escape closes the media preview first, then the project drawer.
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedMedia) {
          setSelectedMedia(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, selectedMedia, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] h-[100dvh] w-screen bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Project drawer */}
          <motion.div
            className="
              fixed
              inset-x-1
              top-1
              z-[9999]
              flex
              h-[calc(100dvh-0.5rem)]
              flex-col
              overflow-hidden
              sm:inset-x-2
              sm:top-2
              sm:h-[calc(100dvh-1rem)]
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
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="
                relative
                flex
                h-full
                min-h-0
                w-full
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-[color:var(--border-soft-color)]
                bg-[color:var(--surface)]
                shadow-2xl
              "
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Header */}
              <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[color:var(--border-soft-color)] px-5 py-5 sm:px-6">
                <div className="min-w-0">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent)]">
                    Project Showcase
                  </p>

                  <h2
                    id="project-modal-title"
                    className="text-2xl font-bold tracking-tight text-[color:var(--text)] sm:text-3xl"
                  >
                    {project.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-[color:var(--muted)] sm:text-sm">
                    {project.date && <span>{project.date}</span>}
                    {project.date && project.jobType && <span>·</span>}
                    {project.jobType && <span>{project.jobType}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close project"
                  onClick={onClose}
                  className="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-lg
                    border border-[color:var(--border-soft-color)]
                    text-[color:var(--muted)]
                    transition-colors
                    hover:border-[color:var(--brand-accent)]
                    hover:bg-[color:var(--brand-accent-soft)]
                    hover:text-[color:var(--brand-accent)]
                    active:scale-95
                  "
                >
                  <X size={20} />
                </button>
              </header>

              {/* Scrollable content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 lg:p-8">
                {/* Media gallery */}
                <section>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[color:var(--text)] sm:text-base">
                        Project Files
                      </h3>
                      <p className="mt-1 text-xs text-[color:var(--muted)]">
                        Select an item to preview
                      </p>
                    </div>

                    <span className="rounded-full border border-[color:var(--border-soft-color)] px-3 py-1 text-xs text-[color:var(--muted)]">
                      {media.length} {media.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {media.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {media.map((item, index) => (
                        <motion.button
                          key={`${item.src}-${index}`}
                          type="button"
                          onClick={() => setSelectedMedia(item)}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.99 }}
                          className="
                            group overflow-hidden rounded-xl
                            border border-[color:var(--border-soft-color)]
                            bg-[color:var(--bg)] text-left
                            transition-colors
                            hover:border-[color:var(--brand-accent)]
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-[color:var(--brand-accent)]
                          "
                          aria-label={`Preview ${item.alt || `${project.title} file ${index + 1}`}`}
                        >
                          <div className="relative aspect-video overflow-hidden">
                            {item.type === "video" ? (
                              <video
                                src={item.src}
                                poster={item.poster}
                                preload="metadata"
                                muted
                                playsInline
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <img
                                src={item.src}
                                alt={
                                  item.alt ||
                                  `${project.title} preview ${index + 1}`
                                }
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            )}

                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                              <span className="flex size-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                {item.type === "video" ? (
                                  <Play size={19} fill="currentColor" />
                                ) : (
                                  <ImageIcon size={19} />
                                )}
                              </span>
                            </div>

                            <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                              {item.type === "video" ? (
                                <Film size={12} />
                              ) : (
                                <ImageIcon size={12} />
                              )}
                              {item.type}
                            </span>
                          </div>

                          <div className="p-3">
                            <p className="truncate text-xs font-medium text-[color:var(--text)]">
                              {item.alt || `Project file ${index + 1}`}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-[color:var(--border-soft-color)] text-center">
                      <ImageIcon
                        size={28}
                        className="text-[color:var(--muted)]"
                      />
                      <p className="mt-3 text-sm text-[color:var(--muted)]">
                        No project media added yet.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </motion.section>
          </motion.div>

          {/* Full-size media preview */}
          <AnimatePresence>
            {selectedMedia && (
              <motion.div
                className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMedia(null)}
              >
                <button
                  type="button"
                  aria-label="Close media preview"
                  onClick={() => setSelectedMedia(null)}
                  className="
                    absolute right-4 top-4 z-10 flex size-11 items-center
                    justify-center rounded-full border border-white/15
                    bg-black/50 text-white transition-colors
                    hover:bg-[color:var(--brand-accent)]
                  "
                >
                  <X size={22} />
                </button>

                <motion.div
                  className="flex max-h-full max-w-full items-center justify-center"
                  initial={{ scale: 0.96, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 8 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  {selectedMedia.type === "video" ? (
                    <video
                      key={selectedMedia.src}
                      src={selectedMedia.src}
                      poster={selectedMedia.poster}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[85dvh] max-w-full rounded-xl"
                    />
                  ) : (
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.alt || project.title}
                      className="max-h-[85dvh] max-w-full rounded-xl object-contain"
                    />
                  )}
                </motion.div>

                {selectedMedia.alt && (
                  <p className="absolute bottom-5 left-4 right-4 text-center text-sm text-white/75">
                    {selectedMedia.alt}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

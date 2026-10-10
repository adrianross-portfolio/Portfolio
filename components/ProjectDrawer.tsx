"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  BriefcaseBusiness,
  Maximize2,
  X,
} from "lucide-react";

import type { Project, ProjectMedia } from "@/constants/projects";

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

const MEDIA_PAGE_SIZE_OPTIONS = [10, 20, 100];

export default function ProjectDrawer({ open, onClose, project }: Props) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [mediaPageSize, setMediaPageSize] = useState(10);
  const [mediaPage, setMediaPage] = useState(1);

  const media = project?.media ?? [];
  const lightboxOpen = activeMediaIndex !== null;
  const activeMedia =
    activeMediaIndex !== null ? media[activeMediaIndex] : null;

  // Media pagination
  const totalMediaPages = Math.max(1, Math.ceil(media.length / mediaPageSize));

  const startMediaIndex = (mediaPage - 1) * mediaPageSize;

  const visibleMedia = media.slice(
    startMediaIndex,
    startMediaIndex + mediaPageSize,
  );

  const firstMediaItem = media.length === 0 ? 0 : startMediaIndex + 1;

  const lastMediaItem = Math.min(startMediaIndex + mediaPageSize, media.length);

  const visiblePageNumbers = Array.from(
    { length: Math.min(5, totalMediaPages) },
    (_, index) => {
      const startPage = Math.max(
        1,
        Math.min(mediaPage - 2, totalMediaPages - 4),
      );

      return startPage + index;
    },
  );

  const closeLightbox = useCallback(() => {
    setActiveMediaIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    if (activeMediaIndex === null || media.length <= 1) return;

    setActiveMediaIndex((activeMediaIndex - 1 + media.length) % media.length);
  }, [activeMediaIndex, media.length]);

  const showNext = useCallback(() => {
    if (activeMediaIndex === null || media.length <= 1) return;

    setActiveMediaIndex((activeMediaIndex + 1) % media.length);
  }, [activeMediaIndex, media.length]);

  // Reset pagination and lightbox when switching projects or closing the drawer.
  useEffect(() => {
    setMediaPage(1);
    setMediaPageSize(10);
    setActiveMediaIndex(null);
  }, [project?.id, open]);

  // Keep the drawer scroll behavior and body scroll lock unchanged.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Keyboard controls for the drawer and full-screen lightbox.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxOpen) {
          event.stopPropagation();
          closeLightbox();
        } else {
          onClose();
        }

        return;
      }

      if (!lightboxOpen) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, lightboxOpen, closeLightbox, onClose, showPrevious, showNext]);

  if (!project) {
    return <AnimatePresence>{null}</AnimatePresence>;
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Drawer Backdrop */}
            <motion.button
              type="button"
              aria-label="Close project details"
              className="fixed inset-0 z-[999] cursor-default bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Project Details Drawer */}
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} project details`}
              className="
                fixed left-1/2 top-1/2 z-[1000]
                flex h-[calc(100dvh-12px)] w-[calc(100%-12px)]
                -translate-x-1/2 -translate-y-1/2
                flex-col overflow-hidden
                rounded-xl border border-[color:var(--border-soft-color)]
                bg-[color:var(--surface)] shadow-2xl
                sm:h-[calc(100dvh-24px)] sm:w-[calc(100%-24px)] sm:rounded-2xl
                lg:h-[96dvh] lg:w-[96vw] lg:max-w-[1600px]
              "
              initial={{ y: "100%", opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 24,
              }}
            >
              {/* Header */}
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[color:var(--border-soft-color)] px-4 py-3 sm:px-6 lg:px-8">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent)] sm:text-xs">
                    Project Details
                  </p>

                  <h2 className="truncate text-lg font-black tracking-tight text-[color:var(--text)] sm:text-2xl">
                    {project.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[color:var(--muted)] transition-colors hover:bg-[color:var(--brand-accent-soft)] hover:text-[color:var(--brand-accent)]"
                >
                  <X size={22} />
                </button>
              </header>

              {/* Scrollable Details */}
              <div
                data-project-scroll
                className="
                  relative min-h-0 flex-1
                  overflow-x-hidden overflow-y-auto
                  overscroll-y-auto
                  [touch-action:pan-y]
                "
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarGutter: "stable",
                }}
                onWheel={(event) => event.stopPropagation()}
              >
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
                  {/* Project Intro */}
                  <div className="mb-8 grid gap-6 lg:mb-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        Selected Work
                      </p>

                      <h1 className="text-3xl font-black leading-tight tracking-tight text-[color:var(--text)] sm:text-4xl lg:text-6xl">
                        {project.title}
                      </h1>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--secondary)] sm:text-base sm:leading-8">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      {project.date && (
                        <div className="flex items-start gap-3 rounded-xl border border-[color:var(--border-soft-color)] p-4">
                          <CalendarDays
                            size={18}
                            className="mt-0.5 shrink-0 text-[color:var(--brand-accent)]"
                          />

                          <div>
                            <p className="text-xs text-[color:var(--muted)]">
                              Date
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                              {project.date}
                            </p>
                          </div>
                        </div>
                      )}

                      {project.jobType && (
                        <div className="flex items-start gap-3 rounded-xl border border-[color:var(--border-soft-color)] p-4">
                          <BriefcaseBusiness
                            size={18}
                            className="mt-0.5 shrink-0 text-[color:var(--brand-accent)]"
                          />

                          <div>
                            <p className="text-xs text-[color:var(--muted)]">
                              Project Type
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                              {project.jobType}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Media Gallery with Pagination */}
                  {media.length > 0 && (
                    <section className="mb-10 sm:mb-14">
                      {/* Gallery Header and Page Size Selector */}
                      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[color:var(--text)] sm:text-xl">
                            Project Preview
                          </h3>

                          <p
                            className="mt-1 text-sm text-[color:var(--secondary)]"
                            aria-live="polite"
                          >
                            Showing {firstMediaItem}–{lastMediaItem} of{" "}
                            {media.length}{" "}
                            {media.length === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="media-page-size"
                            className="whitespace-nowrap text-sm text-[color:var(--secondary)]"
                          >
                            Show:
                          </label>

                          <select
                            id="media-page-size"
                            value={mediaPageSize}
                            onChange={(event) => {
                              setMediaPageSize(Number(event.target.value));
                              setMediaPage(1);
                            }}
                            className="
                              rounded-lg border border-[color:var(--border-soft-color)]
                              bg-[color:var(--surface)] px-3 py-2
                              text-sm font-medium text-[color:var(--text)]
                              outline-none transition-colors
                              focus:border-[color:var(--brand-accent)]
                            "
                          >
                            {MEDIA_PAGE_SIZE_OPTIONS.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>

                          <span className="whitespace-nowrap text-sm text-[color:var(--secondary)]">
                            per page
                          </span>
                        </div>
                      </div>

                      {/* Media Grid */}
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {visibleMedia.map((item, visibleIndex) => {
                          const index = startMediaIndex + visibleIndex;

                          return (
                            <MediaCard
                              key={`${item.src}-${index}`}
                              item={item}
                              index={index}
                              projectTitle={project.title}
                              onOpen={() => setActiveMediaIndex(index)}
                            />
                          );
                        })}
                      </div>

                      {/* Pagination Controls */}
                      {totalMediaPages > 1 && (
                        <nav
                          aria-label="Media gallery pagination"
                          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border-soft-color)] pt-5 sm:flex-row"
                        >
                          <p className="text-sm text-[color:var(--secondary)]">
                            Page{" "}
                            <span className="font-semibold text-[color:var(--text)]">
                              {mediaPage}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-[color:var(--text)]">
                              {totalMediaPages}
                            </span>
                          </p>

                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setMediaPage((page) => Math.max(1, page - 1))
                              }
                              disabled={mediaPage === 1}
                              aria-label="Go to previous media page"
                              className="
                                flex h-10 items-center gap-2 rounded-lg
                                border border-[color:var(--border-soft-color)]
                                px-3 text-sm font-medium text-[color:var(--text)]
                                transition-colors hover:border-[color:var(--brand-accent)]
                                disabled:pointer-events-none disabled:opacity-35
                              "
                            >
                              <ArrowLeft size={16} />
                              Previous
                            </button>

                            {visiblePageNumbers.map((page) => (
                              <button
                                key={page}
                                type="button"
                                onClick={() => setMediaPage(page)}
                                aria-label={`Go to media page ${page}`}
                                aria-current={
                                  mediaPage === page ? "page" : undefined
                                }
                                className={`
                                  flex h-10 min-w-10 items-center justify-center
                                  rounded-lg border px-3 text-sm font-semibold
                                  transition-colors
                                  ${
                                    mediaPage === page
                                      ? "border-[color:var(--brand-accent)] bg-[color:var(--brand-accent)] text-white"
                                      : "border-[color:var(--border-soft-color)] text-[color:var(--text)] hover:border-[color:var(--brand-accent)] hover:text-[color:var(--brand-accent)]"
                                  }
                                `}
                              >
                                {page}
                              </button>
                            ))}

                            <button
                              type="button"
                              onClick={() =>
                                setMediaPage((page) =>
                                  Math.min(totalMediaPages, page + 1),
                                )
                              }
                              disabled={mediaPage === totalMediaPages}
                              aria-label="Go to next media page"
                              className="
                                flex h-10 items-center gap-2 rounded-lg
                                border border-[color:var(--border-soft-color)]
                                px-3 text-sm font-medium text-[color:var(--text)]
                                transition-colors hover:border-[color:var(--brand-accent)]
                                disabled:pointer-events-none disabled:opacity-35
                              "
                            >
                              Next
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </nav>
                      )}
                    </section>
                  )}

                  {/* Overview */}
                  <section className="mb-10 grid gap-6 border-t border-[color:var(--border-soft-color)] pt-8 sm:mb-14 sm:pt-10 lg:grid-cols-[1fr_2fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-accent)]">
                        01 / Overview
                      </p>

                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--text)] sm:text-3xl">
                        About the project
                      </h3>
                    </div>

                    <p className="text-sm leading-7 text-[color:var(--secondary)] sm:text-base sm:leading-8">
                      {project.description}
                    </p>
                  </section>

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <section className="border-t border-[color:var(--border-soft-color)] pt-8 sm:pt-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-accent)]">
                        02 / Highlights
                      </p>

                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--text)] sm:text-3xl">
                        Key Features
                      </h3>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {project.features.map((feature, index) => (
                          <div
                            key={`${feature}-${index}`}
                            className="rounded-xl border border-[color:var(--border-soft-color)] p-4 sm:p-5"
                          >
                            <span className="text-xs font-semibold text-[color:var(--brand-accent)]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <p className="mt-3 text-sm leading-6 text-[color:var(--text)]">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Tech Stack */}
                  {project.stack && project.stack.length > 0 && (
                    <section className="mt-10 border-t border-[color:var(--border-soft-color)] pt-8 sm:mt-14 sm:pt-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-accent)]">
                        03 / Technologies
                      </p>

                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--text)] sm:text-3xl">
                        Tech Stack
                      </h3>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-[color:var(--border-soft-color)] px-3 py-2 text-sm font-medium text-[color:var(--text)]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Live Project */}
                  {project.liveUrl && (
                    <section className="mt-10 border-t border-[color:var(--border-soft-color)] pt-8 sm:mt-14 sm:pt-10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[color:var(--brand-accent-hover)] sm:w-auto"
                      >
                        Visit Live Project
                        <ArrowUpRight size={18} />
                      </a>
                    </section>
                  )}
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      {/* Full-screen Media Lightbox */}
      <AnimatePresence>
        {open && lightboxOpen && activeMedia && (
          <motion.div
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Full-screen media preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Top Controls */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-7 sm:py-6">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  {project.title}
                </p>

                <p className="mt-1 text-xs text-white/50">
                  {(activeMediaIndex ?? 0) + 1} / {media.length}
                  {" · "}
                  {activeMedia.type === "video" ? "Video" : "Image"}
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}
                aria-label="Close media preview"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={22} />
              </button>
            </div>

            {/* Previous Media */}
            {media.length > 1 && (
              <button
                type="button"
                aria-label="Previous media"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:bg-white/15 sm:left-6 sm:h-12 sm:w-12"
              >
                <ArrowLeft size={22} />
              </button>
            )}

            {/* Active Media */}
            <motion.div
              key={`${activeMedia.src}-${activeMediaIndex}`}
              className="flex h-full w-full items-center justify-center pt-14 pb-12 sm:pt-16"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
            >
              {activeMedia.type === "video" ? (
                <video
                  key={activeMedia.src}
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="max-h-full max-w-full rounded-lg object-contain"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt ?? `${project.title} media preview`}
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              )}
            </motion.div>

            {/* Next Media */}
            {media.length > 1 && (
              <button
                type="button"
                aria-label="Next media"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:bg-white/15 sm:right-6 sm:h-12 sm:w-12"
              >
                <ArrowRight size={22} />
              </button>
            )}

            {/* Bottom Caption */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center px-16 py-4">
              <p className="max-w-2xl truncate text-center text-xs text-white/60 sm:text-sm">
                {activeMedia.alt ??
                  `${project.title} — ${(activeMediaIndex ?? 0) + 1}`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type MediaCardProps = {
  item: ProjectMedia;
  index: number;
  projectTitle: string;
  onOpen: () => void;
};

function MediaCard({ item, index, projectTitle, onOpen }: MediaCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[color:var(--border-soft-color)] bg-[color:var(--bg)]">
      <div className="relative">
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            className="aspect-[4/3] w-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${item.alt ?? `${projectTitle} image ${index + 1}`} full screen`}
            className="relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[color:var(--brand-accent)]"
          >
            <img
              src={item.src}
              alt={item.alt ?? `${projectTitle} preview ${index + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 size={18} />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[color:var(--border-soft-color)] px-4 py-3">
        <p className="truncate text-xs text-[color:var(--muted)]">
          {item.alt ??
            (item.type === "video"
              ? `Video ${index + 1}`
              : `Preview ${index + 1}`)}
        </p>

        {item.type === "image" && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Enlarge image ${index + 1}`}
            className="shrink-0 text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
          >
            <Maximize2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

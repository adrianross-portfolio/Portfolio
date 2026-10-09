"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Film,
  Image as ImageIcon,
  X,
} from "lucide-react";
import type { Project, ProjectMedia } from "@/constants/projects";

type Props = {
  project: Project;
};

export default function ProjectDetails({ project }: Props) {
  const media: ProjectMedia[] = project.media?.length
    ? project.media
    : (project.image ?? []).map((src, index) => ({
        type: "image" as const,
        src,
        alt: `${project.title} preview ${index + 1}`,
      }));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closePreview = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + media.length) % media.length,
    );
  }, [media.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % media.length,
    );
  }, [media.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, closePreview, showPrevious, showNext]);

  const selectedMedia = selectedIndex === null ? null : media[selectedIndex];

  return (
    <main className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Projects
        </Link>

        {/* Project heading */}
        <header className="mb-12 border-b border-[color:var(--border-soft-color)] pb-8 sm:mb-16 sm:pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-accent)]">
            Project Showcase
          </p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
                {project.description}
              </p>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[color:var(--border-soft-color)] px-5 py-3 text-sm font-medium transition-colors hover:border-[color:var(--brand-accent)] hover:text-[color:var(--brand-accent)]"
              >
                Visit live site
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            {project.date && (
              <div>
                <p className="mb-1 text-xs text-[color:var(--muted)]">
                  Timeline
                </p>
                <p>{project.date}</p>
              </div>
            )}

            {project.jobType && (
              <div>
                <p className="mb-1 text-xs text-[color:var(--muted)]">
                  Engagement
                </p>
                <p>{project.jobType}</p>
              </div>
            )}

            <div>
              <p className="mb-1 text-xs text-[color:var(--muted)]">Gallery</p>
              <p>
                {media.length} {media.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </header>

        {/* Project information */}
        {project.stack?.length || project.features?.length ? (
          <section className="mb-14 grid gap-10 border-b border-[color:var(--border-soft-color)] pb-12 md:grid-cols-2">
            {project.stack && project.stack.length > 0 && (
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[color:var(--border-soft-color)] px-3 py-1.5 text-xs text-[color:var(--muted)]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Highlights
                </h2>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm leading-6 text-[color:var(--muted)]"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ) : null}

        {/* Gallery */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Visual Archive
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Project Gallery
              </h2>
            </div>
            <span className="pb-1 text-xs text-[color:var(--muted)]">
              Click to preview
            </span>
          </div>

          {media.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {media.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Preview ${item.alt || `${project.title} item ${index + 1}`}`}
                  className="group overflow-hidden rounded-xl border border-[color:var(--border-soft-color)] bg-[color:var(--surface)] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--brand-accent)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
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
                        alt={item.alt || `${project.title} image ${index + 1}`}
                        loading={index < 6 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                      <span className="flex size-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        {item.type === "video" ? (
                          <Film size={18} />
                        ) : (
                          <ImageIcon size={18} />
                        )}
                      </span>
                    </div>

                    <span className="absolute bottom-3 left-3 rounded-md bg-black/65 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3.5">
                    <span className="truncate text-xs font-medium">
                      {item.alt || `Image ${index + 1}`}
                    </span>
                    <span className="shrink-0 text-xs text-[color:var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[color:var(--border-soft-color)] py-20 text-center text-sm text-[color:var(--muted)]">
              No project media available yet.
            </div>
          )}
        </section>

        {/* Bottom navigation */}
        <div className="mt-16 border-t border-[color:var(--border-soft-color)] pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </div>
      </div>

      {/* Full-screen media preview */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
          onClick={closePreview}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={closePreview}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/15"
          >
            <X size={22} />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous media"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/15 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                aria-label="Next media"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/15 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="flex max-h-full max-w-full flex-col items-center justify-center gap-4"
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
                className="max-h-[80dvh] max-w-full rounded-lg"
              />
            ) : (
              <img
                key={selectedMedia.src}
                src={selectedMedia.src}
                alt={selectedMedia.alt || project.title}
                className="max-h-[80dvh] max-w-full rounded-lg object-contain"
              />
            )}

            <p className="text-center text-sm text-white/70">
              {selectedMedia.alt || project.title}
              <span className="ml-3 text-white/40">
                {selectedIndex! + 1} / {media.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

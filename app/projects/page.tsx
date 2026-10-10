"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, House } from "lucide-react";

import { projects, type Project } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectDrawer from "@/components/ProjectDrawer";

export default function AllProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const drawerOpen = selectedProject !== null;

  return (
    <>
      <main className="min-h-screen bg-[color:var(--bg)] p-3 text-[color:var(--text)] sm:p-5 lg:p-8">
        {/* Floating Container */}
        <div
          className="
            mx-auto min-h-[calc(100vh-24px)] max-w-[1800px]
            overflow-hidden rounded-2xl
            border border-[color:var(--border)]
            bg-[color:var(--surface)]
            sm:min-h-[calc(100vh-40px)] sm:rounded-3xl
            lg:min-h-[calc(100vh-64px)]
          "
        >
          {/* Minimal Header */}
          <header className="border-b border-[color:var(--border)] px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="
                  inline-flex items-center gap-2
                  text-sm font-medium text-[color:var(--secondary)]
                  transition-colors hover:text-[color:var(--text)]
                "
              >
                <House size={30} strokeWidth={1.8} />
              </Link>

              <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)] sm:block">
                Portfolio / Selected Work
              </span>
            </div>
          </header>

          {/* Main Content */}
          <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            {/* Page Heading */}
            <section className="mb-10 sm:mb-14 lg:mb-16">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-accent)]">
                    A closer look at my work
                  </p>

                  <h1 className="text-4xl font-black tracking-[-0.05em] text-[color:var(--text)] sm:text-5xl md:text-6xl lg:text-7xl">
                    All Projects
                    <span className="text-[color:var(--brand-accent)]">.</span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--secondary)] sm:text-base sm:leading-8">
                    A collection of websites and digital experiences focused on
                    frontend development, full-stack functionality, and
                    WordPress solutions.
                  </p>
                </div>

                {/* Project Count */}
                <div className="flex shrink-0 items-center gap-3 md:pb-1">
                  <span className="text-3xl font-semibold tracking-tight text-[color:var(--text)]">
                    {String(projects.length).padStart(2, "0")}
                  </span>

                  <span className="max-w-16 text-xs leading-5 text-[color:var(--muted)]">
                    Projects in portfolio
                  </span>
                </div>
              </div>
            </section>

            {/* Subtle Section Divider */}
            <div className="mb-6 flex items-center justify-between border-t border-[color:var(--border)] pt-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
                Browse the collection
              </p>

              <span className="flex items-center gap-1 text-xs text-[color:var(--muted)]">
                Explore projects
                <ArrowUpRight size={14} />
              </span>
            </div>

            {/* All Projects Grid */}
            <section
              aria-label="All projects"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={setSelectedProject}
                />
              ))}
            </section>

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <p className="text-base font-medium text-[color:var(--text)]">
                  Nothing to show just yet.
                </p>

                <p className="mt-2 text-sm text-[color:var(--secondary)]">
                  Projects will be added here soon.
                </p>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-16 flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 text-xs text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>Selected work & digital experiences.</p>
              <Link
                href="/"
                className="w-fit transition-colors hover:text-[color:var(--text)]"
              >
                Return home ↗
              </Link>
            </footer>
          </div>
        </div>
      </main>

      {/* Project Drawer */}
      <div className={drawerOpen ? "relative z-[60]" : ""}>
        <ProjectDrawer
          open={selectedProject !== null}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </>
  );
}

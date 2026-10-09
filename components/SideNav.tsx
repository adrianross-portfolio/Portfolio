"use client";

import { Home, User, Folder, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  { icon: Home, id: "about", label: "About" },
  { icon: User, id: "skills", label: "Skills" },
  { icon: Folder, id: "projects", label: "Projects" },
  { icon: Mail, id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [active, setActive] = useState("about");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(element, {
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        offset: -10,
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "contact"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestSection: {
          id: string;
          ratio: number;
        } | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;

          if (!bestSection || entry.intersectionRatio > bestSection.ratio) {
            bestSection = {
              id: section.id,
              ratio: entry.intersectionRatio,
            };
          }
        }

        if (bestSection) {
          setActive(bestSection.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <nav
        aria-label="Main navigation"
        className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2

          md:sticky
          md:top-4
          md:left-auto
          md:translate-x-0

          z-50

          w-auto
          max-w-full

          flex
          items-center
          justify-center
          gap-1
          sm:gap-2

          px-2
          py-2

          rounded-2xl

          bg-[color:var(--surface)]/90
          backdrop-blur-xl

          border
          border-[color:var(--border)]

          shadow-[0_10px_40px_rgba(0,0,0,0.12)]

          transition-all
          duration-300
        "
      >
        {items.map(({ icon: Icon, id, label }) => {
          const isActive = active === id;

          return (
            <div
              key={id}
              className="
                relative
                flex
                items-center
                justify-center
              "
            >
              {/* ACTIVE BACKGROUND */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-xl

                    border


                    dark:border-transparent

                    bg-[color:var(--brand-accent)]/10
                    dark:bg-[color:var(--brand-accent)]/15
                  "
                />
              )}

              {/* NAV BUTTON */}
              <motion.button
                type="button"
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => scrollTo(id)}
                whileHover={{
                  scale: 1.25,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className="
                  group
                  relative
                  z-10

                  w-10
                  h-10

                  flex
                  items-center
                  justify-center

                  rounded-xl

                  outline-none

                  focus-visible:ring-2
                  focus-visible:ring-[color:var(--brand-accent)]
                "
              >
                <Icon
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`
                    w-6
                    h-6

                    transition-all
                    duration-200

      ${
        isActive
          ? `
            text-[color:var(--brand-accent)]
            fill-[color:var(--brand-accent)]
            stroke-[color:var(--brand-accent)]
            drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]
          `
          : `
            text-[color:var(--text)]
            stroke-[color:var(--text)]

            group-hover:text-[color:var(--brand-accent)]
            group-hover:stroke-[color:var(--brand-accent)]
            group-hover:fill-[color:var(--brand-accent)]

            group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.45)]
          `
      }
    `}
                />
              </motion.button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

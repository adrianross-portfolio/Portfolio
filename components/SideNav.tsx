"use client";

import { Home, User, Folder, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SideNav() {
  const [active, setActive] = useState("about");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(el, {
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        offset: -10,
      });
    } else {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let best: { id: string; ratio: number } | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const target = entry.target as HTMLElement;

          const current = {
            id: target.id,
            ratio: entry.intersectionRatio,
          };

          if (!best || current.ratio > best.ratio) {
            best = current;
          }
        }

        if (best) {
          setActive(best.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const items = [
    { icon: Home, id: "about" },
    { icon: User, id: "skills" },
    { icon: Folder, id: "projects" },
    { icon: Mail, id: "contact" },
  ];

  return (
    <div className="w-full flex justify-center">
      <nav
        className="
          fixed bottom-4
          md:sticky md:top-4
          z-50
          w-full max-w-4xl
          flex items-center justify-center
          gap-10
          px-4 py-2
          rounded-2xl
          bg-black/30 backdrop-blur-xl
          md:bg-[color:var(--surface)]
          md:border md:border-[color:var(--border)]
          md:shadow-2xl
        "
      >
        {items.map(({ icon: Icon, id }) => {
          const isActive = active === id;

          return (
            <div key={id} className="relative flex items-center justify-center">
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-[color:var(--accent)]"
                />
              )}

              <motion.button
                onClick={() => scrollTo(id)}
                whileHover={{
                  scale: 1.25,
                  y: -3,
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  y: isActive ? -1 : 0,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="
                  relative z-10
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                "
              >
                <Icon
                  className={`
                    w-5 h-5
                    transition-colors duration-200
                    ${isActive ? "text-white" : "text-[color:var(--muted)]"}
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

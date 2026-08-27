"use client";

import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.25,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-block text-[color:var(--brand-accent)]">
      {count}+
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              y: 0,
              opacity: 1,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="mt-4 md:mt-6"
    >
      <div
        className="
          relative z-10
          mx-auto
          flex
          min-h-[calc(100vh-5rem)]
          max-w-7xl
          flex-col
          justify-center

          rounded-2xl
          border
          border-[color:var(--border-soft-color)]

          bg-[color:var(--surface)]

          px-5
          py-12

          sm:px-8
          sm:py-16

          md:px-12
          md:py-20

          lg:px-16
          lg:py-24
        "
      >
        {/* HEADING */}
        <div>
          <h2
            className="
              text-4xl
              font-black
              tracking-tight
              text-[color:var(--text)]

              sm:text-5xl
              md:text-6xl
              lg:text-8xl
            "
          >
            SPORT ENTHUSIAST
          </h2>

          <h2
            className="
              -mt-1
              text-4xl
              font-black
              tracking-tight
              text-[color:var(--brand-accent)]

              sm:text-5xl
              md:-mt-2
              md:text-6xl
              lg:text-8xl
            "
          >
            DEVELOPER
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-relaxed
            text-[color:var(--text)]

            md:mt-8
            md:text-lg
          "
        >
          Skilled in stakeholder coordination, creative problem-solving, and
          digital tools, with a passion for using creativity and organization to
          support teams, projects, and organizations.
        </p>

        {/* STATS */}
        <div className="mt-12 w-full md:mt-20">
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-3xl
              grid-cols-1
              gap-4

              sm:grid-cols-3
              md:gap-6
            "
          >
            {[
              { label: "Years of Experience", value: 4 },
              { label: "Total Projects", value: 7 },
              { label: "Tech Skills", value: 16 },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  flex
                  min-h-[140px]
                  flex-col
                  items-center
                  justify-center

                  rounded-2xl
                  border
                  border-[color:var(--border-soft-color)]

                  bg-[color:var(--surface)]

                  p-5
                  text-center

                  shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]

                  transition-all
                  duration-300

                  md:min-h-[160px]
                  md:p-6
                  md:hover:-translate-y-2
                "
              >
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-[color:var(--text)]

                    md:text-4xl
                  "
                >
                  <Counter value={item.value} />
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    tracking-wide
                    text-[color:var(--muted)]

                    md:text-sm
                  "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

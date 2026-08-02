"use client";

import { motion, useAnimation, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.25,
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-block text-[color:var(--accent)]">
      {count}+
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    controls.set({
      y: -50,
      opacity: 0,
    });

    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
  }, [isInView, controls]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      animate={controls}
      className="mt-4 md:mt-6"
    >
      <motion.div
        className="
          relative z-10

          min-h-auto
          lg:min-h-[calc(100vh-5rem)]

          max-w-7xl
          mx-auto

          rounded-2xl
          border border-[color:var(--border)]

          bg-[color:var(--surface)]
          backdrop-blur-md
          shadow-2xl

          px-5
          sm:px-8
          md:px-12

          py-12
          sm:py-16
          md:py-20
          lg:py-24

          flex flex-col
          justify-center
        "
      >
        {/* HEADING */}
        <div>
          <h2 className="font-black tracking-tight text-[color:var(--text)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            FULL STACK
          </h2>

          <h2 className="font-black tracking-tight text-[color:var(--accent)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl -mt-1 md:-mt-2">
            DEVELOPER
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-[color:var(--muted)]">
          Passionate about creating intuitive and engaging user experiences.
          Specializing in transforming ideas into beautifully crafted products.
        </p>

        {/* STATS */}
        <div className="mt-12 md:mt-20 w-full flex justify-center">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-4
              md:gap-6
              w-full
              max-w-3xl
              auto-rows-fr
            "
          >
            {[
              { label: "Years of Experience", value: 4 },
              { label: "Total Projects", value: 7 },
              { label: "Tech Skills", value: 16 },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  h-full
                  rounded-2xl
                  border border-[color:var(--border)]
                  bg-[color:var(--surface)]
                  backdrop-blur-xl
                  p-5 md:p-6
                  text-center
                  shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]
                  md:hover:-translate-y-2
                  transition-all
                  duration-300
                  flex flex-col
                  justify-center
                "
              >
                <h3 className="font-bold text-[color:var(--text)] text-2xl md:text-4xl">
                  <Counter value={item.value} />
                </h3>

                <p className="mt-2 text-xs md:text-sm tracking-wide text-[color:var(--muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

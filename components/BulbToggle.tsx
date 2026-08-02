"use client";

import { FaRegLightbulb } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BulbToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;

    root.classList.toggle("dark");

    const isDark = root.classList.contains("dark");
    setDark(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle theme"
      className="
        relative
        flex items-center justify-center
        w-12 h-12
        text-[color:var(--muted)]
        hover:text-[color:var(--accent)]
        transition
      "
    >
      {/* LIGHT RAYS (ONLY WHEN ON) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: dark ? 1 : 0,
          rotate: dark ? 360 : 0,
          scale: dark ? 1 : 0.8,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="
              absolute
              w-[2px] h-3
              bg-yellow-400/70
              origin-bottom
            "
            style={{
              transform: `rotate(${i * 45}deg) translateY(-14px)`,
            }}
          />
        ))}
      </motion.div>

      {/* ICON */}
      <motion.div
        animate={{
          rotate: dark ? 12 : 0,
          scale: dark ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={dark ? "text-yellow-400" : ""}
      >
        <FaRegLightbulb size={20} />
      </motion.div>
    </button>
  );
}

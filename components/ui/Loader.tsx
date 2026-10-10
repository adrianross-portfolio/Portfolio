"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type LoaderProps = {
  onComplete?: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let value = 0;

    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 8) + 3;

      if (value >= 100) {
        value = 100;
        window.clearInterval(interval);

        window.setTimeout(() => {
          setFinished(true);
          onComplete?.();
        }, 350);
      }

      setProgress(value);
    }, 100);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          key="portfolio-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1f1f1e] text-white"
        >
          {/* Header */}
          <div className="absolute left-6 right-6 top-7 flex items-center justify-between sm:left-10 sm:right-10 sm:top-9">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-7 bg-[#b91c1c]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] sm:text-[10px]">
                Adrian Austria
              </span>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/50 sm:block">
              Title Here
            </span>
          </div>

          {/* Logo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#b91c1c"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 47}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 47 * (1 - progress / 100),
                }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </svg>

            <div className="relative flex items-center justify-center">
              <span className="text-[54px] font-semibold leading-none tracking-[-0.12em] sm:text-[64px]">
                A<span className="text-[#b91c1c]">A</span>
              </span>
              <span className="absolute -bottom-3 right-0 h-[3px] w-5 bg-[#b91c1c]" />
            </div>
          </motion.div>

          {/* Footer */}
          <div className="absolute bottom-7 left-6 right-6 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/30 sm:bottom-9 sm:left-10 sm:right-10">
            <span>Design · Develop · Deliver</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

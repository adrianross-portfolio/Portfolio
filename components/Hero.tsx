"use client";

import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Hero() {
  return (
    <section className="flex items-center justify-center py-8 lg:py-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="w-full max-w-4xl"
      >
        <motion.div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-[color:var(--surface)]
            border
            border-[color:var(--border-soft-color)]
            shadow-2xl

            p-6
            sm:p-8
            md:p-10
            lg:p-14
          "
          animate={{
            y: [0, -8, 0],
            rotate: [0, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.02,
            rotate: 0,
          }}
        >
          <div className="relative z-10">
            {/* IMAGE */}
            <div className="mb-6 flex justify-center sm:mb-8">
              <div
                className="
                  h-40
                  w-40

                  overflow-hidden
                  rounded-lg
                  bg-[color:var(--brand-accent-soft)]
                  shadow-lg

                  sm:h-52
                  sm:w-52

                  md:h-64
                  md:w-64

                  lg:h-72
                  lg:w-72
                "
              >
                <img
                  src="/Adrian Pic.jpeg"
                  alt="Adrian Ross Austria"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>
            </div>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
              className="
                text-center
                text-2xl
                font-bold
                tracking-tight

                sm:text-3xl
                md:text-4xl
              "
            >
              <span className="text-[color:var(--text)]">Adrian Ross </span>

              <span className="text-[color:var(--text)]">Austria</span>
            </motion.h1>

            {/* DESCRIPTION */}
            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-center

                text-sm
                leading-relaxed
                text-[color:var(--text)]

                sm:mt-6
                sm:text-base

                md:text-lg
              "
            >
              Versatile professional with hands-on experience supporting
              international sporting events, including FIBA, FIFA, the Southeast
              Asian Games, and other major sporting competitions.
            </p>

            {/* FOOTER */}
            <div className="mt-6 flex justify-center sm:mt-8">
              <Footer />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

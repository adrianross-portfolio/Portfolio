"use client";

import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Hero() {
  return (
    <section className="flex items-center justify-center py-8 lg:py-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <motion.div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-[color:var(--surface)]
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
            <div className="flex justify-center mb-6">
              <div
                className="
                  w-40 h-40
                  sm:w-52 sm:h-52
                  md:w-64 md:h-64
                  lg:w-72 lg:h-72

                  rounded-lg
                  overflow-hidden
                  shadow-lg
                  bg-[color:var(--muted)]/20
                "
              >
                <img
                  src="/prof.png"
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                text-center
                font-bold
                text-[color:var(--text)]

                text-2xl
                sm:text-3xl
                md:text-4xl
              "
            >
              Mark Kenneth Gatdula
            </motion.h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-4
                sm:mt-6

                max-w-xl
                mx-auto
                text-center

                text-sm
                sm:text-base
                md:text-lg

                leading-relaxed
                text-[color:var(--muted)]
              "
            >
              A Full Stack Developer passionate about building innovative,
              scalable, and user-focused digital solutions.
            </p>

            {/* FOOTER */}
            <div className="mt-6 flex justify-center">
              <Footer />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

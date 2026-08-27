"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import emailjs from "@emailjs/browser";

/* =========================================================
   VALIDATION
========================================================= */

const schema = z.object({
  name: z.string().min(2, "Name is too short"),

  email: z.string().email("Invalid email address"),

  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    margin: "-100px",
  });

  const controls = useAnimation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  /* =========================================================
     SECTION ANIMATION
  ========================================================= */

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

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setSuccess(true);

      reset();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Email send failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      animate={controls}
      className="mt-4 md:mt-6"
    >
      <motion.div
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-0
          flex-col

          max-w-7xl

          rounded-2xl

          border
          border-[color:var(--border-soft-color)]

          bg-[color:var(--surface)]

          text-[color:var(--text)]

          shadow-2xl
          backdrop-blur-md

          px-5
          py-12

          sm:px-8
          sm:py-16

          md:px-12
          md:py-20

          lg:min-h-[calc(100vh-5rem)]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>
          <h2
            className="
              font-black
              tracking-tight

              text-4xl
              text-[color:var(--text)]

              sm:text-5xl
              md:text-7xl
              lg:text-8xl
            "
          >
            LET&apos;S WORK
          </h2>

          <h2
            className="
              -mt-1

              font-black
              tracking-tight

              text-4xl
              text-[color:var(--brand-accent)]

              sm:text-5xl
              md:-mt-2
              md:text-7xl
              lg:text-8xl
            "
          >
            TOGETHER
          </h2>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-2xl

            md:mt-10
          "
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-6"
          >
            {/* =================================================
                NAME
            ================================================= */}

            <div className="relative">
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder=" "
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className={`
                  peer

                  w-full

                  rounded-xl

                  border
                  bg-transparent

                  px-4
                  pb-2
                  pt-5

                  text-[color:var(--text)]

                  outline-none

                  transition-all
                  duration-200

                  placeholder:text-transparent

                  ${
                    errors.name
                      ? `
                        border-red-500
                        focus:border-red-500
                      `
                      : `
                        border-[color:var(--border-soft-color)]
                        focus:border-[color:var(--brand-accent)]
                      `
                  }
                `}
              />

              <label
                htmlFor="name"
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-3

                  text-sm
                  text-[color:var(--muted)]

                  transition-all
                  duration-200

                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base

                  peer-focus:top-2
                  peer-focus:text-sm

                  peer-focus:text-[color:var(--brand-accent)]
                "
              >
                Your Name
              </label>

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="relative">
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder=" "
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                className={`
                  peer

                  w-full

                  rounded-xl

                  border
                  bg-transparent

                  px-4
                  pb-2
                  pt-5

                  text-[color:var(--text)]

                  outline-none

                  transition-all
                  duration-200

                  placeholder:text-transparent

                  ${
                    errors.email
                      ? `
                        border-red-500
                        focus:border-red-500
                      `
                      : `
                        border-[color:var(--border-soft-color)]
                        focus:border-[color:var(--brand-accent)]
                      `
                  }
                `}
              />

              <label
                htmlFor="email"
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-3

                  text-sm
                  text-[color:var(--muted)]

                  transition-all
                  duration-200

                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base

                  peer-focus:top-2
                  peer-focus:text-sm

                  peer-focus:text-[color:var(--brand-accent)]
                "
              >
                Email Address
              </label>

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <div className="relative">
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                placeholder=" "
                aria-invalid={Boolean(errors.message)}
                className={`
                  peer

                  w-full

                  resize-none
                  rounded-xl

                  border
                  bg-transparent

                  px-4
                  pb-2
                  pt-5

                  text-[color:var(--text)]

                  outline-none

                  transition-all
                  duration-200

                  placeholder:text-transparent

                  ${
                    errors.message
                      ? `
                        border-red-500
                        focus:border-red-500
                      `
                      : `
                        border-[color:var(--border-soft-color)]
                        focus:border-[color:var(--brand-accent)]
                      `
                  }
                `}
              />

              <label
                htmlFor="message"
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-3

                  text-sm
                  text-[color:var(--muted)]

                  transition-all
                  duration-200

                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base

                  peer-focus:top-2
                  peer-focus:text-sm

                  peer-focus:text-[color:var(--brand-accent)]
                "
              >
                Your Message
              </label>

              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* =================================================
                BUTTON
            ================================================= */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={
                !loading
                  ? {
                      scale: 1.02,
                      y: -1,
                    }
                  : undefined
              }
              whileTap={
                !loading
                  ? {
                      scale: 0.97,
                    }
                  : undefined
              }
              className="
                w-full

                rounded-xl

                bg-[color:var(--brand-accent)]

                py-3

                font-semibold
                text-white

                shadow-sm

                transition-all
                duration-200

                hover:bg-[color:var(--brand-accent-hover)]
                hover:shadow-md

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  text-center
                  text-sm
                  font-medium

                  text-[color:var(--brand-accent)]
                "
              >
                Message sent successfully
              </motion.p>
            )}
          </form>

          {/* =====================================================
              SOCIAL LINKS
          ===================================================== */}

          <div
            className="
              mt-8

              flex
              flex-wrap
              justify-center
              gap-6

              text-2xl
              text-[color:var(--muted)]

              md:mt-10
            "
          >
            {/* EMAIL */}

            <a
              href="mailto:your@email.com"
              aria-label="Email"
              className="
                transition-all
                duration-200

                hover:-translate-y-1
                hover:text-[color:var(--brand-accent)]
              "
            >
              <Mail />
            </a>

            {/* GITHUB */}

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                transition-all
                duration-200

                hover:-translate-y-1
                hover:text-[color:var(--brand-accent)]
              "
            >
              <FaGithub />
            </a>

            {/* LINKEDIN */}

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                transition-all
                duration-200

                hover:-translate-y-1
                hover:text-[color:var(--brand-accent)]
              "
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

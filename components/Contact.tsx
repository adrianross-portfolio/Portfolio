"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import emailjs from "@emailjs/browser";

/* -------------------------
   VALIDATION
--------------------------*/
const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

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

  useEffect(() => {
    if (!isInView) return;

    controls.set({ y: -50, opacity: 0 });

    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
  }, [isInView, controls]);

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
      setTimeout(() => setSuccess(false), 3000);
      reset();
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
          relative z-10

          min-h-auto
          lg:min-h-[calc(100vh-5rem)]

          max-w-7xl
          mx-auto

          bg-[color:var(--surface)]
          text-[color:var(--text)]

          backdrop-blur-md
          border border-[color:var(--border)]
          rounded-2xl shadow-2xl

          px-5 sm:px-8 md:px-12
          py-12 sm:py-16 md:py-20

          flex flex-col
        "
      >
        {/* HEADER */}
        <div>
          <h2 className="font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
            LET&apos;S WORK
          </h2>

          <h2 className="font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[color:var(--accent)]">
            TOGETHER
          </h2>
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto w-full mt-8 md:mt-10">
          <form
            className="space-y-5 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NAME */}
            <div className="relative">
              <input
                {...register("name")}
                id="name"
                placeholder=" "
                className="
                  peer w-full
                  bg-transparent
                  border border-[color:var(--border)]
                  rounded-xl
                  px-4 pt-5 pb-2
                  text-[color:var(--text)]
                  outline-none
                  focus:border-[color:var(--accent)]
                  transition
                "
              />

              <label
                htmlFor="name"
                className="
                  absolute left-4 top-3
                  text-[color:var(--muted)] text-sm
                  transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base
                  peer-focus:top-2
                  peer-focus:text-sm
                  peer-focus:text-[color:var(--accent)]
                "
              >
                Your Name
              </label>

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                {...register("email")}
                id="email"
                placeholder=" "
                className="
                  peer w-full
                  bg-transparent
                  border border-[color:var(--border)]
                  rounded-xl
                  px-4 pt-5 pb-2
                  text-[color:var(--text)]
                  outline-none
                  focus:border-[color:var(--accent)]
                  transition
                "
              />

              <label
                htmlFor="email"
                className="
                  absolute left-4 top-3
                  text-[color:var(--muted)] text-sm
                  transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base
                  peer-focus:top-2
                  peer-focus:text-sm
                  peer-focus:text-[color:var(--accent)]
                "
              >
                Email Address
              </label>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                placeholder=" "
                className="
                  peer w-full
                  bg-transparent
                  border border-[color:var(--border)]
                  rounded-xl
                  px-4 pt-5 pb-2
                  text-[color:var(--text)]
                  outline-none
                  resize-none
                  focus:border-[color:var(--accent)]
                  transition
                "
              />

              <label
                htmlFor="message"
                className="
                  absolute left-4 top-3
                  text-[color:var(--muted)] text-sm
                  transition-all
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:text-base
                  peer-focus:top-2
                  peer-focus:text-sm
                  peer-focus:text-[color:var(--accent)]
                "
              >
                Your Message
              </label>

              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full
                py-3
                rounded-xl
                font-semibold
                bg-[color:var(--accent)]
                text-[color:var(--bg)]
                transition-all
                disabled:opacity-50
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {/* SUCCESS */}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[color:var(--accent)] text-center text-sm"
              >
                Message sent successfully
              </motion.p>
            )}
          </form>

          {/* SOCIAL ICONS */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 md:mt-10 text-2xl text-[color:var(--muted)]">
            <Mail className="hover:text-[color:var(--accent)] transition cursor-pointer" />
            <FaGithub className="hover:text-[color:var(--accent)] transition cursor-pointer" />
            <FaLinkedin className="hover:text-[color:var(--accent)] transition cursor-pointer" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

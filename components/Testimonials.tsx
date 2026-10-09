"use client";

import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Kenneth did a great job turning our ideas into a clean, modern website. The layout is intuitive, and the site works smoothly across different devices.",
    name: "Alex Morgan",
    role: "Business Owner",
    initials: "AM",
  },
  {
    quote:
      "The development process was smooth and well-organized. Kenneth paid attention to the details and made sure the website matched the project requirements.",
    name: "Sarah Williams",
    role: "Project Manager",
    initials: "SW",
  },
  {
    quote:
      "Kenneth has a good eye for design and usability. The final website feels professional, loads well, and is easy for visitors to navigate.",
    name: "Daniel Carter",
    role: "Small Business Client",
    initials: "DC",
  },
  {
    quote:
      "Working with Kenneth was a positive experience. He approached the project thoughtfully and delivered a responsive website with a consistent design.",
    name: "Emily Chen",
    role: "Creative Collaborator",
    initials: "EC",
  },
  {
    quote:
      "Kenneth showed a strong understanding of modern web development and WordPress. The website is easy to manage and fits our business needs.",
    name: "Michael Reed",
    role: "Website Client",
    initials: "MR",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const cards = [...testimonials, ...testimonials];

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-4 md:mt-6"
    >
      <div
        className="
          relative z-10 mx-auto flex max-w-7xl flex-col justify-center
          overflow-hidden rounded-2xl
          border border-[color:var(--border-soft-color)]
          bg-[color:var(--surface)]
          px-5 py-12 sm:px-8 sm:py-16
          md:px-12 md:py-20 lg:px-16 lg:py-24
        "
      >
        {/* HEADING */}
        <div className="mb-10 md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)]">
            What People Say
          </p>

          <h2 className="text-4xl font-black tracking-tight text-[color:var(--text)] sm:text-5xl md:text-6xl lg:text-7xl">
            CLIENT
          </h2>

          <h2 className="-mt-1 text-4xl font-black tracking-tight text-[color:var(--brand-accent)] sm:text-5xl md:-mt-2 md:text-6xl lg:text-7xl">
            TESTIMONIALS
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] md:mt-8 md:text-lg">
            Feedback and experiences from people I&apos;ve worked with.
          </p>
        </div>

        {/* AUTO-SCROLLING CARDS */}
        <div className="group relative -mx-5 overflow-hidden px-5 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16">
          <div
            className="
              flex w-max gap-4
              animate-testimonial-scroll
              group-hover:[animation-play-state:paused]
              motion-reduce:animate-none
              sm:gap-5
            "
          >
            {cards.map((testimonial, index) => (
              <article
                key={`${testimonial.initials}-${index}`}
                aria-hidden={index >= testimonials.length ? true : undefined}
                className="
                  flex min-h-[300px] w-[280px] shrink-0 flex-col
                  rounded-2xl
                  border border-[color:var(--border-soft-color)]
                  bg-[color:var(--surface)]
                  p-5
                  shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]
                  transition-colors duration-300
                  hover:border-[color:var(--brand-accent)]
                  sm:min-h-[320px] sm:w-[320px] sm:p-6
                  lg:w-[360px] lg:p-8
                "
              >
                <div
                  className="mb-5 flex gap-1 text-[color:var(--brand-accent)]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      size={15}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <Quote
                  size={28}
                  className="mb-4 text-[color:var(--brand-accent)]"
                  aria-hidden="true"
                />

                <blockquote className="flex-1 text-sm leading-7 text-[color:var(--text)] sm:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-3 border-t border-[color:var(--border-soft-color)] pt-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-soft-color)] bg-[color:var(--surface)] text-sm font-bold text-[color:var(--brand-accent)]">
                    {testimonial.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text)]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

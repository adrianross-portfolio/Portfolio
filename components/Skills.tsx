"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Layout, Server, Wrench, Database } from "lucide-react";
import StackIcon from "tech-stack-icons";
import { Icon } from "@iconify/react";

/* =========================================================
   TABS
========================================================= */

const tabs = [
  {
    key: "frontend",
    label: "Front End",
    icon: Layout,
  },
  {
    key: "backend",
    label: "Back End",
    icon: Server,
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
  },
  {
    key: "others",
    label: "Tools",
    icon: Wrench,
  },
] as const;

/* =========================================================
   SKILL TYPES
========================================================= */

type StackSkill = {
  name: string;
  description: string;
  type: "stack";
  icon: string;
};

type BrandSkill = {
  name: string;
  description: string;
  type: "brand";
  icon: string;
};

type Skill = StackSkill | BrandSkill;

/* =========================================================
   SKILLS
========================================================= */

const skills: Record<"frontend" | "backend" | "database" | "others", Skill[]> =
  {
    frontend: [
      {
        name: "Microsoft Word",
        description: "Word Processing Software",
        type: "brand",
        icon: "selfhst:microsoft-word-2018",
      },
      {
        name: "Microsoft Excel",
        description: "Spreadsheet Software",
        type: "brand",
        icon: "selfhst:microsoft-excel-2018",
      },
      {
        name: "Photoshop",
        description: "Photo Editing Software",
        type: "brand",
        icon: "devicon:photoshop",
      },

      {
        name: "Adobe After Effects",
        description: "Motion Graphics Software",
        type: "brand",
        icon: "logos:adobe-after-effects",
      },

      {
        name: "React",
        description: "UI Library",
        type: "stack",
        icon: "react",
      },
      {
        name: "Next.js",
        description: "React Framework",
        type: "stack",
        icon: "nextjs",
      },
      {
        name: "TypeScript",
        description: "Typed JavaScript",
        type: "stack",
        icon: "typescript",
      },
      {
        name: "JavaScript",
        description: "Programming Language",
        type: "stack",
        icon: "javascript",
      },
      {
        name: "Vue",
        description: "Progressive JavaScript Framework",
        type: "stack",
        icon: "vue",
      },
    ],

    backend: [
      {
        name: "Node.js",
        description: "JavaScript Runtime",
        type: "stack",
        icon: "nodejs",
      },
      {
        name: "Laravel",
        description: "PHP Framework",
        type: "stack",
        icon: "laravel",
      },
      {
        name: "PHP",
        description: "Server-side Language",
        type: "stack",
        icon: "php",
      },
      {
        name: "Payload CMS",
        description: "Headless CMS",
        type: "stack",
        icon: "payload",
      },
      {
        name: "GraphQL",
        description: "API Query Language",
        type: "stack",
        icon: "graphql",
      },
    ],

    database: [
      {
        name: "PostgreSQL",
        description: "Relational Database",
        type: "stack",
        icon: "postgresql",
      },
      {
        name: "MySQL",
        description: "Relational Database",
        type: "stack",
        icon: "mysql",
      },
      {
        name: "Microsoft SQL Server",
        description: "Relational Database",
        type: "stack",
        icon: "microsoftsqlserver",
      },
      {
        name: "Supabase",
        description: "Backend-as-a-Service",
        type: "stack",
        icon: "supabase",
      },
    ],

    others: [
      {
        name: "Git",
        description: "Version Control System",
        type: "stack",
        icon: "git",
      },
      {
        name: "Docker",
        description: "Containerization",
        type: "stack",
        icon: "docker",
      },

      {
        name: "Figma",
        description: "UI/UX Design",
        type: "brand",
        icon: "logos:figma",
      },
      {
        name: "Adobe Photoshop",
        description: "Image Editing Software",
        type: "brand",
        icon: "logos:adobe-photoshop",
      },
      {
        name: "Adobe Illustrator",
        description: "Vector Graphics Software",
        type: "brand",
        icon: "logos:adobe-illustrator",
      },
      {
        name: "Adobe After Effects",
        description: "Motion Graphics Software",
        type: "brand",
        icon: "logos:adobe-after-effects",
      },

      {
        name: "Microsoft Word",
        description: "Word Processing Software",
        type: "brand",
        icon: "mdi:microsoft-word",
      },
      {
        name: "Microsoft Excel",
        description: "Spreadsheet Software",
        type: "brand",
        icon: "mdi:microsoft-excel",
      },

      {
        name: "ChatGPT",
        description: "AI Assistant",
        type: "brand",
        icon: "logos:openai",
      },
      {
        name: "Google Gemini",
        description: "AI Assistant",
        type: "brand",
        icon: "logos:google-gemini",
      },
    ],
  };

/* =========================================================
   TYPES
========================================================= */

type TabKey = keyof typeof skills;

/* =========================================================
   COMPONENT
========================================================= */

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const [activeTab, setActiveTab] = useState<TabKey>("frontend");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredTab, setHoveredTab] = useState<TabKey | null>(null);

  /* =======================================================
     ANIMATION VARIANTS
  ======================================================= */

  const container = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 10,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
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
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-5rem)]
          max-w-7xl
          flex-col
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
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-10 md:mb-14">
          <h2
            className="
              text-4xl
              font-black
              tracking-tight
              text-[color:var(--text)]
              sm:text-5xl
              md:text-7xl
              lg:text-8xl
            "
          >
            MY
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
              md:text-7xl
              lg:text-8xl
            "
          >
            SKILLS
          </h2>
        </div>

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div
          className="
            flex
            flex-1
            flex-col
            gap-8
            md:flex-row
            md:gap-10
          "
        >
          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    md:gap-5
                    cursor-pointer
                  "
                >
                  {skills[activeTab].map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={item}
                      onClick={() => setSelectedSkill(skill)}
                      whileHover={{
                        y: -4,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                        group
                        flex
                        cursor-pointer
                        items-center
                        gap-4
                        rounded-xl
                        border
                        border-[color:var(--border-soft-color)]
                        bg-[color:var(--surface)]
                        p-4
                        transition-colors
                        duration-300
                        hover:border-[color:var(--brand-accent)]
                      "
                    >
                      {/* =================================================
                          ICON
                      ================================================= */}

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-white
                          shadow-sm
                          md:h-14
                          md:w-14
                        "
                      >
                        {skill.type === "stack" ? (
                          <StackIcon
                            name={skill.icon}
                            variant="light"
                            className="
                              h-8
                              w-8
                              object-contain
                              md:h-9
                              md:w-9
                            "
                          />
                        ) : (
                          <Icon
                            icon={skill.icon}
                            className="
                              h-8
                              w-8
                              object-contain
                              md:h-9
                              md:w-9
                            "
                          />
                        )}
                      </div>

                      {/* =================================================
                          CONTENT
                      ================================================= */}

                      <div className="min-w-0">
                        <h3
                          className="
                            text-base
                            font-semibold
                            text-[color:var(--text)]
                            md:text-lg
                          "
                        >
                          {skill.name}
                        </h3>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-[color:var(--muted)]
                            md:text-sm
                          "
                        >
                          {skill.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =================================================
              TABS
          ================================================= */}

          <div
            className="
              fixed
              bottom-4
              left-1/2
              z-50
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-2xl
              border
              border-[color:var(--border-soft-color)]
              bg-[color:var(--surface)]
              px-3
              py-2
              shadow-xl

              md:static
              md:bottom-auto
              md:left-auto
              md:flex-col
              md:translate-x-0
              md:border-none
              md:bg-transparent
              md:px-0
              md:py-0
              md:shadow-none
            "
          >
            {tabs.map((tab) => {
              const IconComponent = tab.icon;

              const isActive = activeTab === tab.key;

              const isHovered = hoveredTab === tab.key;

              return (
                <motion.button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  onHoverStart={() => setHoveredTab(tab.key)}
                  onHoverEnd={() => setHoveredTab(null)}
                  whileTap={{
                    scale: 0.92,
                  }}
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                  aria-label={tab.label}
                  className="
                    group
                    relative
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-colors
                    duration-200
                    hover:bg-[color:var(--brand-accent-soft)]
                  "
                >
                  <IconComponent
                    size={18}
                    className={
                      isActive
                        ? "text-[color:var(--brand-accent)]"
                        : "text-[color:var(--muted)]"
                    }
                  />

                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        border
                        border-[color:var(--brand-accent)]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-full
                      mr-3
                      hidden
                      whitespace-nowrap
                      rounded-md
                      bg-black/80
                      px-2
                      py-1
                      text-xs
                      text-white
                      opacity-0
                      translate-x-1
                      transition-all
                      duration-150
                      group-hover:translate-x-0
                      group-hover:opacity-100
                      md:block
                    "
                  >
                    {tab.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-5
        backdrop-blur-sm
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-modal-title"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className="
          relative
          w-full
          max-w-md
          rounded-2xl
          border
          border-[color:var(--border-soft-color)]
          bg-[color:var(--surface)]
          p-6
          shadow-2xl
          sm:p-8
        "
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                aria-label="Close modal"
                className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-xl
            text-[color:var(--muted)]
            transition-colors
            hover:bg-[color:var(--brand-accent-soft)]
            hover:text-[color:var(--brand-accent)]
          "
              >
                ×
              </button>

              {/* ICON */}

              <div
                className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-white
            shadow-sm
          "
              >
                {selectedSkill.type === "stack" ? (
                  <StackIcon
                    name={selectedSkill.icon}
                    variant="light"
                    className="
                h-10
                w-10
                object-contain
              "
                  />
                ) : (
                  <Icon
                    icon={selectedSkill.icon}
                    className="
                h-10
                w-10
                object-contain
              "
                  />
                )}
              </div>

              {/* CONTENT */}

              <h3
                id="skill-modal-title"
                className="
            text-2xl
            font-bold
            tracking-tight
            text-[color:var(--text)]
            sm:text-3xl
          "
              >
                {selectedSkill.name}
              </h3>

              <p
                className="
            mt-2
            text-sm
            leading-relaxed
            text-[color:var(--muted)]
            sm:text-base
          "
              >
                {selectedSkill.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

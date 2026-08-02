"use client";

import {
  motion,
  useAnimation,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Layout, Server, Wrench, Database } from "lucide-react";
import {
  _React,
  NodejsIcon,
  _Vue,
  Javascript,
  Laravel,
  Php,
  Payload,
  NextjsIcon,
  TypescriptIcon,
  Postgresql,
  Mysql,
  Microsoft,
  SupabaseIcon,
  GitIcon,
  DockerIcon,
  OpenaiIcon,
  GoogleGemini,
  Graphql,
} from "@dev.icons/react";

const tabs = [
  { key: "frontend", label: "Front End", icon: Layout },
  { key: "backend", label: "Back End", icon: Server },
  { key: "database", label: "Database", icon: Database },
  { key: "others", label: "Tools", icon: Wrench },
] as const;

const skills = {
  frontend: [
    {
      name: "Vue.js",
      description: "Progressive JavaScript Framework",
      icon: _Vue,
    },
    { name: "Next.js", description: "React Framework", icon: NextjsIcon },
    { name: "React", description: "UI Library", icon: _React },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      icon: TypescriptIcon,
    },
    {
      name: "JavaScript",
      description: "Programming Language",
      icon: Javascript,
    },
  ],
  backend: [
    { name: "Node.js", description: "JavaScript Runtime", icon: NodejsIcon },
    { name: "Laravel", description: "PHP Framework", icon: Laravel },
    { name: "PHP", description: "Server-side Language", icon: Php },
    { name: "Payload CMS", description: "Headless CMS", icon: Payload },
    { name: "GraphQL", description: "API Query Language", icon: Graphql },
  ],
  database: [
    {
      name: "PostgreSQL",
      description: "Relational Database",
      icon: Postgresql,
    },
    { name: "MySQL", description: "Relational Database", icon: Mysql },
    { name: "SQL Server", description: "Relational Database", icon: Microsoft },
    {
      name: "Supabase",
      description: "Backend-as-a-Service",
      icon: SupabaseIcon,
    },
  ],
  others: [
    { name: "Git", description: "Version Control System", icon: GitIcon },
    { name: "Docker", description: "Containerization", icon: DockerIcon },
    { name: "ChatGPT", description: "AI Assistant", icon: OpenaiIcon },
    { name: "Gemini", description: "AI Assistant", icon: GoogleGemini },
  ],
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const [activeTab, setActiveTab] = useState<
    "frontend" | "backend" | "database" | "others"
  >("frontend");

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    controls.set({ y: -50, opacity: 0 });

    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      animate={controls}
      className="mt-4 md:mt-6"
    >
      <motion.div
        className="
          relative z-10

          lg:min-h-[calc(100vh-5rem)]
          max-w-7xl mx-auto

          rounded-2xl border border-[color:var(--border)]
          bg-[color:var(--surface)]
          backdrop-blur-md shadow-2xl

          px-5 sm:px-8 md:px-12
          py-12 sm:py-16 md:py-20
        "
      >
        {/* HEADING */}
        <div className="mb-10">
          <h2 className="font-black tracking-tight text-[color:var(--text)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
            MY
          </h2>
          <h2 className="font-black tracking-tight text-[color:var(--accent)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl -mt-1 md:-mt-2">
            TOOLKIT
          </h2>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-8 pb-24 md:pb-0">
          {/* SKILLS */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills[activeTab].map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <motion.div
                        key={skill.name}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        className="
                          flex items-center gap-4
                          p-4
                          rounded-xl
                          border border-[color:var(--border)]
                          bg-[color:var(--surface)]
                        "
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-black" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-[color:var(--text)]">
                            {skill.name}
                          </h3>
                          <p className="text-xs md:text-sm text-[color:var(--muted)]">
                            {skill.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TABS */}
          <div
            className="
              fixed md:static
              bottom-4 left-1/2 -translate-x-1/2
              md:translate-x-0 md:left-auto md:bottom-auto

              flex md:flex-col flex-row
              items-center
              gap-2

              px-3 py-2 md:px-0 md:py-0

              rounded-2xl md:rounded-none

              bg-[color:var(--surface)]
              md:bg-transparent

              border border-[color:var(--border)]
              md:border-none

              shadow-lg md:shadow-none

              z-50

              md:w-[64px]
            "
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isHovered = hoveredTab === tab.key;

              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  onHoverStart={() => setHoveredTab(tab.key)}
                  onHoverEnd={() => setHoveredTab(null)}
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
                >
                  <Icon
                    size={18}
                    className={
                      activeTab === tab.key
                        ? "text-[color:var(--accent)]"
                        : "text-[color:var(--muted)]"
                    }
                  />

                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="
                        absolute inset-0
                        rounded-xl
                        border border-[color:var(--accent)]
                      "
                    />
                  )}

                  {/* Tooltip */}
                  <div
                    className="
                      pointer-events-none
                      absolute right-full mr-3

                      px-2 py-1
                      rounded-md

                      text-xs whitespace-nowrap

                      bg-black/80 text-white

                      opacity-0 translate-x-1
                      group-hover:opacity-100 group-hover:translate-x-0

                      transition-all duration-150

                      hidden md:block
                    "
                  >
                    {tab.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

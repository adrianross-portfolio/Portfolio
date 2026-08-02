export type Project = {
  id: string;
  title: string;
  description: string;
  date?: string;
  jobType?: string;
  image: string[];

  features?: string[];
  liveUrl?: string;

  stack?: string[];

  hasModal?: boolean;
};

export const projects: Project[] = [
  {
    id: "brp",
    title: "Beurs Resource Projector (BRP)",
    description: "Smart hub for project and resource control.",
    date: "2025-Present",
    jobType: "Full-Time",
    image: ["/BRP/brp-1.png", "/BRP/brp-2.png", "/BRP/brp-3.png"],
    hasModal: true,
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "PayloadCMS",
      "PostgreSQL",
      "Docker",
      "React",
    ],
  },
  {
    id: "mdt",
    title: "Master Data Tool (MDT)",
    description:
      "Web system for logging, tracking, and managing incident reports in real-time.",
    date: "2025",
    jobType: "Full-Time",
    image: ["/MDT/mdt-1.png", "/MDT/mdt-2.jpeg", "/MDT/mdt-3.jpeg"],
    hasModal: true,
    stack: [
      "Next.js",
      "RedwoodJS",
      "TypeScript",
      "TailwindCSS",
      "GraphQL",
      "PostgreSQL",
      "Docker",
      "React",
    ],
  },
  {
    id: "hris",
    title: "Human Resources Information System (HRIS)",
    description: "Comprehensive HR management platform.",
    date: "2025",
    jobType: "Full-Time",
    image: ["/HRIS/hris-2.jpeg", "/HRIS/hris-1.jpeg", "/HRIS/hris-3.png"],
    hasModal: true,
    stack: [
      "Next.js",
      "RedwoodJS",
      "TypeScript",
      "TailwindCSS",
      "GraphQL",
      "PostgreSQL",
      "React",
    ],
  },
  {
    id: "pepsi",
    title: "Pepsi Philippines",
    description: "E-commerce platform for Pepsi products in the Philippines.",
    date: "2023-2024",
    jobType: "Full-Time",
    image: ["/Pepsi/pep-1.png", "/Pepsi/pep-2.png", "/Pepsi/pep-3.png"],
    hasModal: true,
    stack: ["Php", "Laravel", "Javascript", "MySQL", "Docker"],
  },
  {
    id: "hertz",
    title: "Hertz Philippines",
    description: "Car rental booking system for Hertz Philippines.",
    date: "2023",
    jobType: "Full-Time",
    image: ["/Hertz/hertz-1.png", "/Hertz/hertz-2.png", "/Hertz/hertz-3.png"],
    hasModal: true,
    stack: ["Php", "Javascript", "Jquery", "Laravel", "MySQL"],
  },
  // {
  //   title: "Ringing-SuiteCRM",
  //   description: "Headless CMS built with PHP and REST API.",
  //   date: "2022",
  //   jobType: "Full-Time'",
  //   image: ["/no-preview.png"],
  // },
  // {
  //   title: "OSTracker",
  //   description:
  //     "Time tracking and project management tool built with PHP and Laravel.",
  //   date: "2022",
  //   jobType: "Full-Time'",
  //   image: ["/no-preview.png"],
  // },
  // {
  //   title: "Bangihan ni Kuya",
  //   description: "Restaurant website built with wordpress.",
  //   date: "2023",
  //   jobType: "Full-Time'",
  //   image: ["/no-preview.png"],
  // },
  {
    id: "qms",
    title: "Qualicare Medical Clinic",
    description:
      "Medical clinic management system built with PHP and REST API.",
    date: "2023",
    jobType: "Freelance",
    image: ["/QMS/qms-1.png", "/QMS/qms-2.png", "/QMS/qms-3.png"],
    hasModal: true,
    stack: ["Php", "Javascript", "Jquery", "MySQL"],
  },
  // {
  //   title: "Outsoar Website",
  //   description: "Official website for Outsoar company.",
  //   date: "2022",
  //   jobType: "Full-Time'",
  //   image: ["/no-preview.png"],
  // },
  // {
  //   title: "Ross Sneaker'",
  //   description: "Official website for Ross Sneaker.",
  //   date: "2025",
  //   jobType: "Full-Time'",
  //   image: ["/no-preview.png"],
  // },
  {
    id: "MediSync",
    title: "MediSync",
    description:
      "A digital appointment system that helps healthcare facilities manage patients, consultations, schedules, and provider assignments in one secure and organized platform.",
    date: "2026",
    jobType: "Freelance",
    image: [
      "/medisync/med-1.png",
      "/medisync/med-2.png",
      "/medisync/med-3.png",
    ],
    hasModal: true,
    stack: ["Next.js", "TypeScript", "TailwindCSS", "React", "Supabase"],
  },
];

"use client";

import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import BulbToggle from "@/components/BulbToggle";

export default function Footer() {
  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);

    if (!container || !target) return;

    container.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Mark-Kenneth-Gatdula.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const items = [
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/mark-gatdula-9a5796116",
    },
    {
      icon: FaGithub,
      url: "https://github.com/MrkGtdl",
    },
    {
      icon: FaFileDownload,
      id: "resume",
    },
  ];

  return (
    <nav className="w-full flex items-center">
      <div className="w-full flex justify-center items-center gap-4">
        {items.map(({ icon: Icon, id, url }) => (
          <button
            key={id ?? url}
            onClick={() => {
              if (id === "resume") {
                downloadResume();
              } else if (url) {
                window.open(url, "_blank");
              }
            }}
            className="text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-800"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </nav>
  );
}

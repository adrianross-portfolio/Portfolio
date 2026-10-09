import { notFound } from "next/navigation";
import { projects } from "@/constants/projects";
import ProjectDetails from "@/components/ProjectDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}

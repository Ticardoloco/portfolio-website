import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectService, Project } from "@/service/projectService";
import { buildMetadata } from "@/lib/metadata";
import ProjectDetail from "@/components/project/ProjectDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let project: Project | null = null;
  try {
    project = await projectService.getProjectById(id);
  } catch {
    project = null;
  }

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This project isn't in the portfolio.",
      path: `/projects/${id}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.id}`,
    image: project.imageUrls?.[0],
  });
}

// 1. Inner component that safely awaits params and fetches data inside Suspense
async function ProjectDetailsWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let project: Project | null = null;
  try {
    project = await projectService.getProjectById(id);
  } catch {
    project = null;
  }

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

// 2. Main page component passes params directly to the Suspense-wrapped child
export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-6 py-24 text-center font-mono text-xs text-paper-dim">
          Loading case study...
        </div>
      }
    >
      <ProjectDetailsWrapper params={params} />
    </Suspense>
  );
}
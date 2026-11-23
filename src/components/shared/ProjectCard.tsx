import Link from "next/link";
import { Project } from "@/service/projectService"; // or your project type path

export default function ProjectCard({ project }: { project: Project }) {
  const tags = project.tags || [];

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group glass-card flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-signal/40"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-signal">
            {project.title}
          </h3>
          <span
            aria-hidden="true"
            className="-translate-x-1.5 text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          >
            →
          </span>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-paper-dim line-clamp-3">
          {project.description}
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {tags.slice(0, 5).map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-paper-dim transition-colors duration-300 group-hover:border-signal/30"
          >
            {tech}
          </li>
        ))}
        {tags.length > 5 && (
          <li className="px-1 py-1 text-[11px] text-paper-dim/50">
            +{tags.length - 5}
          </li>
        )}
      </ul>
    </Link>
  );
}
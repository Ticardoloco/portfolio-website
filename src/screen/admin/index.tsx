"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import {
  FolderKanban,
  Star,
  Globe,
  Images,
  ExternalLink,
  GitBranch,
  FileCode2,
  Trash2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { projectService, type Project } from "@/service/projectService";

function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const apiError = error.response?.data?.error;
    if (typeof apiError === "string" && apiError.trim()) {
      return apiError;
    }
  }
  return error instanceof Error && error.message ? error.message : fallback;
}

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function fetchProjects(isManualRefresh = false) {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await projectService.getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load dashboard data."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const trigger = ()=>{
        fetchProjects(false);
    }
    trigger();
  }, []);

  const stats = useMemo(() => {
    const total = projects.length;
    const featured = projects.filter((p) => Boolean(p.featured)).length;
    const withLiveUrl = projects.filter((p) => Boolean(p.liveUrl?.trim())).length;
    const withMedia = projects.filter(
      (p) => Array.isArray(p.imageUrls) && p.imageUrls.length > 0
    ).length;

    const tagCounts = new Map<string, number>();
    for (const project of projects) {
      if (!Array.isArray(project.tags)) continue;
      for (const rawTag of project.tags) {
        const tag = rawTag.trim();
        if (!tag) continue;
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      }
    }

    const topTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      total,
      featured,
      withLiveUrl,
      withMedia,
      topTags,
    };
  }, [projects]);

  async function handleToggleFeatured(project: Project) {
    if (busyId) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("You must be signed in to update a project.");
      return;
    }

    setBusyId(project.id);
    try {
      const token = await currentUser.getIdToken();
      const nextFeatured = !Boolean(project.featured);

      await projectService.updateProject(
        project.id,
        { featured: nextFeatured },
        token
      );

      setProjects((prev) =>
        prev.map((item) =>
          item.id === project.id ? { ...item, featured: nextFeatured } : item
        )
      );

      toast.success(
        nextFeatured
          ? `"${project.title}" marked as featured.`
          : `"${project.title}" removed from featured.`
      );
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update featured status."));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDeleteProject(project: Project) {
    if (busyId) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("You must be signed in to delete a project.");
      return;
    }

    setBusyId(project.id);
    try {
      const token = await currentUser.getIdToken();
      await projectService.deleteProject(project.id, token);

      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      toast.success(`"${project.title}" deleted.`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete project."));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-paper">
            Overview
          </h1>
          <p className="mt-1 text-sm text-paper-dim">
            Project counts, stack coverage, and quick controls for your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchProjects(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-paper-dim transition-colors hover:border-white/20 hover:text-paper disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-3.5 py-2 font-mono text-xs font-medium text-ink transition-opacity hover:opacity-90"
          >
            <span>Manage Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/[0.08] bg-ink-raised/60 p-5">
          <div className="flex items-center justify-between text-paper-dim">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Total Projects
            </span>
            <FolderKanban className="h-4 w-4 text-signal" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-paper">
            {loading ? "—" : stats.total}
          </p>
          <p className="mt-1 text-xs text-paper-dim">
            Stored in Firestore <code className="text-paper/80">projects</code>
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-ink-raised/60 p-5">
          <div className="flex items-center justify-between text-paper-dim">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Featured
            </span>
            <Star className="h-4 w-4 text-signal" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-paper">
            {loading ? "—" : stats.featured}
          </p>
          <p className="mt-1 text-xs text-paper-dim">
            Highlighted on your showcase
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-ink-raised/60 p-5">
          <div className="flex items-center justify-between text-paper-dim">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Live URLs
            </span>
            <Globe className="h-4 w-4 text-signal" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-paper">
            {loading ? "—" : stats.withLiveUrl}
          </p>
          <p className="mt-1 text-xs text-paper-dim">
            Projects with a deployed link
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-ink-raised/60 p-5">
          <div className="flex items-center justify-between text-paper-dim">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              With Media
            </span>
            <Images className="h-4 w-4 text-signal" />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-paper">
            {loading ? "—" : stats.withMedia}
          </p>
          <p className="mt-1 text-xs text-paper-dim">
            Projects containing preview images
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Projects + Top Stack Tags */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Projects Snapshot */}
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-paper-dim">
              Projects Snapshot
            </h2>
            <Link
              href="/admin/projects"
              className="font-mono text-xs text-signal hover:underline"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-2.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-20 animate-pulse rounded-xl border border-white/[0.08] bg-ink-raised/40"
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-white/[0.08] bg-ink-raised/50 p-6 text-center">
              <p className="text-sm text-paper-dim">No projects found yet.</p>
              <Link
                href="/admin/projects"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-paper hover:border-white/20"
              >
                Add your first project
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {projects.slice(0, 6).map((project) => {
                const isRowBusy = busyId === project.id;

                return (
                  <div
                    key={project.id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-white/[0.08] bg-ink-raised/50 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-medium text-paper">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="rounded bg-signal/15 px-2 py-0.5 font-mono text-[10px] text-signal">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="line-clamp-1 text-xs text-paper-dim">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-0.5 font-mono text-[11px] text-paper-dim/80">
                        <span>{project.tags?.length ?? 0} tags</span>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-paper"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Live</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-paper"
                          >
                            <GitBranch className="h-3 w-3" />
                            <span>Repo</span>
                          </a>
                        )}
                        {project.swaggerUrl && (
                          <a
                            href={project.swaggerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-paper"
                          >
                            <FileCode2 className="h-3 w-3" />
                            <span>Docs</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        disabled={isRowBusy}
                        onClick={() => handleToggleFeatured(project)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-paper-dim transition-colors hover:border-white/20 hover:text-paper disabled:opacity-50"
                      >
                        {project.featured ? "Unfeature" : "Feature"}
                      </button>

                      <button
                        type="button"
                        disabled={isRowBusy}
                        onClick={() => handleDeleteProject(project)}
                        aria-label={`Delete ${project.title}`}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-paper-dim transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stack & Tags Breakdown */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-paper-dim">
            Top Tags & Stack
          </h2>

          <div className="rounded-xl border border-white/[0.08] bg-ink-raised/50 p-4">
            {loading ? (
              <p className="text-xs text-paper-dim">Calculating tags...</p>
            ) : stats.topTags.length === 0 ? (
              <p className="text-xs text-paper-dim">
                No tags added to projects yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {stats.topTags.map(([tag, count]) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink/70 px-2.5 py-1 font-mono text-xs text-paper"
                  >
                    <span>{tag}</span>
                    <span className="text-[10px] text-signal">{count}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { isAxiosError } from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Star,
  ExternalLink,
  GitBranch,
  FileCode2,
} from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import {
  projectService,
  type CreateProjectPayload,
  type Project,
} from "@/service/projectService";

const UPLOAD_ENDPOINT = "/api/upload";
const DELETE_UPLOAD_ENDPOINT = "/api/upload/delete";

interface MediaItem {
  url: string;
  publicId: string;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const serverError = error.response?.data?.error;
    if (typeof serverError === "string" && serverError.trim()) {
      return serverError;
    }
  }
  return error instanceof Error && error.message ? error.message : fallback;
}

async function getFreshAdminToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be signed in as an admin.");
  }
  return await user.getIdToken();
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removingMediaId, setRemovingMediaId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Modal & Edit state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailParagraphs, setDetailParagraphs] = useState<string[]>([""]);
  const [tagItems, setTagItems] = useState<string[]>([""]);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [swaggerUrl, setSwaggerUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await projectService.getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load projects."));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const trigger = () => {
      loadProjects();
    };
    trigger();
  }, []);

  function resetFormFields() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDetailParagraphs([""]);
    setTagItems([""]);
    setLiveUrl("");
    setGithubUrl("");
    setSwaggerUrl("");
    setFeatured(false);
    setMediaItems([]);
  }

  function openCreateModal() {
    resetFormFields();
    setIsModalOpen(true);
  }

  function openEditModal(project: Project) {
    setEditingId(project.id);
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setDetailParagraphs(
      Array.isArray(project.details) && project.details.length > 0
        ? project.details
        : [""]
    );
    setTagItems(
      Array.isArray(project.tags) && project.tags.length > 0
        ? project.tags
        : [""]
    );
    setLiveUrl(project.liveUrl ?? "");
    setGithubUrl(project.githubUrl ?? "");
    setSwaggerUrl(project.swaggerUrl ?? "");
    setFeatured(Boolean(project.featured));

    const urls = Array.isArray(project.imageUrls) ? project.imageUrls : [];
    const publicIds = Array.isArray(project.imagePublicIds)
      ? project.imagePublicIds
      : [];

    setMediaItems(
      urls.map((url, idx) => ({
        url,
        publicId: publicIds[idx] ?? "",
      }))
    );

    setIsModalOpen(true);
  }

  function closeModal() {
    if (saving || uploading) return;
    setIsModalOpen(false);
    resetFormFields();
  }

  // Close modal on Escape key
  useEffect(() => {
    if (!isModalOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !saving && !uploading) {
        setIsModalOpen(false);
        resetFormFields();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, saving, uploading]);

  // Paragraph handlers for `details: string[]`
  function handleAddParagraph() {
    setDetailParagraphs((prev) => [...prev, ""]);
  }

  function handleParagraphChange(index: number, value: string) {
    setDetailParagraphs((prev) =>
      prev.map((item, idx) => (idx === index ? value : item))
    );
  }

  function handleDeleteParagraph(index: number) {
    setDetailParagraphs((prev) => {
      if (prev.length === 1) return [""];
      return prev.filter((_, idx) => idx !== index);
    });
  }

  // Tag handlers for `tags: string[]`
  function handleAddTag() {
    setTagItems((prev) => [...prev, ""]);
  }

  function handleTagChange(index: number, value: string) {
    setTagItems((prev) =>
      prev.map((item, idx) => (idx === index ? value : item))
    );
  }

  function handleDeleteTag(index: number) {
    setTagItems((prev) => {
      if (prev.length === 1) return [""];
      return prev.filter((_, idx) => idx !== index);
    });
  }

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const token = await getFreshAdminToken();
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload images to Cloudinary.");
      }

      const uploadedUrls: string[] = Array.isArray(data.imageUrls)
        ? data.imageUrls
        : [];
      const uploadedPublicIds: string[] = Array.isArray(data.imagePublicIds)
        ? data.imagePublicIds
        : [];

      const newItems: MediaItem[] = uploadedUrls.map((url, idx) => ({
        url,
        publicId: uploadedPublicIds[idx] ?? "",
      }));

      setMediaItems((prev) => [...prev, ...newItems]);
      toast.success(
        `${newItems.length} image${newItems.length === 1 ? "" : "s"} uploaded.`
      );
    } catch (error) {
      toast.error(getErrorMessage(error, "Image upload failed."));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleRemoveMedia(item: MediaItem, index: number) {
    const key = item.publicId || `${item.url}-${index}`;
    setRemovingMediaId(key);

    try {
      if (item.publicId) {
        const token = await getFreshAdminToken();
        const res = await fetch(DELETE_UPLOAD_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ publicId: item.publicId }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to delete image from Cloudinary.");
        }
      }

      setMediaItems((prev) => prev.filter((_, i) => i !== index));
      toast.success("Image removed.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to remove image."));
    } finally {
      setRemovingMediaId(null);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving || uploading) return;

    setSaving(true);
    try {
      const token = await getFreshAdminToken();

      const tags = tagItems.map((t) => t.trim()).filter(Boolean);
      const details = detailParagraphs.map((d) => d.trim()).filter(Boolean);

      const imageUrls = mediaItems.map((m) => m.url);
      const imagePublicIds = mediaItems
        .map((m) => m.publicId)
        .filter((id): id is string => Boolean(id));

      const payload: CreateProjectPayload = {
        title: title.trim(),
        description: description.trim(),
        details,
        tags,
        liveUrl: liveUrl.trim(),
        githubUrl: githubUrl.trim(),
        swaggerUrl: swaggerUrl.trim(),
        imageUrls,
        imagePublicIds,
        featured,
      };

      if (editingId) {
        const res = await projectService.updateProject(editingId, payload, token);
        toast.success(res.message || "Project updated.");
      } else {
        const res = await projectService.createProject(payload, token);
        toast.success(res.message || "Project created.");
      }

      setIsModalOpen(false);
      resetFormFields();
      await loadProjects();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save project."));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProject(project: Project) {
    if (deletingProjectId) return;

    setDeletingProjectId(project.id);
    try {
      const token = await getFreshAdminToken();

      const publicIds = Array.isArray(project.imagePublicIds)
        ? project.imagePublicIds.filter(Boolean)
        : [];

      if (publicIds.length > 0) {
        await fetch(DELETE_UPLOAD_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ publicIds }),
        });
      }

      const res = await projectService.deleteProject(project.id, token);
      toast.success(res.message || "Project deleted.");

      if (editingId === project.id) {
        setIsModalOpen(false);
        resetFormFields();
      }

      setProjects((prev) => prev.filter((item) => item.id !== project.id));
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete project."));
    } finally {
      setDeletingProjectId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with New Project Modal Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-paper">
            Projects
          </h1>
          <p className="mt-1 text-sm text-paper-dim">
            Create, update, and delete portfolio projects with Cloudinary media.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-lg bg-signal px-4 py-2 font-mono text-xs font-medium text-ink transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-wider text-paper-dim">
          All Projects ({projects.length})
        </h2>

        {loading ? (
          <div className="space-y-2.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-24 animate-pulse rounded-xl border border-white/[0.08] bg-ink-raised/40"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-ink-raised/50 p-8 text-center">
            <p className="text-sm text-paper-dim">No projects yet.</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-paper hover:border-white/20"
            >
              <Plus className="h-3.5 w-3.5 text-signal" />
              <span>Create your first project</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const isDeleting = deletingProjectId === project.id;
              const thumb = project.imageUrls?.[0];

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-ink-raised/50 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3.5">
                    {thumb ? (
                      <Image
                        width={96}
                        height={64}
                        src={thumb}
                        alt={project.title}
                        unoptimized
                        className="h-16 w-24 shrink-0 rounded-lg border border-white/10 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-white/10 bg-ink/50 font-mono text-[10px] text-paper-dim">
                        No Image
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-medium text-paper">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 rounded bg-signal/15 px-2 py-0.5 font-mono text-[10px] text-signal">
                            <Star className="h-2.5 w-2.5" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      <p className="line-clamp-1 text-xs text-paper-dim">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-[11px] text-paper-dim/80">
                        {project.tags?.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-white/10 bg-ink/60 px-1.5 py-0.5 text-[10px] text-paper-dim"
                          >
                            {tag}
                          </span>
                        ))}

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
                            <span>GitHub</span>
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
                            <span>Swagger</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-paper-dim transition-colors hover:border-white/20 hover:text-paper"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => handleDeleteProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-paper-dim transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-ink-raised p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2
                  id="project-modal-title"
                  className="font-display text-lg font-bold text-paper"
                >
                  {editingId ? "Update Project" : "Create New Project"}
                </h2>
                <p className="text-xs text-paper-dim">
                  {editingId
                    ? "Modify project details, links, or Cloudinary images."
                    : "Fill in project details and upload images to Cloudinary."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving || uploading}
                aria-label="Close modal"
                className="rounded-lg border border-white/10 p-1.5 text-paper-dim transition-colors hover:bg-white/[0.06] hover:text-paper disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gbemileke Tradomedical"
                  className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Concise summary for cards and previews"
                  className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                />
              </div>

              {/* Dynamic Paragraphs Field (`details: string[]`) */}
              <div className="space-y-3 rounded-xl border border-white/[0.08] bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-paper">
                      Details / Case Study Paragraphs
                    </p>
                    <p className="text-xs text-paper-dim">
                      Add or delete individual paragraphs saved to <code className="text-paper/80">details</code>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1.5 font-mono text-xs text-paper transition-colors hover:border-signal/50 hover:bg-signal/10"
                  >
                    <Plus className="h-3.5 w-3.5 text-signal" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {detailParagraphs.map((paragraph, index) => (
                    <div
                      key={`paragraph-${index}`}
                      className="flex items-start gap-2"
                    >
                      <div className="flex-1 space-y-1">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-paper-dim/70">
                          Paragraph {index + 1}
                        </span>
                        <textarea
                          rows={3}
                          value={paragraph}
                          onChange={(e) =>
                            handleParagraphChange(index, e.target.value)
                          }
                          placeholder={`Write paragraph ${index + 1}...`}
                          className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteParagraph(index)}
                        aria-label={`Delete paragraph ${index + 1}`}
                        className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-paper-dim transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic String Array Field (`tags: string[]`) */}
              <div className="space-y-3 rounded-xl border border-white/[0.08] bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-paper">
                      Tags / Tech Stack Items
                    </p>
                    <p className="text-xs text-paper-dim">
                      Add or delete individual stack tags saved to <code className="text-paper/80">tags</code>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1.5 font-mono text-xs text-paper transition-colors hover:border-signal/50 hover:bg-signal/10"
                  >
                    <Plus className="h-3.5 w-3.5 text-signal" />
                    <span>Add Tag</span>
                  </button>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {tagItems.map((tag, index) => (
                    <div
                      key={`tag-${index}`}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        placeholder={`Tag ${index + 1} (e.g. Next.js)`}
                        className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteTag(index)}
                        aria-label={`Delete tag ${index + 1}`}
                        className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-paper-dim transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                    Swagger / Docs URL
                  </label>
                  <input
                    type="url"
                    value={swaggerUrl}
                    onChange={(e) => setSwaggerUrl(e.target.value)}
                    placeholder="https://.../api/docs"
                    className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-signal"
                  />
                </div>
              </div>

              {/* Cloudinary Media Section */}
              <div className="space-y-3 rounded-xl border border-white/[0.08] bg-ink/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-paper">Project Images</p>
                    <p className="text-xs text-paper-dim">
                      Stored in Cloudinary (<code className="text-paper/80">portfolio-projects</code>).
                    </p>
                  </div>

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-paper transition-colors hover:border-signal/50 hover:bg-signal/10">
                    <Upload className="h-3.5 w-3.5 text-signal" />
                    <span>{uploading ? "Uploading..." : "Upload Images"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploading || saving}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {mediaItems.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-3">
                    {mediaItems.map((item, idx) => {
                      const mediaKey = item.publicId || `${item.url}-${idx}`;
                      const isRemoving = removingMediaId === mediaKey;

                      return (
                        <div
                          key={mediaKey}
                          className="relative overflow-hidden rounded-lg border border-white/10 bg-ink"
                        >
                          <img
                            src={item.url}
                            alt={`${title || "Project"} preview ${idx + 1}`}
                            className="h-24 w-full object-cover"
                          />
                          <button
                            type="button"
                            disabled={isRemoving || saving}
                            onClick={() => handleRemoveMedia(item, idx)}
                            aria-label="Remove image"
                            className="absolute right-1.5 top-1.5 rounded-md bg-ink/85 p-1 text-paper-dim transition-colors hover:bg-red-500/80 hover:text-white disabled:opacity-50"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-paper-dim">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-ink accent-signal"
                  />
                  <span>Feature on homepage</span>
                </label>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving || uploading}
                    className="rounded-lg border border-white/10 px-3.5 py-2 font-mono text-xs text-paper-dim hover:text-paper disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-4 py-2 font-mono text-xs font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    <span>
                      {saving
                        ? editingId
                          ? "Updating..."
                          : "Creating..."
                        : editingId
                          ? "Save Changes"
                          : "Create Project"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
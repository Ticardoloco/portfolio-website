import { apiClient } from "@/lib/axios";

export interface CreateProjectPayload {
  title: string;
  description: string;
  details?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  swaggerUrl?: string;
  imageUrls?: string[];
  imagePublicIds?: string[];
  featured?: boolean;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export interface Project extends CreateProjectPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  success: boolean;
  count: number;
  data: Project[];
}

interface SingleProjectResponse {
  success: boolean;
  data: Project;
}

interface ActionResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    const { data } = await apiClient.get<ProjectsResponse>("/api/projects");
    return data.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const { data } = await apiClient.get<SingleProjectResponse>(`/api/projects/${id}`);
    return data.data;
  },

  async createProject(payload: CreateProjectPayload, token: string): Promise<ActionResponse> {
    const { data } = await apiClient.post<ActionResponse>("/api/projects", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  async updateProject(id: string, payload: UpdateProjectPayload, token: string): Promise<ActionResponse> {
    const { data } = await apiClient.patch<ActionResponse>(`/api/projects/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  async deleteProject(id: string, token: string): Promise<ActionResponse> {
    const { data } = await apiClient.delete<ActionResponse>(`/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};
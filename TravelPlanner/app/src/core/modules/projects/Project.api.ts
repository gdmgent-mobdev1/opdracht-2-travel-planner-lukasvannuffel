import { Project, ProjectBody } from "./Project.types";
import { API } from "@core/network/api";

const getProjects = () => {
  return API.get<Project[]>("/projects");
};

const getProjectById = (id: string) => {
  return API.get<Project>(`/projects/${id}`);
};

const createProject = (trip: ProjectBody) => {
  return API.post<Project>("/projects", trip);
};

const updateProject = (id: string, trip: ProjectBody) => {
  return API.patch<Project>(`/projects/${id}`, trip);
};

export { getProjects, getProjectById, createProject, updateProject };
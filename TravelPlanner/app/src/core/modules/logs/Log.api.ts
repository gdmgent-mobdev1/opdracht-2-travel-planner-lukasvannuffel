import { Log, LogBody } from "./Log.types";
import { API } from "@core/network/api";
import qs from "query-string";

type Query = {
  projectId?: string;
  tripId?: string;
  date?: string;
};

const getLogs = (query: Query = {}) => {
  return API.get<Log[]>(`/logs?${qs.stringify(query)}`);
};

const createLog = (trip: LogBody) => {
  return API.post<Log>("/logs", trip);
};

const updateLog = (id: string, trip: LogBody) => {
  return API.patch<Log>(`/logs/${id}`, trip);
};

export { getLogs, createLog, updateLog };
import axios from 'axios';
import { Kpi, CreateKpiRequest, UpdateKpiRequest } from '../types/kpi';

// Assuming API is proxied or running on same host/port for demo
const API_BASE_URL = '/api/kpis';

export const getKpis = async (): Promise<Kpi[]> => {
  const response = await axios.get<Kpi[]>(API_BASE_URL);
  return response.data;
};

export const getKpiById = async (id: string): Promise<Kpi> => {
  const response = await axios.get<Kpi>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createKpi = async (kpi: CreateKpiRequest): Promise<Kpi> => {
  const response = await axios.post<Kpi>(API_BASE_URL, kpi);
  return response.data;
};

export const updateKpi = async (id: string, kpi: UpdateKpiRequest): Promise<Kpi> => {
  const response = await axios.put<Kpi>(`${API_BASE_URL}/${id}`, kpi);
  return response.data;
};

export const deleteKpi = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

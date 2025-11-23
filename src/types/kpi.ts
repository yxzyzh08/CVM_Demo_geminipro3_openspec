export type KpiIndicatorType = 'ARPU' | 'ChurnRate';

export interface KpiHistoryPoint {
  timestamp: number; // Unix timestamp
  value: number;
}

export interface KpiTarget {
  type: 'Absolute' | 'Relative';
  value: number;
  // For relative, e.g., -2 for "decrease by 2"
}

export interface Kpi {
  id: string;
  name: string;
  indicatorType: KpiIndicatorType;
  description?: string;
  currentValue: number;
  targetValue: number; // Simplified for MVP, assuming absolute or final calculated target
  unit: string; // e.g., '$', '%', 'pp'
  deadline: string; // ISO Date string YYYY-MM-DD
  status: 'Achieved' | 'OnTrack' | 'AtRisk' | 'Overdue';
  history: KpiHistoryPoint[];
  parentId?: string; // For sub-KPIs
  createdAt: number;
  updatedAt: number;
}

export interface CreateKpiRequest {
  name: string;
  indicatorType: KpiIndicatorType;
  description?: string;
  targetValue: number;
  deadline: string;
  parentId?: string;
}

export interface UpdateKpiRequest {
  name?: string;
  description?: string;
  targetValue?: number;
  deadline?: string;
}

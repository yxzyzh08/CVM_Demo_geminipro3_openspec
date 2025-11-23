import { JSONFilePreset } from 'lowdb/node';
import { Kpi } from '../../types/kpi';

export interface Data {
  kpis: Kpi[];
}

const defaultData: Data = { kpis: [] };

// Initialize the database
// Using synchronous preset for simplicity in this demo, though async is standard for LowDB v7+
// We'll use a simple getter/setter approach for the service to consume.

let dbInstance: ReturnType<typeof JSONFilePreset<Data>> | null = null;

export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await JSONFilePreset<Data>('db.json', defaultData);
  }
  return dbInstance;
};

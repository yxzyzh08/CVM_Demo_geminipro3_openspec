import { randomUUID } from 'crypto';
import { getDb } from '../db';
import { Kpi, CreateKpiRequest, UpdateKpiRequest } from '../../types/kpi';

const calculateStatus = (current: number, target: number, deadlineStr: string): Kpi['status'] => {
  const now = new Date();
  const deadline = new Date(deadlineStr);
  
  const isOverdue = now > deadline;
  const isAchieved = current >= target; // Assuming 'higher is better' for MVP, needs logic for 'lower is better' like Churn

  if (isAchieved) return 'Achieved';
  if (isOverdue) return 'Overdue';

  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysRemaining <= 7 && !isAchieved) return 'AtRisk';

  return 'OnTrack';
};

// Assuming Churn Rate target is LOWER than current, need to handle that logic. 
// For now, let's assume we handle "Higher is Better" for ARPU and "Lower is Better" for Churn.
const calculateStatusWithDirection = (kpi: Pick<Kpi, 'currentValue' | 'targetValue' | 'deadline' | 'indicatorType'>): Kpi['status'] => {
  const { currentValue, targetValue, deadline, indicatorType } = kpi;
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const isOverdue = now > deadlineDate;

  let isAchieved = false;
  if (indicatorType === 'ChurnRate') {
    isAchieved = currentValue <= targetValue;
  } else {
    // ARPU and others
    isAchieved = currentValue >= targetValue;
  }

  if (isAchieved) return 'Achieved';
  if (isOverdue) return 'Overdue';

  const daysRemaining = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysRemaining <= 7) return 'AtRisk';

  return 'OnTrack';
};

export const kpiService = {
  async getAll(): Promise<Kpi[]> {
    const db = await getDb();
    // Recalculate status on read to ensure it's up to date with time
    return db.data.kpis.map(kpi => ({
      ...kpi,
      status: calculateStatusWithDirection(kpi)
    }));
  },

  async getById(id: string): Promise<Kpi | undefined> {
    const db = await getDb();
    const kpi = db.data.kpis.find(k => k.id === id);
    if (!kpi) return undefined;
    return { ...kpi, status: calculateStatusWithDirection(kpi) };
  },

  async create(request: CreateKpiRequest): Promise<Kpi> {
    const db = await getDb();
    const now = Date.now();
    
    // Initial simulation of current value (Mock)
    // In a real app, this might come from CDP immediately.
    // For demo, ARPU ~ 40-60, Churn ~ 2-5%
    let initialCurrent = 0;
    if (request.indicatorType === 'ARPU') initialCurrent = 45; 
    if (request.indicatorType === 'ChurnRate') initialCurrent = 5.2;

    const newKpi: Kpi = {
      id: randomUUID(),
      ...request,
      currentValue: initialCurrent,
      unit: request.indicatorType === 'ARPU' ? '$' : '%',
      status: 'OnTrack', // Will be recalculated
      history: [{ timestamp: now, value: initialCurrent }],
      createdAt: now,
      updatedAt: now,
    };

    newKpi.status = calculateStatusWithDirection(newKpi);

    db.data.kpis.push(newKpi);
    await db.write();
    return newKpi;
  },

  async update(id: string, request: UpdateKpiRequest): Promise<Kpi | null> {
    const db = await getDb();
    const index = db.data.kpis.findIndex(k => k.id === id);
    if (index === -1) return null;

    const currentKpi = db.data.kpis[index];
    const updatedKpi = {
      ...currentKpi,
      ...request,
      updatedAt: Date.now(),
    };
    
    updatedKpi.status = calculateStatusWithDirection(updatedKpi);

    db.data.kpis[index] = updatedKpi;
    await db.write();
    return updatedKpi;
  },

  async delete(id: string): Promise<boolean> {
    const db = await getDb();
    const initialLength = db.data.kpis.length;
    db.data.kpis = db.data.kpis.filter(k => k.id !== id);
    if (db.data.kpis.length < initialLength) {
        await db.write();
        return true;
    }
    return false;
  },
  
  // Simulation helper to update current value
  async updateCurrentValue(id: string, value: number): Promise<Kpi | null> {
      const db = await getDb();
      const index = db.data.kpis.findIndex(k => k.id === id);
      if (index === -1) return null;
      
      const kpi = db.data.kpis[index];
      kpi.currentValue = value;
      kpi.history.push({ timestamp: Date.now(), value });
      kpi.updatedAt = Date.now();
      kpi.status = calculateStatusWithDirection(kpi);
      
      await db.write();
      return kpi;
  }
};

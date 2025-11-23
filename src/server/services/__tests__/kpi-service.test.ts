import { describe, it, expect, beforeEach, vi } from 'vitest';
import { kpiService } from '../kpi-service';
import * as dbModule from '../../db';

// Mock the DB module
vi.mock('../../db', () => ({
  getDb: vi.fn()
}));

describe('KPI Service', () => {
  let mockDbData: any;

  beforeEach(() => {
    mockDbData = {
      kpis: []
    };
    (dbModule.getDb as any).mockResolvedValue({
      data: mockDbData,
      write: vi.fn().mockResolvedValue(undefined)
    });
  });

  it('should create a new KPI', async () => {
    const newKpi = await kpiService.create({
      name: 'Test ARPU',
      indicatorType: 'ARPU',
      targetValue: 55,
      deadline: '2025-12-31'
    });

    expect(newKpi).toBeDefined();
    expect(newKpi.id).toBeDefined();
    expect(newKpi.name).toBe('Test ARPU');
    expect(newKpi.status).toBe('OnTrack'); // Assuming initial mock value is on track
    expect(mockDbData.kpis).toHaveLength(1);
  });

  it('should get all KPIs', async () => {
    mockDbData.kpis.push({
      id: '1',
      name: 'Existing KPI',
      indicatorType: 'ChurnRate',
      currentValue: 5,
      targetValue: 2,
      deadline: '2025-12-31',
      history: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    const kpis = await kpiService.getAll();
    expect(kpis).toHaveLength(1);
    expect(kpis[0].name).toBe('Existing KPI');
  });

  it('should update a KPI', async () => {
     mockDbData.kpis.push({
      id: '1',
      name: 'Old Name',
      indicatorType: 'ARPU',
      currentValue: 40,
      targetValue: 50,
      deadline: '2025-12-31',
      history: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    const updated = await kpiService.update('1', { name: 'New Name' });
    expect(updated).toBeDefined();
    expect(updated?.name).toBe('New Name');
    expect(mockDbData.kpis[0].name).toBe('New Name');
  });

  it('should delete a KPI', async () => {
      mockDbData.kpis.push({ id: '1', name: 'To Delete' });
      const result = await kpiService.delete('1');
      expect(result).toBe(true);
      expect(mockDbData.kpis).toHaveLength(0);
  });
});

import { Request, Response } from 'express';
import { kpiService } from '../services/kpi-service';
import { CreateKpiRequest, UpdateKpiRequest } from '../../types/kpi';

export const kpiController = {
  async getAll(req: Request, res: Response) {
    try {
      const kpis = await kpiService.getAll();
      res.json(kpis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch KPIs' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const kpi = await kpiService.getById(req.params.id);
      if (!kpi) {
        res.status(404).json({ error: 'KPI not found' });
        return;
      }
      res.json(kpi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch KPI' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const data: CreateKpiRequest = req.body;
      // Basic validation
      if (!data.name || !data.indicatorType || !data.targetValue || !data.deadline) {
         res.status(400).json({ error: 'Missing required fields' });
         return;
      }

      const newKpi = await kpiService.create(data);
      res.status(201).json(newKpi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create KPI' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const data: UpdateKpiRequest = req.body;
      const updatedKpi = await kpiService.update(req.params.id, data);
      if (!updatedKpi) {
        res.status(404).json({ error: 'KPI not found' });
        return;
      }
      res.json(updatedKpi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update KPI' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const success = await kpiService.delete(req.params.id);
      if (!success) {
         res.status(404).json({ error: 'KPI not found' });
         return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete KPI' });
    }
  }
};

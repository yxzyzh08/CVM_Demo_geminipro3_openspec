import express from 'express';
import kpiRoutes from './routes/kpi-routes';

const app = express();

app.use(express.json());

// Mount KPI routes
app.use('/api/kpis', kpiRoutes);

export default app;

import { Router } from 'express';
import { kpiController } from '../controllers/kpi-controller';

const router = Router();

router.get('/', kpiController.getAll);
router.get('/:id', kpiController.getById);
router.post('/', kpiController.create);
router.put('/:id', kpiController.update);
router.delete('/:id', kpiController.delete);

export default router;

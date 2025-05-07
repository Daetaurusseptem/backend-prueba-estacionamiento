import { Router } from 'express';
import { generarReporte } from '../controllers/reporte.controller';

const router = Router();

router.get('/', generarReporte); // GET /api/reportes?fechaInicio=...&fechaFin=...

export default router;

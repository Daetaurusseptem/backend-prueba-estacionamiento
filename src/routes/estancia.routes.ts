import express from 'express';

import { eliminarEstancia, listarEstancias, obtenerEstancia, registrarEntrada, registrarSalida } from '../controllers/estancia.controller';

const router = express.Router();

router.post('/entrada', registrarEntrada); // Registrar entrada de vehículo
router.post('/salida', registrarSalida);   // Registrar salida de vehículo
router.get('/', listarEstancias);                  // Listar
router.get('/:id', obtenerEstancia);               // Obtener por ID
router.delete('/:id', eliminarEstancia);   
export default router;

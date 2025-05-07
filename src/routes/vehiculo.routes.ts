import { Router } from 'express';
import { actualizarVehiculo, crearVehiculo, eliminarVehiculo, listarVehiculos, obtenerVehiculo } from '../controllers/vehiculo.controller';

const router = Router();

router.post('/', crearVehiculo);              // Crear
router.get('/', listarVehiculos);             // Listar todos
router.get('/:id', obtenerVehiculo);          // Obtener uno
router.put('/:id', actualizarVehiculo);       // Actualizar
router.delete('/:id', eliminarVehiculo);      // Eliminar
export default router;
 
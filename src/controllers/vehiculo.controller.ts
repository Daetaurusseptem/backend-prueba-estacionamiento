import { Request, Response } from 'express';
import { Vehiculo } from '../models/vehiculos';

export const crearVehiculo = async (req: Request, res: Response):Promise<any> => {
  try {
    const { placa, tipo } = req.body;
    const vehiculo = await Vehiculo.create({ placa, tipo });
    return res.status(201).json(vehiculo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el vehículo', error });
  }
};

export const listarVehiculos = async (_req: Request, res: Response):Promise<any> => {
  try {
    const vehiculos = await Vehiculo.findAll();
    return res.json(vehiculos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener vehículos', error });
  }
};



// Obtener por ID
export const obtenerVehiculo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
    return res.json(vehiculo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el vehículo', error });
  }
};

// Actualizar
export const actualizarVehiculo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });

    const { placa, tipo } = req.body;
    await vehiculo.update({ placa, tipo });
    return res.json(vehiculo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el vehículo', error });
  }
}; 

// Eliminar
export const eliminarVehiculo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });

    await vehiculo.destroy();
    return res.json({ message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el vehículo', error });
  }
};

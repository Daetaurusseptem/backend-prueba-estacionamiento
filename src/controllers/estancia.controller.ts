import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Estancia } from '../models/estancia';
import { Vehiculo } from '../models/vehiculos';
import { TipoVehiculo } from '../config/tipoVehiculo';
import { tarifas } from '../config/tarifas';

export const registrarEntrada = async (req: Request, res: Response): Promise<any> => {
  try {
    const { placa } = req.body;

    const vehiculo = await Vehiculo.findOne({ where: { placa } });
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    const estanciaActiva = await Estancia.findOne({
      where: { vehiculoId: vehiculo.id, horaSalida: null }
    });

    if (estanciaActiva) {
      return res.status(400).json({ message: 'El vehículo ya tiene una estancia activa.' });
    }

    const nuevaEstancia = await Estancia.create({
      vehiculoId: vehiculo.id,
      horaEntrada: new Date()
    });

    return res.status(201).json({
      message: 'Entrada registrada correctamente',
      estancia: nuevaEstancia
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar entrada', error });
  }
};

export const registrarSalida = async (req: Request, res: Response): Promise<any> => {
  try {
    const { placa, horaSalida } = req.body;
    console.log(placa, horaSalida);

    const vehiculo = await Vehiculo.findOne({ where: { placa } });
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    const estancia = await Estancia.findOne({
      where: { vehiculoId: vehiculo.id, horaSalida: null }
    });

    if (!estancia) {
      return res.status(400).json({ message: 'No hay estancia activa' });
    }

    const entrada = new Date(estancia.horaEntrada);
    const salida = horaSalida ? new Date(horaSalida) : new Date();

    if (salida < entrada) {
      return res.status(400).json({ message: 'La hora de salida no puede ser menor a la de entrada' });
    }

    if (salida > new Date()) {
      return res.status(400).json({ message: 'La hora de salida no puede estar en el futuro' });
    }

    const tiempoMin = Math.ceil((+salida - +entrada) / 60000);
    const tipo = vehiculo.tipo as TipoVehiculo;
    const tarifa = tarifas[tipo] ?? 0;

    estancia.horaSalida = salida;
    estancia.tiempoTotalMin = tiempoMin;
    estancia.totalPagar = tarifa * tiempoMin;

    await estancia.save();

    res.json({
      message: 'Salida registrada',
      tiempoMin,
      total: estancia.totalPagar,
      tipo,
      placa: vehiculo.placa
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar salida', error });
  }
};


// Listar todas
export const listarEstancias = async (_req: Request, res: Response): Promise<any> => {
  try {
    const estancias = await Estancia.findAll({ include: [Vehiculo] });
    return res.json(estancias);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener estancias', error });
  }
};

// Obtener por ID
export const obtenerEstancia = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const estancia = await Estancia.findByPk(id, { include: [Vehiculo] });
    if (!estancia) return res.status(404).json({ message: 'Estancia no encontrada' });
    return res.json(estancia);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la estancia', error });
  }
};

// Eliminar (opcional)
export const eliminarEstancia = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const estancia = await Estancia.findByPk(id);
    if (!estancia) return res.status(404).json({ message: 'Estancia no encontrada' });

    await estancia.destroy();
    return res.json({ message: 'Estancia eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la estancia', error });
  }
};
import { Request, Response } from 'express';
import { Estancia } from '../models/estancia';
import { Vehiculo } from '../models/vehiculos';

export const generarReporte = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ message: 'Debes proporcionar fechaInicio y fechaFin' });
    }

    const inicio = new Date(fechaInicio as string);
    const fin = new Date(fechaFin as string);

    const estancias = await Estancia.findAll({
      where: {
        horaEntrada: { $gte: inicio },
        horaSalida: { $lte: fin }
      }, 
      include: [Vehiculo]
    });

    const reporte = estancias.map(estancia => {
      const tipo = estancia.vehiculo?.tipo;
      const placa = estancia.vehiculo?.placa;

      return {
        placa,
        tipo,
        tiempoMin: estancia.tiempoTotalMin ?? 'En curso',
        totalPagar: estancia.totalPagar ?? 0
      };
    });

    return res.json(reporte);
  } catch (error) {
    return res.status(500).json({ message: 'Error al generar el reporte', error });
  }
};

//LOGICA PARA AGREGAR NUEVAS TARIFAS MEDIANTE UN ENUM
import { TipoVehiculo } from "./tipoVehiculo";

export const tarifas: Record<TipoVehiculo, number> = {
    oficial: 0,
    residente: 1,
    no_residente: 3
  };
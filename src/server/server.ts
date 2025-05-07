import express, { Application } from 'express';
import cors from 'cors';
import { sequelize } from '../config/db';
import vehiculoRoutes from '../routes/vehiculo.routes';
import estanciaRoutes from '../routes/estancia.routes'; 
import reporteRoutes from '../routes/reportes.routes'; 


class Server {
  public app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use('/api/vehiculos', vehiculoRoutes);
    this.app.use('/api/estancias', estanciaRoutes);
    this.app.use('/api/reportes', reporteRoutes);
  }

  private async dbConnection(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('✅ Base de datos conectada correctamente');
      await sequelize.sync(); 
    } catch (error) {
      console.error('❌ Error al conectar la base de datos:', error);
    }
  }

  public start(port: number): void {
    console.log('SAD');
    this.app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);  
    });
  }


}


export default new Server();
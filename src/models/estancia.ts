import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Vehiculo } from './vehiculos';

@Table({
  tableName: 'estancias',
  timestamps: false
})
export class Estancia extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Vehiculo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  vehiculoId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  horaEntrada!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  horaSalida?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  tiempoTotalMin?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  totalPagar?: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_at!: Date;

  @BelongsTo(() => Vehiculo)
  vehiculo!: Vehiculo;
}

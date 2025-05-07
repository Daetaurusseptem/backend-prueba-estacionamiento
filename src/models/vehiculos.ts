import {
  Table,
  Column,
  Model,
  DataType,
  HasMany
} from 'sequelize-typescript';
import { Estancia } from './estancia';

@Table({
  tableName: 'vehiculos',
  timestamps: false
})
export class Vehiculo extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true
  })
  placa!: string;

  @Column({
    type: DataType.ENUM('oficial', 'residente', 'no_residente'),
    allowNull: false
  })
  tipo!: 'oficial' | 'residente' | 'no_residente';

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_at!: Date;

  @HasMany(() => Estancia)
  estancias!: Estancia[];
}

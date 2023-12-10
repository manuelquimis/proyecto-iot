import {DataTypes} from 'sequelize';
import {sequelize} from '../database'

export const Sensor = sequelize.define('Sensor',{
  AccZ: DataTypes.DOUBLE,
  AccY: DataTypes.DOUBLE,
  AccX: DataTypes.DOUBLE,
  GyroZ: DataTypes.DOUBLE,
  GyroY: DataTypes.DOUBLE,
  GyroX: DataTypes.DOUBLE,
})
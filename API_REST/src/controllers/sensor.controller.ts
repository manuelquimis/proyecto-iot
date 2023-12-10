import {Response,Request} from 'express'
import {Sensor} from '../models/sensor.model'
import moment from 'moment'

export class SensorController{
  async getAll(req:Request, res:Response){
    try {
      const data = (await Sensor.findAll())
        .reverse()
        .map(x =>{
          x.dataValues.createdAt = moment(x.dataValues.createdAt).utc().subtract(5,'hour').format('DD-MM-yyyy HH:mm:ss')
          return x.dataValues
        });
      res.json(data)
    } catch (error: any) {
      res.status(400).json({
        message:error.message ?? 'Error en el servidor'
      })
    }
  }
}
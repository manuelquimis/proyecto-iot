import {connect, MqttClient} from 'mqtt';
import {Sensor} from '../models/sensor.model'

export class ClienteMQTT{
  private client:MqttClient;
  private broker:string = 'mqtt://test.mosquitto.org';
  private port:number = 1883;

  constructor(){
    this.client = connect(this.broker,{port:this.port});
  }

  conectar(){    
    this.client.on('connect', ()=>{
      console.log(`Conectado al broker -> ${this.broker}`);
      this.suscribir();
    });

    this.escucharMensajes();
  }

  private suscribir(){
    this.client.subscribe('esp32/accel_gyro');
  }

  private escucharMensajes() {
    this.client.on('message', async (topic: string, payload: Buffer) => {
      // Parsear el payload según el formato específico de tus mensajes MQTT
      const payloadStr = payload.toString();
      const [accZ, accY, accX, gyroZ, gyroY, gyroX] = payloadStr.split(',').map(parseFloat);

      try {
        // Crear el registro en la base de datos usando Sequelize
        await Sensor.create({
          AccZ: accZ,
          AccY: accY,
          AccX: accX,
          GyroZ: gyroZ,
          GyroY: gyroY,
          GyroX: gyroX,
        });

        console.log(`Nuevo registro creado en la base de datos desde ${topic}`);
      } catch (error) {
        console.error('Error al crear el registro en la base de datos', error);
      }
    });
  }
}

#include <Wire.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <MPU6050_tockn.h>

// Variables globales
const char* ssid = "iot";
const char* password = "quimis1234";

const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);
long tiempoAnterior = 0;
TwoWire wire(0);
MPU6050 mpu(wire);

// Métodos
void conectarWifi();
void conectarBroker();
void leerAcelerometroGiroscopio();

void setup() {
  Serial.begin(9600);
  conectarWifi();
  wire.begin();
  mpu.begin();
  client.setServer(mqttServer, mqttPort);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    conectarWifi();
  }

  if (!client.connected()) {
    conectarBroker();
  }
  client.loop();

  long tiempoActual = millis();
  if ((tiempoActual - tiempoAnterior) > (1000 * 1)) {
    tiempoAnterior = tiempoActual;

    leerAcelerometroGiroscopio();

    // Publicar los valores del acelerómetro y el giroscopio en el tópico MQTT
    String mensaje = String(mpu.getAccZ()) + "," +
                     String(mpu.getAccY()) + "," +
                     String(mpu.getAccX()) + "," +
                     String(mpu.getGyroZ()) + "," +
                     String(mpu.getGyroY()) + "," +
                     String(mpu.getGyroX());

    client.publish("esp32/accel_gyro", mensaje.c_str());
  }
}

void conectarWifi() {
  WiFi.begin(ssid, password);
  Serial.print("Conectando Wifi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado al WIFI su IP es: ");
  Serial.println(WiFi.localIP());
}

void conectarBroker() {
  while (!client.connected()) {
    Serial.println("Conectando Broker MQTT...");
    if (client.connect("arduinoClient")) {
      Serial.println("Broker conectado!");
      break;
    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println("Volveremos a intentarlo en 5 segundos");
      delay(5000);
    }
    delay(500);
  }
}

void leerAcelerometroGiroscopio() {
  mpu.update();
  
  Serial.print("Acelerómetro: ");
  // Serial.print(" z = "); 
  Serial.print(mpu.getAccZ());;Serial.print(",");
  // Serial.print(" y = "); 
  Serial.print(mpu.getAccY());Serial.print(",");
  // Serial.print("x = "); 
  Serial.print(mpu.getAccX());
  Serial.println("");

  Serial.print("Giroscopio: ");
  // Serial.print("x = "); 
  Serial.print(mpu.getGyroZ());Serial.print(",");
  // Serial.print(" y = "); 
  Serial.print(mpu.getGyroY());Serial.print(",");
  // Serial.print(" z = "); 
  Serial.print(mpu.getGyroX());
  Serial.println("");
}
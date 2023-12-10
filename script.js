let scene, camera, renderer, cube;
var mqttClient;

// Función para conectarse al servidor MQTT
function connectToMQTT() {
  mqttClient = new Paho.MQTT.Client("test.mosquitto.org", 8080, "mqtt" + parseInt(Math.random() * 100, 10));

  // Configurar callbacks
  mqttClient.onConnectionLost = onConnectionLost;
  mqttClient.onMessageArrived = onMessageArrived;

  // Conectar al broker MQTT
  mqttClient.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    useSSL: true,
  });
}

function onConnect() {
  console.log("Conectado al servidor MQTT");
  // Suscribirse a los tópicos MQTT de interés
  mqttClient.subscribe("topico/mooc_IoT1");
}

function onFailure(err) {
  console.log("Fallo al conectar al servidor MQTT:", err);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión perdida:", responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  // Manejar mensajes MQTT aquí
  var payload = JSON.parse(message.payloadString);

  // Utilizar datos del payload para actualizar elementos HTML
  document.getElementById("gyroX").innerHTML = payload.gyroX;
  document.getElementById("gyroY").innerHTML = payload.gyroY;
  document.getElementById("gyroZ").innerHTML = payload.gyroZ;

  cube.rotation.x = payload.gyroY;
  cube.rotation.z = payload.gyroX;
  cube.rotation.y = payload.gyroZ;
  renderer.render(scene, camera);
}

// Inicializar la representación 3D
function init3D() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // Crear geometría
  const geometry = new THREE.BoxGeometry(5, 1, 4);

  // Materiales de cada cara
  var cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x00795e }),
    new THREE.MeshBasicMaterial({ color: 0x18ba96 }),
    new THREE.MeshBasicMaterial({ color: 0x43d0b1 }),
    new THREE.MeshBasicMaterial({ color: 0x00795e }),
    new THREE.MeshBasicMaterial({ color: 0x18ba96 }),
    new THREE.MeshBasicMaterial({ color: 0x43d0b1 }),
  ];

  const material = new THREE.MeshFaceMaterial(cubeMaterials);

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  renderer.render(scene, camera);
}

// Redimensionar el objeto 3D cuando cambia el tamaño de la ventana del navegador
function onWindowResize() {
  if (camera && parentWidth && parentHeight) {
    camera.aspect = parentWidth(document.getElementById("3Dcube")) / parentHeight(document.getElementById("3Dcube"));
    camera.updateProjectionMatrix();
    renderer.setSize(parentWidth(document.getElementById("3Dcube")), parentHeight(document.getElementById("3Dcube")));
  }
}

// Agregar evento de redimensionamiento de ventana
window.addEventListener('resize', onWindowResize, false);

// Llamar a la función para conectarse al servidor MQTT
connectToMQTT();
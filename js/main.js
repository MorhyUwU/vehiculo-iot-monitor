const API_URL = "http://3.236.218.193/api/assets/recent";
const tableBody = document.getElementById("deviceTableBody");
const currentStatus = document.getElementById("currentStatus");

// Función para obtener y mostrar los datos
async function fetchDeviceData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al consultar la API");

   const data = await response.json();
console.log("Respuesta de la API:", data); // 👈 Útil para verificar
const devicesArray = Array.isArray(data) ? data : data.devices;
updateTable(devicesArray);
updateStatus(devicesArray[0]?.status || "Sin datos");

  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

// Función para llenar la tabla con los datos
function updateTable(devices) {
  tableBody.innerHTML = "";
  devices.forEach(device => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${device.id}</td>
      <td>${device.name}</td>
      <td>${device.ip}</td>
      <td>${device.status}</td>
      <td>${device.date}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Función para actualizar el subtítulo con animación
function updateStatus(newStatus) {
  currentStatus.classList.add("fade"); // Inicia la animación
  setTimeout(() => {
    currentStatus.textContent = `Estado actual: ${newStatus}`;
    currentStatus.classList.remove("fade"); // Termina la animación
  }, 300);
}

// Ejecutar al inicio y cada 2 segundos
fetchDeviceData();
setInterval(fetchDeviceData, 2000);


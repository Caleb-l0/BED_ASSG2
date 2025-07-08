const API_URL = "/api/appointments"; // backend route

// Load appointments
async function loadAppointments() {
  const res = await fetch(API_URL);
  const appointments = await res.json();
  const tbody = document.querySelector("#appointmentTable tbody");
  tbody.innerHTML = "";

  appointments.forEach(app => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${app.date}</td>
      <td>${app.time}</td>
      <td>${app.doctor}</td>
      <td>${app.location}</td>
      <td>
        <button onclick='editAppointment(${JSON.stringify(app)})'>Edit</button>
        <button onclick='deleteAppointment("${app._id}")'>Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Submit form (Create or Update)
document.getElementById("appointmentForm").onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const data = {
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    doctor: document.getElementById("doctor").value,
    location: document.getElementById("location").value,
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  document.getElementById("appointmentForm").reset();
  loadAppointments();
};

// Populate form for editing
function editAppointment(app) {
  document.getElementById("id").value = app._id;
  document.getElementById("date").value = app.date;
  document.getElementById("time").value = app.time;
  document.getElementById("doctor").value = app.doctor;
  document.getElementById("location").value = app.location;
}

// Delete
async function deleteAppointment(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadAppointments();
}

// Initial load
loadAppointments();
const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('month-year');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const medForm = document.getElementById('med-form');

let currentDate = new Date();
let meds = {}; // { 'YYYY-MM-DD': [ { id, name, time } ] }

function getDateKey(date) {
  return date.toISOString().split('T')[0];
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearEl.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });

  calendarEl.innerHTML = '';

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'day';
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = getDateKey(date);

    const dayEl = document.createElement('div');
    dayEl.className = 'day';
    dayEl.innerHTML = `<strong>${day}</strong>`;

    if (meds[dateKey]) {
      meds[dateKey].forEach(entry => {
        const div = document.createElement('div');
        div.className = 'med-entry';
        div.innerHTML = `
          ${entry.name} @ ${entry.time}
          <button class="delete-btn" title="Delete reminder">🗑️</button>
        `;

        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (confirm(`Delete "${entry.name}" scheduled at ${entry.time}?`)) {
            await fetch(`/api/meds/${entry.id}`, { method: 'DELETE' });
            await fetchMedsFromBackend();
          }
        });

        dayEl.appendChild(div);
      });
    }

    calendarEl.appendChild(dayEl);
  }
}

medForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('med-name').value;
  const datetime = document.getElementById('med-datetime').value;

  if (!name || !datetime) return;

  await fetch('/api/meds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ medicine: name, datetime })
  });

  medForm.reset();
  await fetchMedsFromBackend();
});

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

async function fetchMedsFromBackend() {
  const res = await fetch('/api/meds');
  const data = await res.json();
  console.log("Fetched meds:", data); // Optional for debugging

  meds = {}; // Reset

  data.forEach(med => {
    const dateKey = med.datetime.split('T')[0];
    const time = new Date(med.datetime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (!meds[dateKey]) meds[dateKey] = [];

    meds[dateKey].push({
      id: med.id,
      name: med.medicine,
      time,
      rawTime: med.datetime
    });
  });

  renderCalendar();
}

// Load initial data
fetchMedsFromBackend();

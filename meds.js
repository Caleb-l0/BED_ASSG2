const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('month-year');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const medForm = document.getElementById('med-form');

let currentDate = new Date();
let meds = {}; // { 'YYYY-MM-DD': [ { name, time } ] }

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
        div.textContent = `${entry.name} @ ${entry.time}`;
        dayEl.appendChild(div);
      });
    }

    calendarEl.appendChild(dayEl);
  }
}

medForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('med-name').value;
  const datetime = new Date(document.getElementById('med-datetime').value);
  const dateKey = getDateKey(datetime);
  const time = datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!meds[dateKey]) meds[dateKey] = [];
  meds[dateKey].push({ name, time });

  medForm.reset();
  renderCalendar();
});

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//placeholder code... convert to backend//
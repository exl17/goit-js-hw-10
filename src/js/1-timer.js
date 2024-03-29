import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');
const dateTimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });

      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownInterval;
let targetDate;

function updateTimer() {
  const currentDate = new Date();
  const difference = targetDate - currentDate;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    startButton.disabled = false;
    return;
  }

  const timeLeft = convertMs(difference);
  updateInterface(timeLeft);
}

function updateInterface({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

startButton.disabled = true;

document.querySelector('[data-start]').addEventListener('click', () => {
  startButton.disabled = true;

  const selectedDate = dateTimePicker.selectedDates[0];

  targetDate = selectedDate;

  clearInterval(countdownInterval);
  updateTimer();

  countdownInterval = setInterval(updateTimer, 1000);
});

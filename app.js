// Оголошення класу для ліфта
class Elevator {
  // Конструктор класу
  constructor() {
    // Початковий поверх ліфта - 1
    this.currentFloor = 1;
    // Прапорець, який показує, чи рухається ліфт
    this.isMoving = false;
    // Масив, що містить запити на підйом на певний поверх
    this.requests = [];
    // Об'єкт, що містить затримки для кожного поверху
    // Наприклад, якщо поверх 2, то затримка 2 секунди
    this.floorDelays = {
      1: 0, // немає затримки для 1-го поверху
      2: 2000, // затримка на 2 секунди для 2-го поверху
      3: 4000, // затримка на 4 секунди для 3-го поверху
      4: 6000, // затримка на 6 секунд для 4-го поверху
      5: 8000 // затримка на 8 секунд для 5-го поверху
      // Можна додати інші поверхи з відповідними затримками
    };
  }

  // Метод для переміщення ліфта на певний поверх
  moveToFloor(floor) {
    // Встановлюємо прапорець, що ліфт рухається
    this.isMoving = true;
    // Отримуємо поточний поверх
    const currentFloor = this.currentFloor;
    // Отримуємо елемент таймера з DOM
    const timerElement = document.getElementById('countdown');
    // Час, що залишився
    let timeLeft = 0;
    
    // Обчислюємо час подорожі на основі різниці між поточним та цільовим поверхом
    if (currentFloor === floor) {
      timeLeft = 0; // Немає часу подорожі, якщо ліфт уже на цьому поверсі
    } else {
      const difference = Math.abs(currentFloor - floor);
      timeLeft = difference * 2000; // 2 секунди на кожен поверх різниці
    }

    // Запускаємо таймер для відліку часу
    const countdownTimer = setInterval(() => {
      timeLeft -= 1000;
      timerElement.textContent = timeLeft / 1000; // Оновлюємо відображення таймера
      // При завершенні таймера досягли цільового поверху
      if (timeLeft <= 0) {
        clearInterval(countdownTimer); // Зупиняємо таймер
        this.currentFloor = floor; // Встановлюємо новий поверх
        this.isMoving = false; // Ліфт більше не рухається
        this.updateStatus(); // Оновлюємо статус ліфта
        this.processRequests(); // Обробляємо інші запити
        timerElement.textContent = '--'; // Скидаємо таймер
      }
    }, 1000); // Кожну секунду
  }

  // Оновлення статусу ліфта на сторінці
  updateStatus() {
    document.getElementById('lift-status').innerText = `Ліфт на ${this.currentFloor} поверсі`;
  }

  // Обробляємо запити на підйом
  processRequests() {
    // Якщо є запити та ліфт не рухається
    if (this.requests.length > 0 && !this.isMoving) {
      const nextFloor = this.requests.shift(); // Беремо наступний запит
      this.moveToFloor(nextFloor); // Рухаємося на вказаний поверх
    }
  }

  // Метод для виконання запиту на підйом на певний поверх
  request(floor) {
    // Якщо поточний поверх не співпадає з вказаним
    if (this.currentFloor !== floor) {
      this.requests.push(floor); // Додаємо запит до списку
      this.processRequests(); // Обробляємо запит
    }
  }
}

// Створення екземпляру ліфта
const lift = new Elevator();

// Функція, яка викликається при натисканні на кнопку певного поверху
function requestFloor(floor) {
  lift.request(floor); // Викликаємо метод для виконання запиту на підйом
}

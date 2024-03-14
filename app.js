class Elevator {
  constructor() {
    // Початковий поверх ліфта
    this.currentFloor = 1;
    // Прапорець, який вказує, чи рухається ліфт
    this.isMoving = false;
    // Масив з запитами на підйом на певний поверх
    this.requests = [];
    // Об'єкт, що містить затримки для кожного поверху
    this.floorDelays = {
      1: 0, // мілісекунди, немає затримки для 1-го поверху
      2: 2000, // затримка на 2 секунди для 2-го поверху
      3: 4000, // затримка на 4 секунди для 3-го поверху
      4: 6000, // затримка на 6 секунд для 4-го поверху
      5: 8000 // затримка на 8 секунд для 5-го поверху
      // Додайте ще поверхи з відповідними затримками
    };
  }

  // Метод для руху ліфта на певний поверх
  moveToFloor(floor) {
    this.isMoving = true;
    const currentFloor = this.currentFloor;
    const timerElement = document.getElementById('countdown');
    let timeLeft = 0;
    
    // Обчислення часу подорожі на основі різниці між поточним та цільовим поверхом
    if (currentFloor === floor) {
      timeLeft = 0;
    } else {
      const difference = Math.abs(currentFloor - floor);
      timeLeft = difference * 2000; // 2 секунди різниці на кожен поверх
    }

    // Запуск таймера відліку часу
    const countdownTimer = setInterval(() => {
      timeLeft -= 1000;
      timerElement.textContent = timeLeft / 1000 + ' секунд';
      // При завершенні таймера досягнуто цільового поверху
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        this.currentFloor = floor;
        this.isMoving = false;
        this.updateStatus();
        this.processRequests();
        timerElement.textContent = '--';
      }
    }, 1000);
  }

  // Оновлення статусу ліфта
  updateStatus() {
    document.getElementById('lift-status').innerText = `Ліфт на ${this.currentFloor} поверсі`;
  }

  // Обробка запитів на підйом
  processRequests() {
    if (this.requests.length > 0 && !this.isMoving) {
      const nextFloor = this.requests.shift();
      this.moveToFloor(nextFloor);
    }
  }

  // Метод для здійснення запиту на підйом на певний поверх
  request(floor) {
    if (this.currentFloor !== floor) {
      this.requests.push(floor);
      this.processRequests();
    }
  }
}

// Створення екземпляру ліфта
const lift = new Elevator();

// Функція, що викликається при натисканні на кнопку певного поверху
function requestFloor(floor) {
  lift.request(floor);
}


class Elevator {
  constructor() {
    this.currentFloor = 1;
    this.isMoving = false;
    this.requests = [];
    this.floorDelays = {
      1: 0, // milliseconds, no delay for the 1st floor
      2: 2000, // 2 seconds delay for 2nd floor
      3: 4000, // 4 seconds delay for 3rd floor
      4: 6000, // 6 seconds delay for 4th floor
      5: 8000 // 8 seconds delay for 5th floor
      // Add more floors with their respective delays
    };
  }

  moveToFloor(floor) {
    this.isMoving = true;
    const currentFloor = this.currentFloor;
    const timerElement = document.getElementById('countdown');
    let timeLeft = 0;
    
    if (currentFloor === floor) {
      timeLeft = 0;
    } else {
      const difference = Math.abs(currentFloor - floor);
      timeLeft = difference * 2000; // 2 seconds difference per floor
    }

    const countdownTimer = setInterval(() => {
      timeLeft -= 1000;
      timerElement.textContent = timeLeft / 1000 + ' секунд';
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

  updateStatus() {
    document.getElementById('lift-status').innerText = `Ліфт на ${this.currentFloor} поверсі`;
  }

  processRequests() {
    if (this.requests.length > 0 && !this.isMoving) {
      const nextFloor = this.requests.shift();
      this.moveToFloor(nextFloor);
    }
  }

  request(floor) {
    if (this.currentFloor !== floor) {
      this.requests.push(floor);
      this.processRequests();
    }
  }
}

const lift = new Elevator();

function requestFloor(floor) {
  lift.request(floor);
}

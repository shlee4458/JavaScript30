const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  /* Move Seconds Hand */
  const seconds = now.getSeconds();
  const secondsDegree = (seconds / 60) * 360;
  secondHand.style.transform = `rotate(${secondsDegree + 90}deg)`

  /* Move Minutes Hand */
  const minutes = now.getMinutes();
  const minutesDegree = (minutes / 60) * 360;
  minuteHand.style.transform = `rotate(${minutesDegree + 60}deg)`

  /* Move Hour Hand */
  const hours = now.getHours();
  const hoursDegree = (hours / 12) * 360;
  hourHand.style.transform = `rotate(${hoursDegree + 60}deg)`

  console.log(seconds);
}

setInterval(setDate, 1000); // setDate is executed every 1000 millisecond = 1 second
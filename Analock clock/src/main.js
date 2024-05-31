const sec = document.querySelector(".s");
const min = document.querySelector(".m");
const howr = document.querySelector(".h");

setInterval(() => {
  let time = new Date();
  let currentSec = time.getSeconds();
  let currentMin = time.getMinutes();
  let currentHowr = time.getHours();

  sec.style.transform = `rotate(${roted(60, currentSec)}deg)`;
  min.style.transform = `rotate(${roted(60, currentMin)}deg)`;
  howr.style.transform = `rotate(${roted(12, currentHowr)}deg)`;
});

function roted(time, current) {
  return (360 * current) / time;
}

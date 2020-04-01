export const countdownMaker = (date, id) => {
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = date * 1000 - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }

    document.getElementById(`days`).innerHTML = days < 10 ? "0" + days : days;
    document.getElementById(`hours`).innerHTML =
      hours < 10 ? "0" + hours : hours;
    document.getElementById(`minutes`).innerHTML =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById(`seconds`).innerHTML =
      seconds < 10 ? "0" + seconds : seconds;

    document.getElementById(`days${id}`).innerHTML =
      days < 10 ? "0" + days : days;
    document.getElementById(`hours${id}`).innerHTML =
      hours < 10 ? "0" + hours : hours;
    document.getElementById(`minutes${id}`).innerHTML =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById(`seconds${id}`).innerHTML =
      seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
};

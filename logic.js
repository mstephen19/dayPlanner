let today = moment();

//display current day
$('#currentDay').text(today.format('DD, MMM, YYYY'));

//display time function
function displayTime() {
  let todayOnInterval = moment();
  let timeNow = todayOnInterval.format('HH[:]mm[:]ss');
  $('#currentTime').text(timeNow);
  console.log('is this working?');
}

//start interval once the document loads
$(document).ready(function () {
  setInterval(displayTime, 500);
});

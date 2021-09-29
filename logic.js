$(document).ready(function () {
  let today = moment();
  var hourBoxes = $('.hour');
  //console.log(hourBoxes);

  //display current day
  $('#currentDay').text(today.format('DD, MMM, YYYY'));

  //display time function
  function displayTime() {
    let todayOnInterval = moment();
    let timeNow = todayOnInterval.format('HH[:]mm[:]ss');
    $('#currentTime').text(timeNow);
    //console.log('is this working?'); yes
  }

  //start interval once the document loads
  setInterval(displayTime, 500);

  //my pseudocode is below
  //for loop through all hour boxes
  //create varibale for value in box[i] into seconds
  //if value within the hour box is < current time in seconds, add class .past, else if
  //it's ===, do .present, else, do .past
  changeDivColor();

  function changeDivColor() {
    for (let i = 0; i < hourBoxes.length; i++) {
      let getValue = hourBoxes[i].textContent;
      //console.log(getValue);
      let changeToHrs = moment(getValue, 'HH[:]mm').format('HH');
      let theBox = hourBoxes[i];
      let textArea = theBox.nextElementSibling;
      //console.log(changeToHrs);
      //console.log(theBox.nextElementSibling);
      if (changeToHrs < today.format('HH')) {
        textArea.classList.add('past');
      } else if (changeToHrs == today.format('HH')) {
        textArea.classList.add('present');
      } else {
        textArea.classList.add('future');
      }
    }
  }
});

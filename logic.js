$(document).ready(function () {
  let today = moment();
  const hourBoxes = $('.hour');
  const allRows = $('.row');
  //console.log(allRows[0].childNodes[3]);
  // const theContainer = $('.container')
  // console.log(theContainer[0].childNodes)
  //console.log(hourBoxes);
  let userInputs = [
    {
      name: '9:00',
      text: '',
    },
    {
      name: '10:00',
      text: '',
    },
    {
      name: '11:00',
      text: '',
    },
    {
      name: '12:00',
      text: '',
    },
    {
      name: '13:00',
      text: '',
    },
    {
      name: '14:00',
      text: '',
    },
    {
      name: '15:00',
      text: '',
    },
    {
      name: '16:00',
      text: '',
    },
    {
      name: '17:00',
      text: '',
    },
  ];

  $(function loadTasks(){
    //console.log('this function runs onload'); yes
    var pulledData = JSON.parse(localStorage.getItem('userTasks'));
    //console.log(theContainer.childNodes())
    //console.log(allRows(0).children('.input-field'));
    // console.log(allRows[0].childNodes[3])
    // console.log(pulledData[0].text)
    for (let i = 0; i < pulledData.length; i++){
      allRows[i].childNodes[3].innerHTML = pulledData[i].text;
    }
  });

  //display current day
  $('#currentDay').text(today.format('DD, MMM, YYYY'));

  //display time function
  function displayTime() {
    let todayOnInterval = moment();
    let timeNow = todayOnInterval.format('HH[:]mm[:]ss');
    $('#currentTime').text(timeNow);
    //console.log('is this working?'); yes
    //return timeNow; //can now use this to .diff between current time and other times
  }

  //start interval once the document loads
  setInterval(displayTime, 700);

  //my pseudocode is below
  //for loop through all hour boxes
  //create varibale for value in box[i] into seconds
  //if value within the hour box is < current time in seconds, add class .past, else if
  //it's ===, do .present, else, do .past

  $(function changeDivColor() {
    for (let i = 0; i < hourBoxes.length; i++) {
      let getValue = hourBoxes[i].textContent;
      //console.log(getValue);
      let changeToMmt = moment(getValue, 'HH[:]mm'); //.format('HH mm');
      let theBox = hourBoxes[i];
      let textArea = theBox.nextElementSibling;
      //console.log(changeToHrs);p
      //console.log(theBox.nextElementSibling);
      // if (changeToHrs < today.format('HH')) {
      //   textArea.classList.add('past');
      // } else if (changeToHrs == today.format('HH')) {
      //   textArea.classList.add('present');
      // } else {
      //   textArea.classList.add('future');
      // }
      //play around with .diff instead of the method above
      //console.log('Time now:' + today + ', Time in box:' + changeToMmt);
      //console.log(changeToHrs.diff(today, 'hours'));
      // if (changeToMmt.diff(today, 'minutes') < 0) {
      //   textArea.classList.add('past');
      // } else if (changeToMmt.diff(today, 'hours') > 0) {
      //   textArea.classList.add('future');
      // } else {
      //   textArea.classList.add('present');
      // }

      // console.log(changeToMmt.format('HH') + ': ' + changeToMmt.diff(today, 'minutes'))
      // console.log(changeToMmt.diff(today, 'minutes') > -60)
        if (changeToMmt.diff(today, 'minutes') < -60) {
        textArea.classList.add('past');
      } else if (changeToMmt.diff(today, 'minutes') >= -60 && changeToMmt.diff(today, 'minutes') < 0) {
        textArea.classList.add('present');
      } else {
        textArea.classList.add('future');
      }
    }
  });

  function saveToStorage(){
    localStorage.setItem('userTasks', JSON.stringify(userInputs));
  }

  function saveOnClick(event) {
    let btnClicked = $(event.target);
    //console.log(btnClicked);
    //console.log(btnClicked.parent().parent().children('.input-field')); //get the parent(the row) then select the textarea child
    let specificTextArea = btnClicked.parent().parent().children('.input-field');
    //console.log(specificTextArea.val()); //working
    //if object name and textcontent of hourBox match, insert textbox content into object's text:
    //then after editing the object, save it into localstorage, dont forget JSON.stringify
    let textContent = specificTextArea.val();
    //console.log(textContent);
    let specificHourBox = btnClicked.parent().parent().children('.hour').text();
    //console.log(specificHourBox);
    //console.log(specificHourBox === userInputs[0].name); true
    for (let i = 0; i < userInputs.length; i++) {
      if (specificHourBox === userInputs[i].name) {
        //console.log('great');
        userInputs[i].text = textContent; //+ 'it works';
        //console.log(userInputs[i].text);
        saveToStorage();
      }
    }
  }

  function saveAll(){
    for (let i = 0; i < allRows.length; i++){
      userInputs[i].text = allRows[i].childNodes[3].value
    }
    saveToStorage();
    //console.log(userInputs);
  }

  function clearAll(){
    for (let i = 0; i < allRows.length; i++){
      allRows[i].childNodes[3].innerHTML = ''
    }
    saveToStorage();
  }

  allRows.on('click', '.fas', saveOnClick);

  $('.saveAllBtn').on('click', saveAll)

  $('.clearAllBtn').on('click', clearAll)
});

// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
});
const timeblocksArray = [
  { id: "0", time: "09", meridiem: "am" },
  { id: "1", time: "10", meridiem: "am" },
  { id: "2", time: "11", meridiem: "am" },
  { id: "3", time: "12", meridiem: "pm" },
  { id: "4", time: "13", meridiem: "pm" },
  { id: "5", time: "14", meridiem: "pm" },
  { id: "6", time: "15", meridiem: "pm" },
  { id: "7", time: "16", meridiem: "pm" },
  { id: "8", time: "17", meridiem: "pm" },
];
// Variable for displaying current date
const currentDate = moment().format("dddd, MMMM Do");

//Display current date
function displayCurrentDate() {
  $("#date-display").text(currentDate);
}

// Display timeblocks within timeblocks div
function hourlyTimeblock(hour, index) {
  // create each timeblock row
  const timeblockRow = $("<div>").attr({ class: "row  border-bottom" });
  // create each timeblock hour column
  const hourCol = $("<div>")
    .attr({ class: "col-2 p-4" })
    .text(hour.time + hour.meridiem);
  // create each timeblock form column
  const eventsCol = $("<div>").attr({ class: "col-8 p-4" });
  $form = $("<form></form>");
  $form.append("<input type='text' class='form-control-plaintext'>");
  // create button element column
  const addCol = $("<div>").attr({ class: "col-2 p-4" });
  const addButton = $("<button>").addClass("btn btn-default");
  const spanButton = $(
    "<span class='glyphicon glyphicon-plus-sign' aria-hidden='true'>"
  );
  addButton.append(spanButton);
  addCol.append(addButton);

  // append to the document via the renderTimeblocks div
  eventsCol.append($form);
  timeblockRow.append(hourCol, eventsCol, addCol);
  $(".renderTimeblocks").append(timeblockRow);

  //IF statement to colour code past, present and future events
  if (hour.time < moment().format("HH")) {
    eventsCol.addClass("past");
    addCol.addClass("past");
  } else if (hour.time === moment().format("HH")) {
    eventsCol.addClass("present");
    addCol.addClass("present");
  } else {
    eventsCol.addClass("future");
    addCol.addClass("future");
  }
}

function displayTimeblocks() {
  timeblocksArray.forEach(hourlyTimeblock);
}
displayCurrentDate();
displayTimeblocks();

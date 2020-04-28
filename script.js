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
  const myRow = $("<div>").attr({ class: "row border-bottom" });
  const hourCol = $("<div>")
    .attr({ class: "col-2 p-2" })
    .text(hour.time + hour.meridiem);
  const eventsCol = $("<div>").attr({ class: "col-8 p-2" });
  const deleteCol = $("<div>").attr({ class: "col-2 p-2" });
  myRow.append(hourCol, eventsCol, deleteCol);
  $(".eventsRow").append(myRow);
}
function displayTimeblocks() {
  timeblocksArray.forEach(hourlyTimeblock);
}
displayCurrentDate();
displayTimeblocks();
// Declaring Array for timeblocks

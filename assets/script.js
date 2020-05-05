// Ensure document is ready before executing any js
$(document).ready(function () {
  console.log("ready!");
});
// Initialised array with timeblock information and empty event property for users scheduled events
let dayPlannerInfo = [
  { id: "0", time: "09", meridiem: "am", event: "" },
  { id: "1", time: "10", meridiem: "am", event: "" },
  { id: "2", time: "11", meridiem: "am", event: "" },
  { id: "3", time: "12", meridiem: "pm", event: "" },
  {
    id: "4",
    time: "13",
    meridiem: "pm",
    event: "",
  },
  { id: "5", time: "14", meridiem: "pm", event: "" },
  { id: "6", time: "15", meridiem: "pm", event: "" },
  { id: "7", time: "16", meridiem: "pm", event: "" },
  { id: "8", time: "17", meridiem: "pm", event: "" },
];
// Variable for displaying current date using moment.js
const currentDate = moment().format("dddd, MMMM Do");

// Display current date function
function displayCurrentDate() {
  $("#date-display").text(currentDate);
}
// Execution of displayCurrentDate function
displayCurrentDate();
// Function to save inputted events by the user into localStorage
function saveEvents() {
  localStorage.setItem("dayPlannerInfo", JSON.stringify(dayPlannerInfo));
}
// Function to display saved events from localStorage into the display window
function displayEvents() {
  dayPlannerInfo.forEach(function (thisHour) {
    console.log($("#textarea" + thisHour.id).val(thisHour.event));
  });
}
// Setting localStorage
function setLocalStorage() {
  var storedDayPlannerInfo = JSON.parse(localStorage.getItem("dayPlannerInfo"));

  if (storedDayPlannerInfo) {
    dayPlannerInfo = storedDayPlannerInfo;
  }

  saveEvents();
  displayEvents();
}
// Display timeblocks within timeblocks div
function hourlyTimeblock(hour, index) {
  // creates timeblocks row
  var timeblockRow = $("<form>").attr({
    class: "row",
    id: index,
  });
  $(".renderTimeblocks").append(timeblockRow);

  // creates time field
  var hourCol = $("<div>")
    .text(hour.time + hour.meridiem)
    .attr({
      class: "col-md-2 hour",
    });

  // creates schdeduler data
  var eventsDisplayCol = $("<div>").attr({
    class: "col-md-9 event p-4",
  });
  var textareaElement = $("<textarea>");
  eventsDisplayCol.append(textareaElement);
  textareaElement.attr({ class: "event", id: "textarea" + index });

  //IF statement to colour code past, present and future events
  if (hour.time < moment().format("HH")) {
    eventsDisplayCol.addClass("past");
  } else if (hour.time === moment().format("HH")) {
    eventsDisplayCol.addClass("present");
  } else {
    eventsDisplayCol.addClass("future");
  }

  const saveButtonSpan = $(
    "<span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span>"
  ).attr("id", hour.id);
  const saveEventButton = $("<button>").attr({
    class: "float-right saveBtn",
  });
  saveEventButton.append(saveButtonSpan);
  timeblockRow.append(hourCol, eventsDisplayCol, saveEventButton);
} // Function executed when user clicks on one of the add buttons
function addEvents(response) {
  response.preventDefault();
  const saveIndex = response.target.id;
  const eventValue = response.currentTarget[0].value;
  dayPlannerInfo[saveIndex].event = eventValue;

  console.log(dayPlannerInfo);
  saveEvents();
  displayEvents();
}
// For each to replicate times and events within display window
dayPlannerInfo.forEach(hourlyTimeblock);
// Execution of setLocalStorage function
setLocalStorage();
// Event listener for form elements within display window
$("form").submit(addEvents);

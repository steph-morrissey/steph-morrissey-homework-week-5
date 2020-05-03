// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
});
let dayPlannerInfo = [
  { id: "0", time: "09", meridiem: "am", event: "" },
  { id: "1", time: "10", meridiem: "am", event: "" },
  { id: "2", time: "11", meridiem: "am", event: "" },
  { id: "3", time: "12", meridiem: "pm", event: "" },
  { id: "4", time: "13", meridiem: "pm", event: "" },
  { id: "5", time: "14", meridiem: "pm", event: "" },
  { id: "6", time: "15", meridiem: "pm", event: "" },
  { id: "7", time: "16", meridiem: "pm", event: "" },
  { id: "8", time: "17", meridiem: "pm", event: "" },
];
// Variable for displaying current date
const currentDate = moment().format("dddd, MMMM Do");

//Display current date
function displayCurrentDate() {
  $("#date-display").text(currentDate);
}

// save events data to localStorage
function saveEvents() {
  localStorage.setItem("dayPlannerInfo", JSON.stringify(dayPlannerInfo));
}

function displayEvents() {
  dayPlannerInfo.forEach(function (eachHour) {
    $("#" + eachHour.id + "").val(eachHour.event);
    console.log("#" + eachHour.id + "");
  });
}
displayCurrentDate();

function addToLocalStorage() {
  let savedDayPlannerInfo = JSON.parse(localStorage.getItem("dayPlannerInfo"));

  if (savedDayPlannerInfo) {
    dayPlannerInfo = savedDayPlannerInfo;
  }

  saveEvents();
  displayEvents();
}
// Display timeblocks within timeblocks div
function hourlyTimeblock(hour) {
  // creates timeblocks row
  var timeblockRow = $("<form>").attr({
    class: "row",
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
  var textareaElement = $("<textarea>").addClass("texty");
  eventsDisplayCol.append(textareaElement);
  textareaElement.attr({ id: hour.id }, { class: "event" });
  console.log(hour.id);

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
  );
  const saveEventButton = $("<button>").attr({
    class: "float-right saveBtn",
  });
  saveEventButton.append(saveButtonSpan);
  timeblockRow.append(hourCol, eventsDisplayCol, saveEventButton);
}

dayPlannerInfo.forEach(hourlyTimeblock);
addToLocalStorage();

function addEvent(response) {
  response.preventDefault();

  const eventIndex = event.currentTarget.form[0].id;
  const dayPlannerIndex = dayPlannerInfo[eventIndex].event;
  const dayPlannerPush = event.currentTarget.form[0].value;
  dayPlannerInfo[eventIndex].splice(0, 0, dayPlannerPush);
  console.log(dayPlannerIndex);
  console.log(dayPlannerInfo);
  console.log(dayPlannerPush);
}

$(".saveBtn").on("click", addEvent);

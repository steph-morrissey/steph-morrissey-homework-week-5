// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
});

const now = moment();

$("#date-display").text(now);

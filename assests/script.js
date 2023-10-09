$(function () {
  var currentHour = dayjs().format("H");

  for (var i = 9; i <= 17; i++) {
    var time = i + " AM";
    if (i > 12) {
      time = (i - 12) + " PM";
    }


    var timeBlockHTML = `
      <div id="hour-${i}" class="row time-block ${i < currentHour ? 'past' : (i == currentHour ? 'present' : 'future')}">
        <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
        <textarea class="col-8 col-md-9 description" rows="3">${localStorage.getItem(`hour-${i}`) || ''}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
        </button>
        <button class="btn deleteBtn col-2 col-md-1 bg-danger round-end" aria-label="delete">
        <i class="fas fa-trash" aria-hidden="true"></i>
        </button>
        </div>
    `;
    $('.container-lg').append(timeBlockHTML);

  }
  $(".saveBtn").on("click", function (event) {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, JSON.stringify(userInput));
    $('#saveAllEntryModal').modal('show');
  }); 

  $(".deleteBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    localStorage.removeItem(timeBlockId);
    $(this).siblings(".description").val('');
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY")); 
});

$(function () {
  $("textarea").each(function () {
    var task = $(this);
    for (var i = 0; i < localStorage.length; i++) {
      info = localStorage.key(i);
      taskId = $(this).siblings("div").attr("id");
      if (info == taskId) {
        task.val(JSON.parse(localStorage.getItem(info)));
      }
    }
  })
});

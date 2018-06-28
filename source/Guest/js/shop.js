$(document).ready(function() {
  // Mouseenter overlay
  $("ul#gallery li").on("mouseenter", function() {
    // Get data attribute values
    let title = $(this)
      .children()
      .data("title");
    let desc = $(this)
      .children()
      .data("desc");

    // Validation
    if (desc == null) {
      desc = "Click để xem chi tiết";
    }

    if (title == null) {
      title = "";
    }

    // Create overlay div
    $(this).append('<div class="overlay"></div>');

    // Get the overlay div
    let overlay = $(this).children(".overlay");

    // Add html to overlay
    overlay.html("<h3>" + title + "</h3><p>" + desc + "</p>");

    // Fade in overlay
    overlay.fadeIn(400);
  });

  // Mouseleave overlay
  $("ul#gallery li").on("mouseleave", function() {
    // Create overlay div
    $(this).append('<div class="overlay"></div>');

    // Get the overlay div
    let overlay = $(this).children(".overlay");

    // Fade out overlay
    overlay.fadeOut(200);
  });
});

$(document).ready(function () {
  // TOOLTIP
  $("a").tooltip();
  $("i").tooltip();

  // REFRESH SPINNER

  // SELECTOR WIDGET
  $(".ms-selectable li, .ms-selected li").click(function () {
    $(this).toggleClass("ms-container selected");
  });

  $("#update").on("click", function (e) {
    var $icon = $(this).find(".icon-refresh"),
      animateClass = "icon-refresh-animate";

    $icon.addClass(animateClass);
    // setTimeout is to indicate some async operation
    window.setTimeout(function () {
      $icon.removeClass(animateClass);
    }, 500);
  });

  // POPOVER
  var elem =
    '<div class="text-right"><a class="btn btn-mini"><i class="icon-ok"></i></a><a id="close-popover" data-toggle="clickover" class="btn btn-mini" onclick="$(&quot;.header-text&quot;).popover(&quot;hide&quot;);"><i class="icon-remove"></i></a></div>';
  var titleVar =
    '<input type="text" class="input-medium" placeholder="type here">';

  $(".header-text").popover({
    animation: false,
    content: elem,
    html: true,
    title: titleVar,
  });

  // modify popover to close all others when one is closed
  $('[data-toggle="popover"]').popover();
  $("body").on("click", function (e) {
    $('[data-toggle="popover"]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (
        !$(this).is(e.target) &&
        $(this).has(e.target).length === 0 &&
        $(".popover").has(e.target).length === 0
      ) {
        $(this).popover("hide");
      }
    });
  });

  // PIE CHART
  var pieData = [
    {
      value: 300,
      color: "#F7464A",
      highlight: "#FF5A5E",
      label: "Red",
    },
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green",
    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow",
    },
    {
      value: 40,
      color: "#949FB1",
      highlight: "#A8B3C5",
      label: "Grey",
    },
    {
      value: 120,
      color: "#4D5360",
      highlight: "#616774",
      label: "Dark Grey",
    },
  ];

  window.onload = function () {
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);
  };

  function someFunction(testVar) {
    $(testVar).toggleClass("ms-container selected", true);
  }
  function someFunction2(testVar) {
    $(testVar).toggleClass("ms-container selected", false);
  }

  // TOGGLE ICONS DURING COLLAPSE

  $(".collapse")
    .on("show", function () {
      $(this)
        .parent()
        .find(".icon-chevron-right")
        .removeClass("icon-chevron-right")
        .addClass("icon-chevron-down");
    })
    .on("hide", function () {
      $(this)
        .parent()
        .find(".collapsed")
        .find(".icon-chevron-down")
        .removeClass("icon-chevron-down")
        .addClass("icon-chevron-right");
    });

  // COLOR PICKER
  $(".colorpicker").colorpicker();

  // AUDIO PLAYER
  function playPause() {
    var audioPlayer = document.getElementsByTagName("audio")[0];
    if (audioPlayer != undefined) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    } else {
      loadPlayer();
    }
  }

  function stop() {
    var audioPlayer = document.getElementsByTagName("audio")[0];
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  // TIMEPICKER
  $(".timepicker-default").timepicker();

  function moveLeft() {
    $("#selectedColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).hasClass("selected")) {
          var currentLiID = $(this).attr("id");
          $element = $(this).wrap("<li>").parent();
          $("#availableColumnsUL").append($element.html());
          $(this).remove();
          $("#availableColumnsUL li:last-child").click(function () {
            $(this).toggleClass("ms-container selected");
          });
          $("#availableColumnsUL li:last-child").trigger("click");
          $("#columnPreviewTable tbody tr:first-child")
            .find("td." + currentLiID)
            .remove();
        }
      });

    $("#availableColumnsDiv")
      .find("input[type='hidden']")
      .each(function () {
        $(this).attr("name", "");
      });

    $("#selectedColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).html() == "" || $(this).html == undefined) {
          $(this).remove();
        }
      });
  }

  function moveRight() {
    $("#availableColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).hasClass("selected")) {
          var currentLiID = $(this).attr("id");
          $element = $(this).clone().wrap("<li>").parent();
          $("#selectedColumnsUL").append($element.html());
          $(this).remove();
          var templateBackup = $("#previewRowTemplate").html();
          $("#previewRowTemplate")
            .find("#rowInput")
            .val($(this).find("span").html());
          $("#previewRowTemplate")
            .find("#rowInput")
            .attr("value", $(this).find("span").html());
          $("#columnPreviewTable tbody tr:first-child").append(
            '<td class="' +
              currentLiID +
              '">' +
              $("#previewRowTemplate").html() +
              "</td>"
          );
          $("#previewRowTemplate").html(templateBackup);

          $("#selectedColumnsUL li:last-child").click(function () {
            $(this).toggleClass("ms-container selected");
            if ($(this).hasClass("selected")) {
              $("#columnPreviewTable tbody tr:first-child")
                .find("td." + currentLiID)
                .css("background-color", "#48A6D2");
            } else {
              $("#columnPreviewTable tbody tr:first-child")
                .find("td." + currentLiID)
                .css("background-color", "");
            }
          });
          $("#selectedColumnsUL li:last-child").trigger("click");
        }
      });
    $("#selectedColumnsDiv")
      .find("input[type='hidden']")
      .each(function () {
        $(this).attr("name", "selectedColumn");
      });

    $("#availableColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).html() == "" || $(this).html == undefined) {
          $(this).remove();
        }
      });
  }

  function moveUp() {
    $("#selectedColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).hasClass("selected")) {
          var currentLiID = $(this).attr("id");
          $(this).insertBefore($(this).prev());
          $(this).toggleClass("ms-container selected");
          $("#columnPreviewTable tbody tr:first-child")
            .find("td." + currentLiID)
            .insertBefore(
              $("#columnPreviewTable tbody tr:first-child")
                .find("td." + currentLiID)
                .prev()
            );
          if ($(this).hasClass("selected")) {
            $("#columnPreviewTable tbody tr:first-child")
              .find("td." + currentLiID)
              .css("background-color", "#48A6D2");
          } else {
            $("#columnPreviewTable tbody tr:first-child")
              .find("td." + currentLiID)
              .css("background-color", "");
          }
        }
      });
  }

  function moveDown() {
    $("#selectedColumnsDiv")
      .find("li")
      .each(function () {
        if ($(this).hasClass("selected")) {
          var currentLiID = $(this).attr("id");
          $(this).insertAfter($(this).next());
          $(this).toggleClass("ms-container selected");
          $("#columnPreviewTable tbody tr:first-child")
            .find("td." + currentLiID)
            .insertAfter(
              $("#columnPreviewTable tbody tr:first-child")
                .find("td." + currentLiID)
                .next()
            );
          if ($(this).hasClass("selected")) {
            $("#columnPreviewTable tbody tr:first-child")
              .find("td." + currentLiID)
              .css("background-color", "#48A6D2");
          } else {
            $("#columnPreviewTable tbody tr:first-child")
              .find("td." + currentLiID)
              .css("background-color", "");
          }
        }
      });
  }
});

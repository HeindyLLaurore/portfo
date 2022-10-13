/*
	Highlights by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $html = $("html");

  // Breakpoints.
  breakpoints({
    large: ["981px", "1680px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch mode.
  if (browser.mobile) {
    var $wrapper;

    // Create wrapper.
    $body.wrapInner('<div id="wrapper" />');
    $wrapper = $("#wrapper");

    // Hack: iOS vh bug.
    if (browser.os == "ios")
      $wrapper.css("margin-top", -25).css("padding-bottom", 25);

    // Pass scroll event to window.
    $wrapper.on("scroll", function () {
      $window.trigger("scroll");
    });

    // Sidebar.
    // if ($sidebar.length > 0) {
    //   var $sidebar_a = $sidebar.find("a");

    //   $sidebar_a
    //     .addClass("scrolly")
    //     .on("click", function () {
    //       var $this = $(this);

    //       // External link? Bail.
    //       if ($this.attr("href").charAt(0) != "#") return;

    //       // Deactivate all links.
    //       $sidebar_a.removeClass("active");

    //       // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
    //       $this.addClass("active").addClass("active-locked");
    //     })
    //     .each(function () {
    //       var $this = $(this),
    //         id = $this.attr("href"),
    //         $section = $(id);

    //       // No section for this link? Bail.
    //       if ($section.length < 1) return;

    //       // Scrollex.
    //       $section.scrollex({
    //         mode: "middle",
    //         top: "-20vh",
    //         bottom: "-20vh",
    //         initialize: function () {
    //           // Deactivate section.
    //           $section.addClass("inactive");
    //         },
    //         enter: function () {
    //           // Activate section.
    //           $section.removeClass("inactive");

    //           // No locked links? Deactivate all links and activate this section's one.
    //           if ($sidebar_a.filter(".active-locked").length == 0) {
    //             $sidebar_a.removeClass("active");
    //             $this.addClass("active");
    //           }

    //           // Otherwise, if this section's link is the one that's locked, unlock it.
    //           else if ($this.hasClass("active-locked"))
    //             $this.removeClass("active-locked");
    //         },
    //       });
    //     });
    // }

    // Scrolly.
    $window.on("load.hl_scrolly", function () {
      $(".scrolly").scrolly({
        speed: 1500,
        parent: $wrapper,
        pollOnce: true,
      });

      $window.off("load.hl_scrolly");
    });

    // Enable touch mode.
    $html.addClass("is-touch");
  } else {
    // Scrolly.
    $(".scrolly").scrolly({
      speed: 1500,
    });
  }

  // Header.
  var $header = $("#header"),
    $headerTitle = $header.find("header"),
    $headerContainer = $header.find(".container");

  // Make title fixed.
  if (!browser.mobile) {
    $window.on("load.hl_headerTitle", function () {
      breakpoints.on(">medium", function () {
        $headerTitle
          .css("position", "fixed")
          .css("height", "auto")
          .css("top", "50%")
          .css("left", "0")
          .css("width", "100%")
          .css("margin-top", $headerTitle.outerHeight() / -2);
      });

      breakpoints.on("<=medium", function () {
        $headerTitle
          .css("position", "")
          .css("height", "")
          .css("top", "")
          .css("left", "")
          .css("width", "")
          .css("margin-top", "");
      });

      $window.off("load.hl_headerTitle");
    });
  }

  // Scrollex.
  breakpoints.on(">small", function () {
    $header.scrollex({
      terminate: function () {
        $headerTitle.css("opacity", "");
      },
      scroll: function (progress) {
        // Fade out title as user scrolls down.
        if (progress > 0.5) x = 1 - progress;
        else x = progress;

        $headerTitle.css("opacity", Math.max(0, Math.min(1, x * 2)));
      },
    });
  });

  breakpoints.on("<=small", function () {
    $header.unscrollex();
  });

  // Main sections.
  $(".main").each(function () {
    var $this = $(this),
      $primaryImg = $this.find(".image.primary > img"),
      $bg,
      options;

    // No primary image? Bail.
    if ($primaryImg.length == 0) return;

    // Create bg and append it to body.
    $bg = $('<div class="main-bg" id="' + $this.attr("id") + '-bg"></div>')
      .css(
        "background-image",
        'url("assets/css/images/overlay.png"), url("' +
          $primaryImg.attr("src") +
          '")'
      )
      .appendTo($body);

    // Scrollex.
    $this.scrollex({
      mode: "middle",
      delay: 200,
      top: "-10vh",
      bottom: "-10vh",
      init: function () {
        $bg.removeClass("active");
      },
      enter: function () {
        $bg.addClass("active");
      },
      leave: function () {
        $bg.removeClass("active");
      },
    });
  });
})(jQuery);

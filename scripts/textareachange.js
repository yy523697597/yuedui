/**
 * Created by yu on 2016/10/28 0028.
 */
//通过按钮改变textarea的大小
$(function changtextarea() {
  var $message = $("#message");
  $(".bigger").click(function () {
    if (!$message.is(":animated")) {
      if ($message.height() < 500) {
        $message.animate({ height: "+=50" }, 400);
      }
    }
  });
  $(".smaller").click(function () {
    if (!$message.is(":animated")) {
      if ($message.height() > 100) {
        $message.animate({ height: "-=50" }, 400);
      }
    }
  });
});
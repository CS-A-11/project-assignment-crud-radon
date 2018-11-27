$(document).ready(function () {
  $('#comment-form').submit(function (e) {
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      dataType: 'json',
      success: function(data)
      {
        var comment = '<div class="posted-comment"><div class="user-info"><img src="/images/userIcon.png"><div class="name-date"><a href="5bf2f05c41f3e224680e667e"><h6>' + data.user.name +'</h6></a><p>' + data.date + '</p></div></div><p class="comment-body">' + data.comment + '</p></div>';
        $('#result-add-comment').prepend(comment);
      }
    });

    e.preventDefault();
  });
});
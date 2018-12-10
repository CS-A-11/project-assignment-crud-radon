$(document).ready(function () {
  $('#signup-form').submit(function (e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: "/api/user/check_user",
      data: form.serialize(),
      dataType: 'json',
      success: function(data)
      {
        $.ajax({
          type: "POST",
          url: url,
          data: form.serialize(),
          dataType: 'json',
          success: function (data) {
            window.location.replace("/");
          },
          error: function (xhr, status) {
            console.log(xhr);
          }
        });
      },
      error: function (xhr, status) {
        console.log(xhr);
        var response = '<p class="alert alert-danger" style="margin-top: 10px;">' + xhr.responseJSON.status + '</p>';
        $('#response').empty();
        $('#response').append(response);
      }
    });
  });
  $('#signin-form').submit(function (e) {
    var form = $(this);
    var url = form.attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      dataType: 'json',
      success: function(data)
      {
        window.location.replace("/");
      },
      error: function (xhr, status) {
        var response = '<p class="alert alert-danger" style="margin-top: 10px;">' + xhr.responseJSON.message + '</p>';
        $('#response').empty();
        $('#response').append(response);
      }
    });
    e.preventDefault();
  });
  $('#searchText').keypress(function (e) {
    var c = String.fromCharCode(e.which);
    var textValue = $(this).val() + c;
    var url = '/api/user/search_articles?searchText=' + textValue;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        $('#result').empty();
        var tags = '';
        for (var i = 0; i < json.length; i++) {
          var id = '';
          var address = '/article_post/' + json[i]._id;
          tags += '<div style="padding-bottom: 10px;"><a href='+address+' style="text-decoration: none"><h4>' + json[i].title + '</h4></a></div>';
        }
        $('#result').append(tags);
      },
      error: function (xhr, status) {
        console.log(xhr);
      },
    });
  });
});
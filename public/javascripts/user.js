$(document).ready(function () {
  $('#searchText').keypress(function (e) {
    var c = String.fromCharCode(e.which);
    var textValue = $(this).val() + c;
    var url = '/api/user/search_articles?searchText=' + textValue;
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        console.log(json);
        $('#result').empty();
        var tags = '';
        for (var i = 0; i < json.length; i++) {
          var id = '';
          tags += '<div style="padding-bottom: 10px;"><a href="#" style="text-decoration: none"><h4>' + json[i].title + '</h4></a></div>';
        }
        $('#result').append(tags);
      },
      error: function (xhr, status) {
        console.log(xhr);
      },
    });
  });
});
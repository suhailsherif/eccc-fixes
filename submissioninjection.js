window.checkAuthor = function() {
  var names = document.getElementById('firstname').value.split(/[^a-zA-ZÀ-ÿ0-9]/);
  if (names.length==1 && names[0].length > 0)
  {
    ajax('/ajax/author/' + names[0], 'authorSuggestions');
  }
  else if(names.length>1)
  {
    document.getElementById('authorSuggestions').innerHTML='Please enter the first name only, without any spaces or special characters.';
  }
  else
  {
    document.getElementById('authorSuggestions').innerHTML='';
  }
}

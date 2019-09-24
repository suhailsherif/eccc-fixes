var script = document.createElement('script');
var scriptContent = ""+
"function checkAuthor()"+
"{"+
"  var names = document.getElementById('firstname').value.split(/[^a-zA-ZÀ-ÿ0-9]/);"+
"  if (names.length==1 && names[0].length > 0)"+
"  {"+
"    ajax('/ajax/author/' + names[0], 'authorSuggestions');"+
"  }"+
"  else if(names.length>1)"+
"  {"+
"    document.getElementById('authorSuggestions').innerHTML='Please enter the first name only, without any spaces or special characters.';"+
"  }"+
"  else"+
"  {"+
"    document.getElementById('authorSuggestions').innerHTML='';"+
"  }"+
"}";
script.appendChild(document.createTextNode(scriptContent));
(document.body || document.head || document.documentElement).appendChild(script);

// Thank you Liran Brimer (https://stackoverflow.com/questions/3955803/page-variables-in-content-script) for the solution.

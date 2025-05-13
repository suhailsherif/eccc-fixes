# ECCC Fixes

This is the source code for an extension available on [Firefox](https://addons.mozilla.org/en-US/firefox/addon/eccc-fixes/)[^1] and [Chrome](https://chrome.google.com/webstore/detail/open-eccc-pdfs-in-browser/lnifepjecfiflmicmonkioobagcnfehf). The primary purpose of the extension was to let browsers open ECCC PDFs. It has since expanded to also fix a bug in adding authors during submission.

## Letting browsers open PDFs

When a report is requested from ECCC, the server responds with the PDF but sets the Content-Disposition in the header to "attachment", which tells the browser to download it. By changing it to "inline", this extension lets the browser deal with it the way it generally would when presented with a PDF.

To change the header, this extension uses chrome's *declarativeNetRequest* API to modify headers of responses from any site of the form **https://eccc.weizmann.ac.il/report/*/download/**. The rule for this change is in **headerrule.json**.

## Submission-time author-adding bug

When adding a coauthor during a submission, ECCC makes life a bit easier by suggesting completions. It does so by seeing what firstname you've entered, asking the server for completions, and adding those completions to the suggestions box. However, if one puts a space or special character while writing the name, the server responds with a *Page Not Found* page. The submission page then tries to fit the *Page Not Found* page into the suggestion box, thus confusing the browser and managing to delete everything on the page. The page then needs to be refreshed and the submission must then start anew.

This extension fixes this behaviour by changing the code that asks the server for completions. The changed code now sanitizes the first name, making sure it doesn't have spaces or special characters, and only then asks the server for completions. If it does have spaces or special characters, a helpful error message is given in the suggestion box.

To change the code, the extension runs **submissioninjection.js** whenever **https://eccc.weizmann.ac.il/submit/paper/** is done loading, as specified in the **content_scripts** section of **manifest.json**. All **submissioninjection.js** does is to redefine **checkAuthor**. Both the original definition and the new one are given below.

Original definition (from **https://eccc.weizmann.ac.il/resources/js/upload.js**):

    function checkAuthor()
    {
        if (document.getElementById('firstname').value.length > 0)
        {
        ajax('/ajax/author/' + document.getElementById('firstname').value, 'authorSuggestions');
        }
        else
        {
        document.getElementById('authorSuggestions').innerHTML="";
        }
    }

New definition:

    function checkAuthor()
    {
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

[^1]: This README only has the source code for the Chrome extension, not the Firefox add-on (since the Chrome one was going to be deprecated unless I updated it). The source code for the Firefox add-on should be the one in a previous commit: **https://github.com/suhailsherif/eccc-fixes/tree/775b5eb83e633a85fea95f4999c38b4994015315**

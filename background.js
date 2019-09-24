var targetPage = "https://eccc.weizmann.ac.il/report/*/download/";

if(typeof browser === 'undefined') browser=chrome;

function rewriteDownloadResponseHeader(e) {
  e.responseHeaders.forEach(function(header){
    if (header.name.toLowerCase() == "content-disposition") {
      header.value = header.value.replace("attachment","inline");
    }
  });
  return {responseHeaders: e.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
  rewriteDownloadResponseHeader,
  {urls: [targetPage]},
  ["blocking", "responseHeaders"]
);

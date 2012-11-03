/**
 * Handles requests sent by the content script.  Shows an infobar.
 */
function onRequest(request, sender, sendResponse) {
  // The number of matches is sent in the request - pass it to the
  // infobar.
  var url = "infobar.html#" + request.link + "|"+request.price+"|"+request.name+"|"+request.eprice+"|"+request.price2+"|"+request.site;
    // Show the infobar on the tab where the request was sent.
  chrome.experimental.infobars.show({
    tabId: sender.tab.id,
    path: url
  });

  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

/*document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    window.open("about:blank", "_blank");
  }, false);
}, false);*/
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
});
chrome.browserAction.onClicked.addListener(function(tab)
{
    window.open("about:blank",'_blank');
});
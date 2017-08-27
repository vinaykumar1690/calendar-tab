// Client ID and API key from the Developer Console
var CLIENT_ID = '927963452819-r33rq18rit0taequfni5e9nqjgs28plr.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    CalApi.listCalendar('primary', 'primary')
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

var CalApi = (function() {
  /**
   * List events between the given start datetime and end datetime
   */
  var lEvents = function(calId, calSummary) {
    // List all events from 12:00AM to 11:59PM of current date
    var currDate = new Date()
    currDate.setHours(0)
    currDate.setMinutes(0)
    currDate.setSeconds(0)
    currDate.setMilliseconds(0)
    var eventsStartTime = currDate.toISOString()
    currDate.setHours(23)
    currDate.setMinutes(59)
    var eventsEndTime = currDate.toISOString()

    gapi.client.calendar.events.list({
      'calendarId': calId,
      'timeMin': eventsStartTime,
      'timeMax': eventsEndTime,
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    }).then(function(response) {
      var calevents = []
      var events = response.result.items;

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime
          if(!start) {
            start = event.start.date
          } else {
            start = new Date(start)
          }
          var end = event.end.dateTime
          if(!end) {
            end = event.end.date
          } else {
            end = new Date(end)
          }
          calevents.push([currDate.toISOString(), calSummary+':'+event.summary, start, end])
        }
      }

      if (calevents.length > 0) {
        drawChart(calevents)
      } else {
        appendPre('No events found')
      }

    });
  }

  return {
    listAllEvents: function() {
      gapi.client.calendar.calendarList.list().then( function (response) {
          calendars = response.result.items;
          if (calendars.length <= 0) {
            return
          }
          for(i = 0; i < calendars.length; i++) {
            lEvents(calendars[i].id, calendars[i].summary)
          }
        });
    },
    listCalendar: function(calId, calSummary) { lEvents(calId, calSummary) }
  }
})();

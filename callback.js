function initiateCallbackFlow() {
  const openIdUrl = GrabID.getGrabUrls().PRODUCTION;
  let appConfig = {
    clientId: 'put your clientid here', //Needs to be your clientID
    redirectUri: 'http://dev.naman.com:8000/callback.html', // Needs to be your redirect URL
    scope: ['openid', 'profile.read'].join(' '), // Needs to be the scope you need
    acrValues: ['consent_ctx:country=sg'].join(' ')
  };

  let grabIdClient = new GrabID(openIdUrl, appConfig)


  // 5. Handle the response
  GrabID.handleAuthorizationCodeFlowResponse()

  // 6. Make Token Request
  grabIdClient.getOpenIdConfiguration()
          .then(() => {
            grabIdClient.makeTokenRequest()
              .then(handleTokenResponse)
              .catch(error => alert(error.toString()))
          })
          .catch(error => alert(error.toString()))

}


function handleTokenResponse() {
  const result = GrabID.getResult();
  console.log(result);

  //7a. Send this access token to your backend
  const accessToken = result.accessToken;
  //7b. Or fetch profile at frontend
  getProfile(accessToken)
}

function getProfile(accessToken) {
  fetch('https://partner-api.grab.com/grabid/v1/oauth2/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(result => result.json())
  .then(result => {
    console.log(result);
  })
}


(() => {
  initiateCallbackFlow();
})();

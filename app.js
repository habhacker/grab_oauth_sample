function initiateOAuthFlow(){
  //1. Get the id_token from the URL parameter

  //2. Set the config parameters
  const openIdUrl = GrabID.getGrabUrls().PRODUCTION;
  let appConfig = {
    clientId: 'put here your clientID', //Needs to be your clientID
    redirectUri: 'http://dev.naman.com:8000/callback.html', // Needs to be your redirect URL
    scope: ['openid', 'profile.read'].join(' '), // Needs to be the scope you need
    acrValues: ['consent_ctx:country=sg'].join(' ')
  };

  //3. Get the grabIDClient
  let grabIdClient = new GrabID(openIdUrl, appConfig)


  //4. Make Authorization request
  grabIdClient.getOpenIdConfiguration()
          .then(() => {
            grabIdClient.makeAuthorizationRequest()
          })
          .catch(error => alert(error.toString()))

}

(() => {
  initiateOAuthFlow();
})();
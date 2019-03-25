# Manual Flow

## 1. Redirect to authorize URL
Use the following to generate the authorize url and redirect the user.

#### URL :  https://api.grab.com/grabid/v1/oauth2/authorize

#### Query Params

| Parameter     | Required      | Comments   | Example Value |
| ------------- |:-------------:| :-----     | :-----        |
| client_id     | Yes | ClientID from Grab.<br/> You can get this from https://developer.grab.com | 9e211821568d437e990802c3df6a5033
| scope     | Yes      |   Space separated scopes | openid profile.read
| response_type | Yes      |    Use "code" | code
| redirect_uri | Yes      |    URL of your app | http://dev.naman.com:8000/callback.html
| nonce | Yes      |    A random string. Recommend using b64 or hex encoded random string. This value will be included in the nonce claim in the id_token. The nonce should be compared to the value in id_token, when this token is obtained from the /token endpoint. |6yJV_adQssw5c
| state     | Yes      |   random string used to mitigate CSRF attacks. Calling application should compare the value supplied here with the value returned from the final redirect (which also has the state parameter). Recommend using b64 or hex encoded random string. | xMjM0NTY3ODkw
| code_challenge_method     | Yes      |   Use "S256" | S256
| code_challenge    | Yes      |  To generate this create a code_verifier which is a random string of [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~" with minium length 43 and max length 48.<br/>Save this code_verifier as you will need this later to get the token.<br/> code_challenge=Base64URLEncode(Sha256(code_verifier))<br/> You can use the [this website](https://gchq.github.io/CyberChef/#recipe=SHA2('256')From_Hex('Auto')To_Base64('A-Za-z0-9-_')&input=bmFtYW5uYW1hbm5hbWFubmFtYW5uYW1hbm5hbWFubmFtYW5uYW1hbm5hbWFubmFtYW5uYW1hbg) to generate code_challenge from code_verifier as an example.   | KF2QT4fwpMeJf36POk6yJV
| acr_values     | No      |   | consent_ctx:country=sg
| id_token_hint     | No      | If valid then login/registration phase will be skipped, during the oauth flow.  | eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ .....

#### Example Authorize URL
```
https://api.grab.com/grabid/v1/oauth2/authorize?client_id=d0052582fc3c4a8daf82943d0fb8686d&scope=openid%20profile.read&response_type=code&redirect_uri=http%3A%2F%2Fdev.naman.com%3A8000%2Fcallback.html&nonce=dsddfdfd&state=sdsdssdds&code_challenge_method=S256&code_challenge=YFqaxxIS29wohZen2Md-ffSc5Ecu2Ocs8Bta1bKY4fw&acr_values&id_token_hint
```

Note that incase this fails or user cancels the flow an `error` query param is added when the flow is returned to the redirect_url

## 2. Fetch the token
After successful oauth flow the app is redirected to your given redirect_url with two query parameters `code` and `state`. Verify that `state` is the same as what you send in the query params and then use the `/token` call to get the `access_token`.

#### URL :  https://api.grab.com/grabid/v1/oauth2/token

#### Method : POST

#### URL Form Encoded Params

|Parameter| Comments| Example|
|:----| :---- | :----|
|client_id| Client ID provided in step 1 | 9e211821568d437e990802c3df6a5033
|code_verifier| Code verifier for which code challenge was generated in step 1 | sometestcodeverifer....
|grant_type| Use "authorization_code" | authorization_code
|redirect_url| redirect_uri provided in step 1 | http://dev.naman.com:8000/callback.html
|code| Code returned to your app in query params | 26bf18f0ec05461fb6ba683f266c9182

#### Example curl request
```
curl --request POST \
  --url https://api.grab.com/grabid/v1/oauth2/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=d0052582fc3c4a8daf82943d0fb8686d&code_verifier=namannamannamannamannamannamannamannamannamannamannaman&grant_type=authorization_code&redirect_uri=http%3A%2F%2Fdev.naman.com%3A8000%2Fcallback.html&code=26bf18f0ec05461fb6ba683f266c9182'
```

This will return you `access_token` which you can use to get profile information.


## 3. Get Profile
You can use the `access_token` to get user profile

#### URL : https://api.grab.com/grabid/v1/oauth2/userinfo

#### Method: GET

#### Example curl request

```
curl --request GET \
  --url https://api.grab.com/grabid/v1/oauth2/userinfo \
  --header 'authorization: Bearer <PUT_ACCESS_TOKEN_HERE>' \
  --header 'content-type: application/json'
```


This is a sample app showing the OAuth flow of Grab


Basically its the following step whenever you want to initiate the OAuth Flow

On the page where we redirect to, when one clicks on the tile in super app. We will redirect to your URL with id_token in the url parameters.
These steps are coded in app.js

1. Fetch the id_token from url
2. Set the config parameters
3. Get the GrabID client
4. Make Authorization Request

After step 4 it will automatically redirect to Grab's website to ask for consent. After the consent we will redirect back to the URL provided by you
in step 2. After this you need to do the following steps on your redirected page. These are coded in callback.js

5. Handle the response (this will get the code from url)
6. Make Token Request (this will exchange the code for accessToken)
7. Now you can either send this accessToken to your backend or in frontend use this to get the profile details.


#Install GrabID SDK
Include the GrabID sdk using

<script type="text/javascript" src="https://unpkg.com/@grab-id/grab-id-client/dist/bundle.js"></script>

or

npm i @grab-id/grab-id-client




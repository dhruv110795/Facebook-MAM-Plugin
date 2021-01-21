$(document).ready(function(){
    $("#share").off("click");
    $("#share").on("click", function(){
        checkLoginState();
    });

    $("#postImage").off("click");
    $("#postImage").on("click", function(){
        postPhoto();
    });

    $("#poststatus").off("click");
    $("#poststatus").on("click", function(){
        poststatus();
        shareImage();
    });
});


function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
        FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        },{s});
    $("#status").text('Please log ' + 'into this webpage.');
    }
}

function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function() {
    FB.init({
        appId      : '750072185754568',
        cookie     : true,                     // Enable cookies to allow the server to access the session.
        xfbml      : true,                     // Parse social plugins on this webpage.
        version    : 'v7.0'           // Use this Graph API version for this call.
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $('#status').text('We are connected.');
            $('#status').text('');
        } else if (response.status === 'not_authorized') {
            $('#status').text('We are not logged in.');
        } else {
            $('#status').text('You are not logged into Facebook.');
        }
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      $('#status').text('Thanks for logging in, ' + response.name + '!');
    });
  }

function postPhoto(){
FB.api('/me/photos', 'POST', 
    { "url": 'https://www.facebook.com/photo?fbid=887913754705127&set=a.101746849988492'}, function(response) {
        console.log(">>>>>>>>>>>>>.",response);
        if(! response || response.error){
            console.log(">>>>",response);
        }else{
            console.log("idddddddd", response.id);
        }
});
}

function poststatus() {
FB.api('/me/feed', 'post', {message: 'my first status...'}, function(response) {
    console.log(">>poststatus==",response);
    $("#status").text(response.id);
});
}

function shareImage(){
    FB.ui({
        method: 'feed',
        link: 'http://karthavyaspace.com:8888/service/file//mnt/proxy_PROXY/HOME/dhruv/Pics/Hype%20-%20Posting%20v2.mp4.lowres.mp4'
      }, function(response){
          console.log(">>>",response);
      });
}
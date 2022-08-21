CIU = "https://socialmediaapp.azurewebsites.net/api/CIU/triggers/manual/invoke/rest/v1/users?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qxbUATLIDggXav6GoNcN4U1FzOQDk7cdsUHmaEshOIQ"; //create user
RAU = "https://socialmediaapp.azurewebsites.net/api/RAU/triggers/manual/invoke/rest/v1/users?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zfQMhgGpybqzqMEagzjc0OQeHYn3uzqxu0Uda_tcsdg "; //return all users
RIU = "https://socialmediaapp.azurewebsites.net:443/api/RIU/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=twe72NXCoRBB4opp_dGx9xNkX-lshGwLKR9ty0BRNSM";
RUBU = "https://socialmediaapp.azurewebsites.net:443/api/RUBU/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PVBFMUAN_q887OlnJ7xplH8doZSqtyhW-WvP99ycgl0";
UUF = "https://socialmediaapp.azurewebsites.net:443/api/UUF/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZnKYuhtEKzLm251HLOnHsGPBXt0YZmSYm3_loFtfWxY"; //updates user with a follow
RUF = "https://socialmediaapp.azurewebsites.net:443/api/RUF/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qBaElLSrQiDDIS17Tv5eoWQ8chQdc6qKaxGHnLiNGv4"; //return everyone that a user follows
DAF = "https://socialmediaapp.azurewebsites.net:443/api/DAF/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=El1S4EgQlxszghxuqTXXcRkCnEJTaGhEh_YQjPDXsyA"; //return all followers of a user
RNFU = "https://socialmediaapp.azurewebsites.net:443/api/RNFU/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Csc96bk4_fLR7-1_6ZuaXZgQuFQT3TmSrKppGuRmDXY";
IUPS = "https://socialmediaapp.azurewebsites.net:443/api/IUPS/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=auAuK2dQttUDuJsd4jdhBnZPiCuoqRC8sXkkK2MjhhU";
RAI = "https://socialmediaapp.azurewebsites.net:443/api/RAI/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VdoIGgTnNairT1r4jGfhCt5oZ2uDhXE8Of7-_nCUi4g";
RCFI = "https://socialmediaapp.azurewebsites.net:443/api/RCFI/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ca3fDhFKvYeFx1ZJYdzgSLzp3rr2iCS8jbxqbtdp75A";
ANC = "https://socialmediaapp.azurewebsites.net:443/api/ANC/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hJ7Pi49dBV3YTzYiFWrMVvkzrVbSLMKTVhBCrYs3mfI";

BLOB_ACCOUNT = "https://blobstoragesma.blob.core.windows.net";

var subObj;
var followerList = [];
var currentUser;
var user;
var user_ID;
var followers;
var followerIDs = [];
var allUserIDs = [];
var notFollowingIDs = [];
var images = [];
var comments;
var newfollower_ID;
var unfollow_ID;
var image_ID;
var username;
var retUsername;
var tempUser;
var comUsername;
var comment;
var newComment;
var tempImageID;
var imageID;

$(document).ready(function() {
  setUserLoggedIn();
  
  $("#logIn").click(function(){
    getCurrentUser();
  }); 

  $("#viewFeedBtn").click(function(){
    getImages();
  }); 

  $("#followersBtn").click(function(){
    fillFollowerList();
  }); 

  $("#usersBtn").click(function(){
    getUsersNotFollowing();
  }); 

  $("#subNewUser").click(function(){
    submitNewUser();
    $('#newAssetForm').hide();
    $('#forLogin').append($('<button type="button" id="loginBtn" class="btn"><a class="btnlink" href="login.html">Log in</a></button>'));
  }); 

  $("#subNewForm").click(function(){
    submitNewImage();
    clearValues();
  }); 

  $(document).on('click', '.subComment',function(){
    imageID = $(this).attr('id');
    newComment = document.getElementById(imageID).value;
    addNewComment(user_ID, imageID, newComment);
  });

  $("#signOutBtn").click(function(){
    localStorage.clear();
  }); 
});

function submitNewImage(){
  submitData = new FormData();
  submitData.append('UserID', user_ID);
  submitData.append('File', $("#UpFile")[0].files[0]);

  $.ajax({ 
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data', 
    contentType: false, 
    processData: false,
    type: 'POST',
  success: function(data){
  } });
}

function getImages(){
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>'); 
  var imageJSON = {
    userID: user_ID
  }
  imageJSON = JSON.stringify(imageJSON);

  $.post({
     url: RAI,
     data: imageJSON,
     contentType: 'application/json; charset=utf-8',
     async: false
   }).done(function (image) {
    $.each(image[0], function( key, val ) {
    var temp = val["UserID"];
    tempUser = getUsername(temp);
    tempImageID = val["imageID"];
      images.push("<div class='container' id='usernameSpace'><br><h6>Uploaded by: " + tempUser + "</h6><bR></div>"); 
      images.push("<div class='container' id='imageSpace'><br><img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br /></div>");
      images.push("<br><div class='container' id='commentSpace'><div class='row'><div class='col'></div><div class='col-8'><textarea class='form-control' rows='1' id='"+tempImageID+"' name='text' placeholder='Leave a comment...'> </textarea> </div><div class='col-2'><button type='button' id='"+ tempImageID +"' class='subComment'>Comment</button></div></div><br></div>"); 
      returnComments(tempImageID);
    });

    $('#ImageList').empty();
    
    $( "<ul/>", {
      "class": "my-image-list", 
      html: images.join( "" )
    }).appendTo( "#ImageList" ); 
  });
    
}

function submitNewUser(){
  subObj = {
    FirstName: $('#FirstName').val(),
    Surname: $('#Surname').val(),
    Username: $('#Username').val(),
    Email: $('#Email').val(),
    Password: $('#Password').val()
  }

 subObj = JSON.stringify(subObj);

  $.post({
     url: CIU,
     data: subObj,
     contentType: 'application/json; charset=utf-8'
   }).done(function (response) {
    
  });
}

function getUsers(){
  $('#UsersList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAU, function( data ) {

    var items = [];
      
    $.each( data[0], function( key, val) {
      if(user_ID != val["UserID"]){
      items.push(val["Username"] + " "); 
      allUserIDs.push(val["UserID"]); 
      items.push("<button class='btn follow' id='followBtn'>Follow</button>" + "<br/>"+ "<br/>");
      }
      });
      $('#UsersList').empty();

      $( "<ul/>", {
        "class": "user-list",
        html: items.join( "" )
      }).appendTo( "#UsersList" );
    });

}

function getUsersNotFollowing(){
  var followerJSON = {
    userID: user_ID
  }
  followerJSON = JSON.stringify(followerJSON);

  $.post({
     url: RNFU,
     data: followerJSON,
     contentType: 'application/json; charset=utf-8'
   }).done(function (notfollowers) {
    $('#UsersList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    var items = [];
      
    $.each(notfollowers[0], function(key, val){
      if(user_ID != val["UserID"]){
        items.push("<tr>")
        items.push("<td>" + "Username: " + val["Username"] + " "); 
        items.push("<td>" + "<button class='" + val["UserID"] + "' id='followBtn'>Follow</button>" + "<br/>"+ "<br/>");
        }
        });
        $(document).on('click', '#followBtn',function(){
          newfollower_ID = $(this).attr('class');
          updateFollowers(newfollower_ID);
        }); 
      
        $('#UsersList').empty();
  
        $( "<table>", {
          "class": "notfollowing-list",
          html: items.join( "" )
        }).appendTo( "#UsersList" );
    });
}

function getUserID(){
  var userIDjson = {
    Username: user
  }
  userIDjson = JSON.stringify(userIDjson);

  $.post({
     url: RIU,
     data: userIDjson,
     contentType: 'application/json; charset=utf-8'
   }).done(function (userID) {
    user_ID = (userID[0][0].userID);
    getFollowers();
  });
}

function getFollowers(){
  var followerJSON = {
    userID: user_ID
  }
  followerJSON = JSON.stringify(followerJSON);

  $.post({
     url: RUF,
     data: followerJSON,
     contentType: 'application/json; charset=utf-8'
   }).done(function (followers) {
    $.each(followers[0], function(key, val){
      followerIDs.push(val["UserID"])
    });
    
   });
}

function fillFollowerList(){
  getFollowers();
  var followerJSON = {
    userID: user_ID
  }
  followerJSON = JSON.stringify(followerJSON);

  $.post({
     url: RUF,
     data: followerJSON,
     contentType: 'application/json; charset=utf-8'
   }).done(function (followers) {
    $.each(followers[0], function(key, val){
      followerIDs.push(val["UserID"])
    });

  $('#FollowerList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>'); 
  $.each(followers[0], function(key, val){
    followerList.push("<tr>")
    followerList.push("<td>" + "Username: " + val["Username"] + " "); 
    followerList.push("<td>" + "<button class='"+ val["UserID"] + "' id='unfollowBtn'>Unfollow</button>" + "<br/>"+ "<br/>");
  });
  $(document).on('click', '#unfollowBtn',function(){
    unfollow_ID = $(this).attr('class');
    unfollow(unfollow_ID);
  }); 

  $('#FollowerList').empty();

  $( "<table>", {
        "class": "my-follower-list", 
        html: followerList.join( "" )
        }).appendTo( "#FollowerList" );
   });
}

function clearValues(){
  $('input[type=text]').each(function() {
    $(this).val('');
  });

  $('input[type=file]').each(function() {
    $(this).val('');
  });
}

function getCurrentUser(){
  currentUser = $('#Username').val();
  localStorage.setItem('user', currentUser);
}

function setUserLoggedIn(){
  user = localStorage.getItem('user');
  $('#currentUser').append(user);
  getUserID();
};

function updateFollowers(newfollower_ID){
  var newFollowerJSON = {
    followerID: newfollower_ID,
    UserID: user_ID
  };
  newFollowerJSON = JSON.stringify(newFollowerJSON);

  $.post({ 
     url: UUF,
     data: newFollowerJSON,
     contentType: 'application/json; charset=utf-8'
  }).done(function (data){
  });
}

function unfollow(){
  var unfollowJSON = {
    followerID: unfollow_ID,
    UserID: user_ID
  };
  unfollowJSON = JSON.stringify(unfollowJSON);

  $.post({ 
     url: DAF,
     data: unfollowJSON,
     contentType: 'application/json; charset=utf-8'
  }).done(function (data){
  });
}

function getUsername(user_ID){
  var usernameJSON = {
    UserID: user_ID
  }
  usernameJSON = JSON.stringify(usernameJSON);

  $.post({
     url: RUBU,
     data: usernameJSON,
     contentType: 'application/json; charset=utf-8',
     async: false
   }).done(function (retUsername) { 
    username = (retUsername[0][0].Username);
  });
  
   return username;
}

function addNewComment(user_ID, image_ID, newComment){
  var newCommentJSON = {
    UserID: user_ID,
    ImageID: image_ID,
    Comment: newComment
  }
  newCommentJSON = JSON.stringify(newCommentJSON);

  $.post({
     url: ANC,
     data: newCommentJSON,
     contentType: 'application/json; charset=utf-8',
   }).done(function (data) { 
  });
}

function returnComments(image_ID){
  var commentsJSON = {
    ImageID: image_ID
  }
  commentsJSON = JSON.stringify(commentsJSON);

  $.post({
     url: RCFI,
     data: commentsJSON,
     contentType: 'application/json; charset=utf-8',
     async: false
   }).done(function (retComments) { 
    $.each(retComments[0], function( key, val ) {
      
      images.push("<div id='comments' style='text-align:left;'> <p> &nbsp;&nbsp;&nbsp;"+ val['Username'] + " said: " + val['Comment']+ "</p></div>");
    });

  });
}


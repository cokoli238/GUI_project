 // Initialize Firebase
 $.getScript('https://www.gstatic.com/firebasejs/3.4.0/firebase.js', function () {
  var config = {
    apiKey: "AIzaSyBj75wWTbiB_-Vv0qyoZ8Lgbz29eqoNckk",
    authDomain: "plan-by-requirments-da402.firebaseapp.com",
    databaseURL: "https://plan-by-requirments-da402.firebaseio.com",
    projectId: "plan-by-requirments-da402",
    storageBucket: "plan-by-requirments-da402.appspot.com",
    messagingSenderId: "181453521741"
  };
  firebase.initializeApp(config);
    var rootRef = firebase.database().ref();
    var postComments = rootRef.child('postComments');
    var link = $("link[rel='canonical']").attr("href");
    var pathkey = decodeURI(link.replace(new RegExp('\\/|\\.', 'g'),"_"));
    var postRef = postComments.child(pathkey);
    $("#comment").submit(function() {
        postRef.push().set({
            name: $("#name").val(),
            message: $("#message").val(),
            md5Email: md5($("#email").val()),
            postedAt: firebase.database.ServerValue.TIMESTAMP
        });
        $("input[type=text], textarea").val("");
        return false;
    });    
    postRef.on("child_added", function(snapshot) {
        var newComment = snapshot.val();
        var converter = new showdown.Converter({ extensions: ['xssfilter'] });
        converter.setFlavor('github');
        var markedMessage = converter.makeHtml(newComment.message);
        var html = "<div class='comment'>";
        html += "<h4>" + newComment.name + "</h4>";
        html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.md5Email + "?s=100&d=retro'/></div>";
        html += "<span class='date'>" + jQuery.timeago(newComment.postedAt) + "</span>"
        html += "<p>" + markedMessage  + "</p></div>";
        $("#comments-container").prepend(html);
    });
}
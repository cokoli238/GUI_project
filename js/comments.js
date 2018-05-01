 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBj75wWTbiB_-Vv0qyoZ8Lgbz29eqoNckk",
    authDomain: "plan-by-requirments-da402.firebaseapp.com",
    databaseURL: "https://plan-by-requirments-da402.firebaseio.com",
    projectId: "plan-by-requirments-da402",
    storageBucket: "plan-by-requirments-da402.appspot.com",
    messagingSenderId: "181453521741"
  };
  firebase.initializeApp(config);

  var ref = new Firebase("https://plan-by-requirments-da402.firebaseio.com");
  postRef = ref.child(slugify(window.location.pathname));

    postRef.on("child_added", function(snapshot) {
      var newPost = snapshot.val();
      $(".comments").prepend('<div class="comment">' +
        '<h4>' + escapeHtml(newPost.name) + '</h4>' +
        '<div class="profile-image"><img src="https://www.viawater.nl/files/default-user.png' + escapeHtml(newPost.md5Email) + '?s=100&d=retro"/></div> ' +
        '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + escapeHtml(newPost.message)  + '</p></div>');
    });

    $("#comment").submit(function() {
      var a = postRef.push();
      
      a.set({
        name: $("#name").val(),
        message: $("#message").val(),
        md5Email: md5($("#email").val()),
        postedAt: Firebase.ServerValue.TIMESTAMP
      });

      $("input[type=text], textarea").val("");
      return false;
    });
});

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}


function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
} 
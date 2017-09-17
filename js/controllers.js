var url = "https://dl.dropbox.com/s/gtjkjehn28dsfoz/portfolio.json?dl=1";
var data = null;

var prefs = {
  projects: 0
};

//Get all content externally from Dropbox
var getData = function() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200 )
      data = JSON.parse(xhr.response);
  }
  xhr.send();
}
getData();

var isMobile = function() {
  var OP = ons.platform;
  return OP.isIOS() || OP.isAndroid() || OP.isBlackBerry() || OP.isIE();
}

var notificationCntr = 0;
var notify = function(msg) {
  //Basic lock to prevent multiple notifications
  if(notificationCntr)
    return;
  notificationCntr++;

  //Save focused input
  var focused = document.activeElement;

  ons.notification.alert({message: msg, cancelable: true})
     .then(function(){
        notificationCntr--;

        //Return focus to input
        if(typeof focused.focus !== 'undefined')
          focused.focus();
     });

  //Set focus on button to allow easy cancellation
  setTimeout(function() { document.querySelector('.alert-dialog-button').focus(); });
}

var openLink = function(link) {
  window.open(link, "_target");
}

angular.module('app')

.controller("Menu", function($scope, $timeout){
  $scope.navLinks = ["#about", "#resume", "#projects"];

  $scope.init = function() {
    if(data == null){
      $timeout($scope.init);
      return;
    }

    $scope.headshot = data.headshot;
    $scope.quote = data.mainQuote;
    $timeout($scope.projects);
  }

  //NAVIGATOR
    $scope.about = function() {
      nav.resetToPage("html/about.html");
      $scope.showChosen(0);
    }

    $scope.resume = function() {
      nav.resetToPage("html/resume.html");
      $scope.showChosen(1);
    }

    $scope.projects = function() {
      nav.resetToPage("html/projects.html");
      $scope.showChosen(2);
    }

    $scope.showChosen = function(type) {
      angular.forEach($scope.navLinks, function(link, idx){
        angular.element(document.querySelector(link)).attr("style", "color: black; text-decoration: "+(idx == type ? "underline" : "none"));
      });
    }

  //Contact buttons
    $scope.email = function() {
      notify("svelingker@utexas.edu");
    }

    $scope.gitHub = function() {
      window.open("https://github.com/shivavelingker/", "_target");
    }

    $scope.phone = function() {
      notify("337 - 378 - 2028");
    }
})

.controller("Resume", function($scope){
  $scope.init = function() {}

  $scope.getResume = function() {
    openLink(data.resumeUrl);
  }
})

.controller("Projects", function($scope){
  $scope.intro_quote1 = data.projectIntroQuote1;
  $scope.intro_quote2 = data.projectIntroQuote2;
  $scope.projects = data.projects;

  $scope.init = function() {
    if(prefs.projects)
      $scope.reveal();
    else
      prefs.projects ^= 1;
  }

  $scope.close = function() {
    document.querySelector('#menu').style.display = "block";
    imgModal.hide();
  }

  $scope.feature = function(img) {
    document.querySelector('#menu').style.display = "none";

    $scope.featuredImg = img;
    imgModal.show();

    var image = document.querySelector('#featuredImg');
    image.onload = function(){
      image.style.maxHeight = window.innerHeight+"px";
      image.style.maxWidth = window.innerWidth+"px";
    }
  }

  $scope.getColor = function(language) {
    return data.languages[language];
  }

  $scope.openLink = function(link) {
    openLink(link);
  }

  $scope.reveal = function() {
    angular.forEach(document.querySelectorAll('.reveal'), function(obj){
      obj.style.opacity = 1;
    });
    angular.element(document.querySelector('.revealBtn')).attr("style", "display: none;");
  }
})

.filter("unsafe", function($sce){
  return function(val){
    return $sce.trustAsHtml(val);
  }
})
;

var getResume = function() {
  window.open("https://utexas.box.com/v/shiva-resume", "_target");
}

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

angular.module('app')

.controller("Menu", function($scope, $timeout){

  $scope.navLinks = ["#about", "#resume", "#projects"];

  $scope.init = function() {
    $timeout($scope.about);
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
        angular.element(document.querySelector(link)).attr("style", "text-decoration: "+(idx == type ? "underline" : "none"));
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

;
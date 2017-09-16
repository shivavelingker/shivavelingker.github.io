
var openLink = function(link) {
  window.open(link, "_target");
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

.controller("Projects", function($scope){
  $scope.projects = [
    {
      name: "UT Mail System Automator",
      type: 0,
      desc: "Improves inefficient mail system, created after working with UT Housing as an RA and seeing opportunity for growth",
      details: [],
      languages: ["AngularJS", "SeleniumJS"],
      img: null,
      link: null
    },{
      name: "Wellness Mind Map",
      type: 1,
      desc: "Creatively visualize digital journal data in interactive app to see how I'm progressing pragmatically",
      details: ["I wanted to replace a stagnant self-perception with a radically more accurate image", "Based on provable quantified data instead of conventional \"feel-good\" positive psychology", "Tracks the themes in my life and their interactions with each other"],
      languages: ["Python", "D3.js", "AngularJS"],
      img: "html/images/mind_map.png",
      link: "https://bit.ly/ShivaMindMap"
    },{
      name: "Interactive Degree Audit",
      type: 0,
      desc: "Remove the tedium of verifying on-time graduation in a more robust manner than alternatives",
      details: [],
      languages: ["AngularJS"],
      img: null,
      link: "https://bit.ly/ShivaDegree"
    },{
      name: "Carpe Diem Scheduling",
      type: 0,
      desc: "Manages calendars using basic systems design principles for effective time management to 'seize the day'",
      details: [],
      languages: ["AngularJS", "SQL"],
      img: null,
      link: null
    },{
      name: "Satya Steganography",
      type: 1,
      desc: "Hides images in plain sight (i.e., steganography) to protect sensitive data",
      details: [],
      languages: ["Python"],
      img: null,
      link: null
    }
  ];

  $scope.init = function() {
    //
  }

  $scope.openLink = function(link) {
    openLink(link);
  }
})

;
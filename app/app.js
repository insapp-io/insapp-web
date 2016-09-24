var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngDialog', 'ngColorThief', 'ngFileUpload', 'ngLoadingOverlay','angular-spinkit']);

app.config(['$loadingOverlayConfigProvider', function ($loadingOverlayConfigProvider) {
    $loadingOverlayConfigProvider.defaultConfig('<img style="display: block;margin-left: auto;margin-right: auto; width:50px" src="images/loader.gif"></img><h3>Chargement</h3>', 'rgba(0, 0, 0, 0.5)', '#fff');
  }
]);

app.config(function($routeProvider, $locationProvider, $colorThiefProvider) {
  $colorThiefProvider.setDefaultQuality(1);
  $colorThiefProvider.setDefaultColorCount(10);
  $colorThiefProvider.setReturnObjects(false);
  $locationProvider.html5Mode(false);
  $routeProvider
        .when('/', {
          templateUrl: "templates/login.html",
          controller:'LoginAssociation',
        })
        .when('/login', {
          templateUrl: "templates/login.html",
          controller:'LoginAssociation',
        })
        .when('/logout', {
          templateUrl: "templates/logout.html",
          controller:'LogoutAssociation',
        })
        .when('/myEvents', {
          templateUrl: "templates/myEvents.html",
          controller:'MyEvents',
         })
        .when('/myPosts', {
          templateUrl: "templates/myPosts.html",
          controller:'MyPosts',
        })
        .when('/myEvents/:id', {
          templateUrl: "templates/myEventReader.html",
          controller:'MyEventReader',
         })
        .when('/myPosts/:id', {
          templateUrl: "templates/myPostsReader.html",
          controller:'MyPostsReader',
        })
        .when('/myAssociation/:id', {
         templateUrl: "templates/myAssociation.html",
         controller:'MyAssociation',
        })
        .when('/createEvent', {
         templateUrl: "templates/createEvent.html",
         controller:'CreateEvent',
        })
        .when('/createPost', {
         templateUrl: "templates/createPost.html",
         controller:'CreatePost',
        })
        .when('/validationEvent', {
         templateUrl: "templates/validationEvent.html",
         controller:'ValidationEvent',
        })
        .when('/validationPost', {
         templateUrl: "templates/validationPost.html",
         controller:'ValidationPost',
        })
        .when('/validationAssociation', {
         templateUrl: "templates/validationAssociation.html",
         controller:'ValidationAssociation',
        })
        .when('/createAssociation', {
         templateUrl: "templates/createAssociation.html",
         controller:'CreateAssociation',
        })
        .otherwise({
            template: 'does not exists'
        });
});

app.factory('Session', function () {

    var token = '';
    var associationID = '';
    var master = false;
    var loggedInCallback;

    return {
      destroyCredentials: function(){
        window.localStorage.removeItem("authToken");
        window.localStorage.removeItem("associationID");
        window.localStorage.removeItem("master");
        token = ''
        associationID = ''
        master = false
        loggedInCallback()
      },
      getToken: function () {
          token = window.localStorage.getItem("authToken");
          return token;
      },
      setToken: function (t) {
          window.localStorage.setItem("authToken", t);
          token = t;
      },
      setLoggedInCallback: function (f) {
          loggedInCallback = f
      },
      getAssociation: function () {
          associationID = window.localStorage.getItem("associationID");
          console.log("getAssociation called => " + associationID)
          return associationID;
      },
      setAssociation: function (a) {
          console.log("setAssociation called !!!")
          window.localStorage.setItem("associationID", a);
          associationID = a;
      },
      setMaster: function(m){
        window.localStorage.setItem("master", m);
        master = m;
        loggedInCallback()
      },
      getMaster: function(){
        master = window.localStorage.getItem("master");
        return master;
      }
    };
});


app.service('fileUpload', ['$http', 'ngDialog',  function ($http, ngDialog) {
    this.uploadFileToUrl = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config){
          callback(true, data)
        })
        .error(function(data, status, headers, config){
          callback(false, data)
        });
    }
}]);

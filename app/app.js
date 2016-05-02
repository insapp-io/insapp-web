var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngDialog', 'ngColorThief', 'ngFileUpload']);

app.config(function($routeProvider, $locationProvider, $colorThiefProvider) {
  $colorThiefProvider.setDefaultQuality(1);
  $colorThiefProvider.setDefaultColorCount(10);
  $colorThiefProvider.setReturnObjects(false);
  $locationProvider.html5Mode(true);
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
        .when('/myAssociation', {
         templateUrl: "templates/myAssociation.html",
         controller:'MyAssociation',
        })
        .when('/createEvent', {
         templateUrl: "templates/createEvent.html",
         controller:'CreateEvent',
        })
        .when('/createPost/:id', {
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
          return associationID;
      },
      setAssociation: function (a) {
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
        .success(function(){
          callback(true)
        })
        .error(function(){
          callback(false)
        });
    }
}]);

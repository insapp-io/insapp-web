var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngDialog']);

app.config(function($routeProvider, $locationProvider) {
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
        .when('/myEvents/:id', {
          templateUrl: "templates/myEventReader.html",
          controller:'MyEventReader',
         })
        .when('/myAssociation', {
         templateUrl: "templates/myAssociation.html",
         controller:'MyAssociation',
        })
        .when('/createEvent', {
         templateUrl: "templates/createEvent.html",
         controller:'CreateEvent',
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

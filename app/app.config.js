var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngDialog', 'ngFileUpload', 'ngLoadingOverlay','angular-spinkit']);

app.constant('configuration', {
  api: 'https://insapp.fr/api/v1',
  cdn: 'https://insapp.fr/cdn/',
  baseUrl: '/web',
});

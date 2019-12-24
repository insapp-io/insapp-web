import angular from 'angular'

// User list module
let userListModule = angular.module('app.userlist', [])

import UserListConfig from './list.config'
userListModule.config(UserListConfig)

import UserListController from './list.controller'
userListModule.controller('UserListController', UserListController)

export { 
  userListModule
}

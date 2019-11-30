import angular from 'angular'

// Create the module where our functionality can attach to
let postListModule = angular.module('app.post', [])

// Include our UI-Router config settings
import PostListConfig from './list.config'
postListModule.config(PostListConfig)

// Controllers
import PostListController from './list.controller'
postListModule.controller('PostListController', PostListController)

export default postListModule
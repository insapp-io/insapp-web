import angular from 'angular'

// Create the module where our functionality can attach to
let postsModule = angular.module('app.posts', [])

// Include our UI-Router config settings
import PostsConfig from './posts.config'
homeModule.config(PostsConfig)

// Controllers
import PostsListController from './posts.controller'
postsModule.controller('PostsListController', PostsListController)

import PostsViewController from './posts.controller'
postsModule.controller('PostsViewController', PostsViewController)

import PostsCreateController from './posts.controller'
postsModule.controller('PostsCreateController', PostsCreateController)

import PostsValidateController from './posts.controller'
postsModule.controller('PostsValidateController', PostsValidateController)

export default postsModule
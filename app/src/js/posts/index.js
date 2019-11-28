import angular from 'angular'

// Create the module where our functionality can attach to
let postsModule = angular.module('app.posts', [])

// Include our UI-Router config settings
import PostsConfig from './posts.config'
postsModule.config(PostsConfig)

// Controllers
import PostsController from './posts.controller'
postsModule.controller('PostsController', PostsController)

export default postsModule
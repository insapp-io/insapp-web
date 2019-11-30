import angular from 'angular'

// Create the module where our functionality can attach to
let postModule = angular.module('app.post', [])

// Include our UI-Router config settings
import PostConfig from './post.config'
postModule.config(PostConfig)

// Controllers
import PostController from './view.controller'
postModule.controller('PostController', PostController)

import PostListController from './list.controller'
postModule.controller('PostListController', PostListController)

export default postModule
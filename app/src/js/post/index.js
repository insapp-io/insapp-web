import angular from 'angular'

// Post list module
let postListModule = angular.module('app.postlist', ['ngFileUpload'])

import PostListConfig from './list.config'
postListModule.config(PostListConfig)

import PostListController from './list.controller'
postListModule.controller('PostListController', PostListController)

// Post create module
let postCreateModule = angular.module('app.postcreate', [])

import PostCreateConfig from './create.config'
postCreateModule.config(PostCreateConfig)

import PostCreateController from './create.controller'
postCreateModule.controller('PostCreateController', PostCreateController)

export { 
  postListModule,
  postCreateModule
}

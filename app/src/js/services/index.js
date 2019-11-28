import angular from 'angular'

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', [])

import UserService from './user.service'
servicesModule.service('User', UserService)

import PostsService from './posts.service'
servicesModule.service('Posts', PostsService)

export default servicesModule
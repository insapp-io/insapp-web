import angular from 'angular'

let servicesModule = angular.module('app.services', [])

import UserService from './user.service'
servicesModule.service('User', UserService)

import AssociationService from './association.service'
servicesModule.service('Association', AssociationService)

import PostsService from './posts.service'
servicesModule.service('Posts', PostsService)

import CommentsService from './comments.service'
servicesModule.service('Comments', CommentsService)

export default servicesModule
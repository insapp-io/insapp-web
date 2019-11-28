import angular from 'angular'

// Create the module where our functionality can attach to
let authModule = angular.module('app.auth', [])

// Include our UI-Router config settings
import AuthConfig from './auth.config'
authModule.config(AuthConfig)

// Include controllers
import AuthController from './auth.controller'
authModule.controller('AuthController', AuthController)

export default authModule